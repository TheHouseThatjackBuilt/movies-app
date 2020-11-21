import React, { PureComponent } from 'react';
import {
  arrayOf, shape, string, number, func, element,
} from 'prop-types';
import { format } from 'date-fns';
import { Button, Rate } from 'antd';

import { formattedDescription, coloringTheRating } from '../../../service';
import poster from './no-poster.jpg';

export default class MovieItem extends PureComponent {
  state = {
    genres: [],
  };

  componentDidMount = () => {
    this.genreIdToString();
  };

  genreIdToString = async () => {
    const { movies, decoderGenres } = this.props;
    const decoder = await decoderGenres;
    const genres = movies.genreId.map((elem) => decoder.get(elem));
    this.setState({
      genres: [...genres],
    });
  };

  setRating = (value) => {
    const { sessionID, id, setRating } = this.props;
    setRating(value, sessionID, id);
    sessionStorage.setItem(id.toString(), value.toString());
  };

  render() {
    const { setRating } = this;
    const { genres } = this.state;
    const { movies, id } = this.props;
    const {
      posterPath, releaseDate, voteAverage, title, overview, rating,
    } = movies;
    const hasrating = rating || +sessionStorage.getItem(id.toString()) || 0;
    const description = formattedDescription(overview, title);
    const styleBorder = coloringTheRating(voteAverage);
    const src = posterPath ? `https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}` : poster;
    const conditionFormatDate = typeof releaseDate !== 'undefined' && releaseDate.length === 10;
    const formatDate = conditionFormatDate ? format(new Date(releaseDate), 'PP') : releaseDate;
    const genreButtons = genresHandler(genres);
    return (
      <article className="movie-item">
        <MoviesItemVisual
          src={src}
          title={title}
          voteAverage={voteAverage}
          formatDate={formatDate}
          genreButtons={genreButtons}
          description={description}
          setRating={setRating}
          rating={hasrating}
          styleBorder={styleBorder}
        />
      </article>
    );
  }
}

const genresHandler = (arr) => arr.map((genre, id) => (
  <Button
    className="movie-item__genre-item"
    key={`${genre + id + genre + arr.length + arr[arr.length - 1]}`} // unique key
    size="small"
  >
    {genre}
  </Button>
));

const MoviesItemVisual = ({
  src,
  title,
  voteAverage,
  formatDate,
  genreButtons,
  description,
  rating,
  setRating,
  styleBorder,
}) => (
  <>
    <div className="movie-item__poster">
      <img src={src} alt="poster" />
    </div>
    <div className="movie-item__containter">
      <header className="movie-item__header">
        <h2 className="movie-item__title">{title}</h2>
        <div className="movie-item__total-rate" style={styleBorder}>
          {voteAverage}
        </div>
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
          <Rate
            className="movie-item__rating"
            defaultValue={rating}
            count={10}
            allowHalf
            onChange={(value) => setRating(value)}
          />
        </div>
      </div>
    </div>
  </>
);

MovieItem.defaultProps = {
  movies: {
    posterPath: poster,
    releaseDate: 'no information available',
    title: 'the title is not available',
    overview: 'the description is not available',
  },
  sessionID: null,
};

MovieItem.propTypes = {
  movies: shape({
    posterPath: string,
    releaseDate: string,
    title: string,
    overview: string,
    voteAverage: number.isRequired,
    genreId: arrayOf(number).isRequired,
  }),
  decoderGenres: shape({
    then: func.isRequired,
    catch: func.isRequired,
  }).isRequired,
  sessionID: string,
  id: number.isRequired,
  setRating: func.isRequired,
};

MoviesItemVisual.defaultProps = {
  rating: undefined,
};

MoviesItemVisual.propTypes = {
  src: string.isRequired,
  title: string.isRequired,
  voteAverage: number.isRequired,
  formatDate: string.isRequired,
  genreButtons: arrayOf(element).isRequired,
  description: string.isRequired,
  rating: number,
  setRating: func.isRequired,
  styleBorder: shape({
    string,
  }).isRequired,
};
