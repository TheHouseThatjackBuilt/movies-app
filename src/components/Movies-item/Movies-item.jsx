// global imports
import React, { Component } from 'react';
import PropTypes, {
  arrayOf, shape, string, number,
} from 'prop-types';
import { format } from 'date-fns';
import { Button, Rate } from 'antd';
// local imports
import { formattedDescription } from '../../service';

export default class MovieItem extends Component {
  state = {
    genres: [],
  };

  sourcePic = 'https://image.tmdb.org/t/p/w220_and_h330_face';

  componentDidMount = () => {
    this.genreIdToString();
  };

  genreIdToString = async () => {
    const { decoderGenres, movies } = this.props;
    const { genreId } = movies;
    const decoder = await decoderGenres;
    const genres = genreId.map((elem) => decoder.get(elem));
    this.setState({ genres });
  };

  render() {
    const { sourcePic } = this;
    const { genres } = this.state;
    const { movies } = this.props;
    const {
      posterPath, releaseDate, voteAverage, title, overview, popularity,
    } = movies;
    const description = formattedDescription(overview);
    const rating = popularity / 10;
    const formatDate = format(new Date(releaseDate), 'PP');
    const genreButtons = genres.map((genre) => (
      <Button className="movie-item__genre-item" key={genre} size="small">
        {genre}
      </Button>
    ));

    return (
      <article className="movie-item">
        <div className="movie-item__poster">
          <img src={`${sourcePic}${posterPath}`} alt="poster" />
        </div>
        <div className="movie-item__containter">
          <header className="movie-item__header">
            <h2 className="movie-item__title">{title}</h2>
            <div className="movie-item__total-rate">{voteAverage}</div>
            {/* <Badge count={voteAverage} color="#fff" text={voteAverage} className="movie-item__badge" /> */}
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

MovieItem.propTypes = {
  movies: shape({
    posterPath: string.isRequired,
    title: string.isRequired,
    releaseDate: string.isRequired,
    overview: string.isRequired,
    popularity: number.isRequired,
    voteAverage: number.isRequired,
    genreId: arrayOf(number).isRequired,
  }).isRequired,
  decoderGenres: shape({
    then: PropTypes.func.isRequired,
    catch: PropTypes.func.isRequired,
  }).isRequired,
};
