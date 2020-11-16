import React, { Component } from 'react';
import {
  arrayOf, shape, string, number, func,
} from 'prop-types';
import { format } from 'date-fns';
import { Button, Rate } from 'antd';

import { formattedDescription } from '../../../service';
import poster from './no-poster.jpg';

export default class MovieItem extends Component {
  state = {
    genres: [],
  };

  componentDidMount = () => {
    this.genreIdToString();
  };

  genreIdToString = async () => {
    const { decoderGenres, movies } = this.props;
    const { genreId } = movies;
    const decoder = await decoderGenres;
    const genres = genreId.map((elem) => decoder.get(elem));
    this.setState({
      genres: [...genres],
    });
  };

  render() {
    const { genres } = this.state;
    const { movies } = this.props;
    const {
      posterPath, releaseDate, voteAverage, title, overview, popularity,
    } = movies;
    const description = formattedDescription(overview);
    const rating = popularity / 10;
    const src = posterPath ? `https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}` : poster;
    const conditionFormatDate = typeof releaseDate !== 'undefined' && releaseDate.length === 10;
    const formatDate = conditionFormatDate ? format(new Date(releaseDate), 'PP') : releaseDate;
    const genreButtons = genres.map((genre) => (
      <Button className="movie-item__genre-item" key={genre} size="small">
        {genre}
      </Button>
    ));
    return (
      <article className="movie-item">
        <div className="movie-item__poster">
          <img src={src} alt="poster" />
        </div>
        <div className="movie-item__containter">
          <header className="movie-item__header">
            <h2 className="movie-item__title">{title}</h2>
            <div className="movie-item__total-rate">{voteAverage}</div>
          </header>
          <div className="movie-item__body">
            <div className="movie-item__date">
              <time>{formatDate}</time>
            </div>
            <div className="movie-item__genre-container">{genreButtons}</div>
            <div className="movie-item__desription">
              <p>{description}</p>
            </div>
            <div className="movie-item__rating-container">
              <Rate className="movie-item__rating" disabled defaultValue={rating} count={10} allowHalf />
            </div>
          </div>
        </div>
      </article>
    );
  }
}

MovieItem.defaultProps = {
  movies: {
    posterPath: poster,
    releaseDate: 'no information available',
  },
};

MovieItem.propTypes = {
  movies: shape({
    posterPath: string,
    releaseDate: string,
    title: string.isRequired,
    overview: string.isRequired,
    popularity: number.isRequired,
    voteAverage: number.isRequired,
    genreId: arrayOf(number).isRequired,
  }),
  decoderGenres: shape({
    then: func.isRequired,
    catch: func.isRequired,
  }).isRequired,
};
