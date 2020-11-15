/* eslint-disable */
import React, { Component } from 'react';
import { Spin, Alert, Pagination } from 'antd';

import { TmdbService, createFilmsList } from '../../service';

import MoviesList from '../Movies-list';
import Search from '../Search';

export default class App extends Component {
  state = {
    movies: [],
    searchValue: '',
    loading: true,
    error: {
      status: false,
      message: '',
    },
    allPages: null,
    currentPage: 1,
  };

  tmdbService = new TmdbService();
  decoderGenres = this.tmdbService.getGenres();

  componentDidMount = async () => {
    this.tryCatchMount();
  };

  // componentDidUpdate = (prevProps, prevState) => {
  //   const { searchValue, currentPage } = this.state;
  //   const { tryCatchMount } = this;
  //   debugger;
  //   const conditionOne = currentPage !== prevState.currentPage;
  //   const conditionTwo = typeof searchValue !== 'undefined' && searchValue.length > 3;
  //   const conditionThree = searchValue !== prevState.searchValue;
  //   if (conditionOne || (conditionTwo && conditionThree)) tryCatchMount(searchValue, currentPage);
  // };

  updateState = async (request, page) => {
    const { tmdbService } = this;
    const data = await tmdbService.getFilms(request, page);
    const movies = data.movies.map((elem) => createFilmsList(elem));
    this.setState({
      movies,
      allPages: data.pages,
      loading: false,
    });
  };

  switchThePage = (event) => this.setState({ currentPage: event });

  userSearchParams = (searchValue) => this.setState({ searchValue });

  tryCatchMount = async (request = 'return', page = 1) => {
    const { updateState, errorHandler } = this;
    const { status } = this.state.error;
    if (!navigator.onLine && !status) errorHandler(navigator.onLine);
    updateState(request, page).catch((reject) => errorHandler(reject));
  };

  errorHandler = (err) => {
    const error = { status: true, message: err.message ? err.message : err };
    this.setState({ error });
  };

  render = () => {
    const { movies, loading, error, allPages, currentPage, searchValue } = this.state;
    const { decoderGenres, userSearchParams, switchThePage } = this;
    console.log(searchValue);
    const spinWrap = (
      <div className="movies-app__spin">
        <Spin tip="Loading..." />
      </div>
    );
    const errorWrap = (
      <div className="movies-app__error">
        <Alert message={error.message} />
      </div>
    );
    const hasData = loading || error.status;
    const spinner = loading ? spinWrap : null;
    const alert = error.status ? errorWrap : null;
    const moviesList = !hasData ? (
      <MoviesList
        movies={movies}
        decoderGenres={decoderGenres}
        switchThePage={() => switchThePage()}
        pages={{ currentPage, allPages }}
      />
    ) : null;

    return (
      <div className="movies-app">
        <Search userSearchParams={() => userSearchParams()} />
        {spinner}
        {alert}
        {moviesList}
        <Pagination
          onChange={(evt) => switchThePage(evt)}
          className="movies-app__pagination"
          size="small"
          defaultPageSize
          showSizeChanger={false}
          total={allPages}
          defaultCurrent={currentPage}
        />
      </div>
    );
  };
}
