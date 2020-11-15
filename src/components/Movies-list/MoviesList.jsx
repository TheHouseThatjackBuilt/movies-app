/* eslint-disable */
import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { arrayOf, shape, string, number, func } from 'prop-types';

import MovieItem from '../Movies-item';

export default class MoviesList extends Component {
  state = {
    page: 1,
  };

  render = () => {
    const { switchPage } = this;
    const { movies, decoderGenres, pages } = this.props;
    const { allPages, currentPage } = pages;
    const MoviesItem = movies.map(({ id, ...elems }) => (
      <Col className="gutter-row main__item" span={12} key={id}>
        <MovieItem movies={elems} decoderGenres={decoderGenres} />
      </Col>
    ));

    return (
      <main className="main movies-app__main">
        <Row className="main__list movies-app__main" gutter={[30, 30]}>
          {MoviesItem}
        </Row>
      </main>
    );
  };
}

MoviesList.defaultProps = {
  movies: {
    posterPath: null,
    releaseDate: null || undefined,
    title: 'no information available',
    overview: 'no information available',
    popularity: 'no information available',
    voteAverage: 'no information available',
    genreId: 'no information available',
  },
};

MoviesList.propTypes = {
  decoderGenres: shape({
    then: func.isRequired,
    catch: func.isRequired,
  }).isRequired,
  movies: arrayOf(
    shape({
      posterPath: string,
      title: string,
      releaseDate: string,
      overview: string,
      popularity: number,
      voteAverage: number,
      genreId: arrayOf(number),
    })
  ),
  pages: shape({
    allPages: number.isRequired,
    currentPage: number.isRequired,
  }).isRequired,
};
