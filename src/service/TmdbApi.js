/* eslint-disable */
export default class TmdbService {
  tokenV4 =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTRiYWNjZTFjMzc1YTBhMzExYjQ3YTM4NDQ1YmE5ZSIsInN1YiI6IjVmYTQyNTM4MjE2MjFkMDAzZmYxZWZkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C-Qx9MKzLfjcIx-h3fiuXViG75SXIMDJ6KSpDcq6lYc';

  themoviedbLink = 'https://api.themoviedb.org/3';

  sendRequest = async (url, method, body) => {
    const requestOptions = {
      method,
      headers: {
        Authorization: `Bearer ${this.tokenV4}`,
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(url, requestOptions);
    if (!response.ok) throw new Error(response.status);
    return response.json();
  };

  getGenresList = async () => {
    const { themoviedbLink, sendRequest } = this;
    const link = `${themoviedbLink}/genre/movie/list`;
    const request = await sendRequest(link, 'GET');
    return request;
  };

  getGenres = async () => {
    const { getGenresList } = this;
    const genreList = await getGenresList();
    return genreList.genres.reduce((acc, { id, name }) => acc.set(id, name), new Map());
  };

  getGuestSession = async () => {
    const { themoviedbLink, sendRequest } = this;
    const link = `${themoviedbLink}/authentication/guest_session/new`;
    const response = await sendRequest(link, 'GET');
    return response.guest_session_id;
  };

  setRatingForMovie = async (rate, sessionId, id) => {
    const { themoviedbLink, sendRequest } = this;
    const body = { value: rate };
    const link = `https://z4vrpkijmodhwsxzc.stoplight-proxy.io/3/movie/${id}/rating?guest_session_id=${sessionId}`;
    const response = await sendRequest(link, 'POST', body);
    return response;
  };

  getRatingMovies = async (options) => {
    const { sessionID } = options;
    console.log(sessionID);
    const { themoviedbLink, sendRequest } = this;
    const link = `${themoviedbLink}/guest_session/${sessionID}/rated/movies?&sort_by=created_at.desc;`;
    const response = await sendRequest(link, 'GET');
    return { movies: response.results };
  };

  getFilms = async (options) => {
    const { searchRequest, currentPage } = options;
    const { themoviedbLink, sendRequest } = this;
    const linkToGetFilms = `${themoviedbLink}/search/movie?&language=en-En&query=${searchRequest}&page=${currentPage}&include_adult=false`;
    const response = await sendRequest(linkToGetFilms, 'GET');
    if (response.results.length === 0) throw new Error('Nothing found');
    return {
      movies: response.results,
      pages: response.total_pages,
    };
  };
}
