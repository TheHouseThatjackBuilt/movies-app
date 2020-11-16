/* eslint-disable */
import React, { Component } from 'react';
import { Row, Col, Spin, Alert, Pagination } from 'antd';
import { string } from 'prop-types';

import { TmdbService, createFilmsList, errorHandler } from '../../service';
import MovieItem from './Movies-item';

export default class MoviesList extends Component {
  state = {
    dataStatus: {
      loading: false,
    },
    requestData: {
      movies: [],
      allPages: null,
      currentPage: 1,
    },
    error: {
      status: false,
      message: '',
    },
  };

  tmdbService = new TmdbService();

  decoderGenres = this.tmdbService.getGenres();

  componentDidMount = () => {
    const { currentPage } = this.state.requestData;
    const { searchRequest } = this.props;
    this.updateState(searchRequest, currentPage).catch((reject) => this.setState({ error: errorHandler(reject) }));
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { currentPage } = this.state.requestData;
    const { searchRequest } = this.props;

    const conditionOne = currentPage !== prevState.requestData.currentPage;
    const conditionTwo = searchRequest !== prevProps.searchRequest;
    const conditionThree = searchRequest !== '' && searchRequest.length > 3;

    if ((conditionOne || conditionTwo) && conditionThree)
      this.updateState(searchRequest, currentPage).catch((reject) => this.setState({ error: errorHandler(reject) }));
  };

  updateState = async (userRequest, page) => {
    if (!navigator.onLine && !this.state.error.status) throw new Error('The connection will lost');

    const { tmdbService } = this;
    this.setState({ dataStatus: { loading: true } });
    const data = await tmdbService.getFilms(userRequest, page);
    const movies = data.movies.map((elem) => createFilmsList(elem));
    this.setState({ requestData: { movies, allPages: data.pages }, dataStatus: { loading: false } });
  };

  switchThePage = (event) => this.setState({ requestData: { currentPage: event } });

  render = () => {
    const { switchThePage, decoderGenres } = this;
    const { movies, allPages, currentPage } = this.state.requestData;

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
        <Pagination
          onChange={(evt) => switchThePage(evt)}
          className="movies-app__pagination"
          size="small"
          defaultPageSize
          showSizeChanger={false}
          total={allPages}
          defaultCurrent={currentPage}
        />
      </main>
    );
  };
}

MoviesList.propTypes = {
  searchRequest: string.isRequired,
};
