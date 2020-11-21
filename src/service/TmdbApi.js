/* eslint-disable */
export default class TmdbService {
  apikey = '794bacce1c375a0a311b47a38445ba9e';
  tmdbLink = 'https://api.themoviedb.org/3';

  sendRequest = async (url, method, body) => {
    const requestOption = {
      method,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, requestOption);
    if (!response.ok) throw new Error(response.status);
    return response.json();
  };

  getGenresList = async () => {
    const { tmdbLink, sendRequest, apikey } = this;
    const link = `${tmdbLink}/genre/movie/list?api_key=${apikey}`;
    const request = await sendRequest(link, 'GET');
    return request;
  };

  getGenres = async () => {
    const { getGenresList } = this;
    const genreList = await getGenresList();
    return genreList.genres.reduce((acc, { id, name }) => acc.set(id, name), new Map());
  };

  getGuestSession = async () => {
    if (sessionStorage.getItem('sessionID')) return sessionStorage.getItem('sessionID');

    const { tmdbLink, sendRequest, apikey } = this;
    const link = `${tmdbLink}/authentication/guest_session/new?api_key=${apikey}`;
    const response = await sendRequest(link, 'GET');

    sessionStorage.setItem('sessionID', response.guest_session_id);
    return response.guest_session_id;
  };

  setRatingForMovie = async (rate, sessionId, id) => {
    const { tmdbLink, apikey, sendRequest } = this;
    const body = { value: rate };
    const link = `${tmdbLink}/movie/${id}/rating?api_key=${apikey}&guest_session_id=${sessionId}`;
    const response = await sendRequest(link, 'POST', body);
    return response;
  };

  getRatingMovies = async (options) => {
    const { sessionID } = options;
    const { tmdbLink, sendRequest, apikey } = this;
    const link = `${tmdbLink}/guest_session/${sessionID}/rated/movies?api_key=${apikey}&sort_by=created_at.desc`;
    const response = await sendRequest(link, 'GET');
    return {
      movies: response.results,
      totalPages: response.total_pages,
    };
  };

  getFilms = async (options) => {
    const { searchRequest, currentPage } = options;
    const { tmdbLink, apikey, sendRequest } = this;
    const link = `${tmdbLink}/search/movie?api_key=${apikey}&language=en-US&query=${searchRequest}&page=${currentPage}&include_adult=false`;
    const response = await sendRequest(link, 'GET');
    if (response.results.length === 0) throw new Error('Nothing found');
    return {
      movies: response.results,
      pages: response.total_pages,
    };
  };
}
