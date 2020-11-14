// global imports
import React from 'react';
import { Row, Col } from 'antd';
import PropTypes, {
  arrayOf, shape, string, number,
} from 'prop-types';

// local imports
import MovieItem from '../Movies-item';

const MoviesList = ({ movies, decoderGenres }) => {
  const MoviesItem = movies.map(({ id, ...elems }) => (
    <Col className="gutter-row" span={12} key={id}>
      <MovieItem movies={elems} decoderGenres={decoderGenres} />
    </Col>
  ));
  return <Row gutter={[37, 37]}>{MoviesItem}</Row>;
};

MoviesList.propTypes = {
  decoderGenres: shape({
    then: PropTypes.func.isRequired,
    catch: PropTypes.func.isRequired,
  }).isRequired,
  movies: arrayOf(
    shape({
      posterPath: string.isRequired,
      title: string.isRequired,
      releaseDate: string.isRequired,
      overview: string.isRequired,
      popularity: number.isRequired,
      voteAverage: number.isRequired,
      genreId: arrayOf(number).isRequired,
    }),
  ).isRequired,
};

export default MoviesList;
