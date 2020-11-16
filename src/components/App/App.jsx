/* eslint-disable */
import React, { Component } from 'react';

import MoviesList from '../Movies-list';
import Search from '../Search';

export default class App extends Component {
  state = {
    searchValue: 'return',
  };

  userSearchParams = (value) => {
    this.setState({ searchValue: value });
  };

  render = () => {
    const { userSearchParams } = this;
    const { searchValue } = this.state;

    return (
      <div className="movies-app">
        <Search userSearchParams={userSearchParams} />
        <MoviesList searchRequest={searchValue} />
      </div>
    );
  };
}
// const { movies, loading, error, allPages, currentPage, searchValue } = this.state;
// const { decoderGenres, userSearchParams, switchThePage } = this;
// console.log(searchValue);
// const spinWrap = (
//   <div className="movies-app__spin">
//     <Spin tip="Loading..." />
//   </div>
// );
// const errorWrap = (
//   <div className="movies-app__error">
//     <Alert message={error.message} />
//   </div>
// );
// const hasData = loading || error.status;
// const spinner = loading ? spinWrap : null;
// const alert = error.status ? errorWrap : null;
// const moviesList = !hasData ? (
//   <MoviesList
//     movies={movies}
//     decoderGenres={decoderGenres}
//     switchThePage={() => switchThePage()}
//     pages={{ currentPage, allPages }}
//   />
// ) : null;
