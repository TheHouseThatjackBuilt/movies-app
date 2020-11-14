import React, { Component } from 'react';
import MoviesList from '../Movies-list';
import { TmdbService, createFilmsList } from '../../service';

export default class App extends Component {
  state = {
    movies: [],
  };

  tmdbService = new TmdbService();

  decoderGenres = this.tmdbService.getGenres();

  componentDidMount = () => {
    this.updateState();
  };

  updateState = async () => {
    const { tmdbService } = this;

    const data = await tmdbService.getFilms();
    const movies = data.map((elem) => createFilmsList(elem));
    this.setState({ movies });
  };

  render() {
    const { movies } = this.state;
    const { decoderGenres } = this;

    return (
      <div className="wrapper">
        <MoviesList movies={movies} decoderGenres={decoderGenres} />
      </div>
    );
  }
}
