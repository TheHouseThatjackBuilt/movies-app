import React, { Component } from 'react';
import { Spin, Alert } from 'antd';

import MoviesList from '../Movies-list';
import { TmdbService, createFilmsList } from '../../service';

export default class App extends Component {
  state = {
    movies: [],
    loading: true,
    error: {
      status: false,
      message: '',
    },
  };

  tmdbService = new TmdbService();

  decoderGenres = this.tmdbService.getGenres();

  componentDidMount = () => {
    this.updateState();
  };

  updateState = async () => {
    try {
      const { tmdbService } = this;

      const data = await tmdbService.getFilms();
      const movies = data.map((elem) => createFilmsList(elem));
      this.setState({
        movies,
        loading: false,
      });
    } catch (err) {
      if (!navigator.onLine) {
        const error = { status: true, message: 'problems with internet access' };
        this.setState({ error });
      } else {
        const error = { status: true, message: err.message };
        this.setState({ error });
      }
    }
  };

  render() {
    const { movies, loading, error } = this.state;
    const { decoderGenres } = this;
    const spinWrap = (
      <div className="wrapper__spin">
        <Spin tip="Loading..." />
      </div>
    );
    const errorWrap = (
      <div className="wrapper__error">
        <Alert message={error.message} />
      </div>
    );
    const hasData = loading || error.status;
    const spinner = loading ? spinWrap : null;
    const alert = error.status ? errorWrap : null;
    const moviesList = !hasData ? <MoviesList movies={movies} decoderGenres={decoderGenres} /> : null;

    return (
      <div className="wrapper">
        {spinner}
        {alert}
        {moviesList}
      </div>
    );
  }
}
