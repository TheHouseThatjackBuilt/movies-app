/* eslint-disable */
export default class TmdbService {
  tokenV4 =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTRiYWNjZTFjMzc1YTBhMzExYjQ3YTM4NDQ1YmE5ZSIsInN1YiI6IjVmYTQyNTM4MjE2MjFkMDAzZmYxZWZkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C-Qx9MKzLfjcIx-h3fiuXViG75SXIMDJ6KSpDcq6lYc';

  linkToGetFilms = 'https://api.themoviedb.org/3/search/movie?language=en-En&query=return&page=1&include_adult=false';

  linkToGetGenresList = 'https://api.themoviedb.org/3/genre/movie/list';

  requestOptions = {
    metod: 'GET',
    headers: {
      Authorization: `Bearer ${this.tokenV4}`,
    },
  };

  sendRequest = async (url, options) => {
    const request = await fetch(url, options);
    if (!request.ok) throw new Error('Something going wrong with fetch');
    return request.json();
  };

  getGenresList = async () => {
    const { linkToGetGenresList, requestOptions, sendRequest } = this;
    const request = await sendRequest(linkToGetGenresList, requestOptions);
    return request;
  };

  getGenres = async () => {
    const { getGenresList } = this;
    const genreList = await getGenresList();
    return genreList.genres.reduce((acc, { id, name }) => acc.set(id, name), new Map());
  };

  getFilms = async () => {
    const { linkToGetFilms, requestOptions, sendRequest } = this;
    const request = await sendRequest(linkToGetFilms, requestOptions);
    return request.results;
  };
}
