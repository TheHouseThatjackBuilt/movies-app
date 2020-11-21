import React, { PureComponent } from 'react';
import {
  Row, Col, Spin, Alert, Pagination,
} from 'antd';
import {
  string, func, shape, arrayOf, element, number,
} from 'prop-types';

import { createFilmsList, errorHandler, TmdbConsumer } from '../../service';
import MovieItem from './Movies-item';

export default class MoviesList extends PureComponent {
  state = {
    loadData: true,
    movies: [],
    allPages: null,
    currentPage: 1,
    error: {
      errorStatus: false,
      errorMessage: '',
    },
  };

  componentDidMount = () => {
    const { currentPage } = this.state;
    const { searchRequest, sessionID } = this.props;
    this.updateState({ searchRequest, currentPage, sessionID }).catch((reject) => this.setState({ error: errorHandler(reject) }));
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { currentPage } = this.state;
    const { searchRequest, sessionID, activeTab } = this.props;
    const conditionOne = currentPage !== prevState.currentPage;
    const conditionTwo = searchRequest !== prevProps.searchRequest;
    const conditionThree = searchRequest !== '' && searchRequest.length > 3;
    const ifElseCondition = (conditionOne || conditionTwo) && conditionThree;

    const conditionRatingList = activeTab === 'rated' && prevProps.activeTab !== 'rated';
    if (ifElseCondition) {
      this.updateState({ searchRequest, currentPage, sessionID }).catch((reject) => this.setState({ error: errorHandler(reject) }));
    }
    if (conditionRatingList) {
      this.updateState({ searchRequest, currentPage, sessionID }).catch((reject) => this.setState({ error: errorHandler(reject) }));
    }
  };

  updateState = async (options) => {
    if (!navigator.onLine) throw new Error('The connection will lost');
    this.setState({
      loadData: true,
      error: {
        errorStatus: false,
        errorMessage: '',
      },
    });
    const { getFilms } = this.props;
    const data = await getFilms(options);
    const movies = data.movies.map((elem) => createFilmsList(elem));
    this.setState({ movies, allPages: data.pages, loadData: false });
  };

  switchThePage = (event) => this.setState({ currentPage: event });

  render = () => {
    const { switchThePage } = this;
    const {
      movies, allPages, loadData, error, currentPage,
    } = this.state;
    const { errorStatus, errorMessage } = error;
    const { sessionID, setRatingForMovie } = this.props;
    const MoviesItem = movies.map(({ id, ...elems }) => (
      <Col className="gutter-row main__item" span={12} key={id}>
        <TmdbConsumer>
          {(decoderGenres) => (
            <MovieItem
              movies={elems}
              setRating={setRatingForMovie}
              id={id}
              sessionID={sessionID}
              decoderGenres={decoderGenres}
            />
          )}
        </TmdbConsumer>
      </Col>
    ));

    const hasData = loadData || errorStatus;
    const loading = loadData ? <LoadingData /> : null;
    const alert = errorStatus ? <ErrorComponent error={errorMessage} /> : null;
    const moviesList = !hasData ? (
      <MoviesListVisual
        MoviesItem={MoviesItem}
        switchThePage={switchThePage}
        totalPages={allPages}
        currentPage={currentPage}
      />
    ) : null;

    return (
      <main className="main movies-app__main">
        {loading}
        {alert}
        {moviesList}
      </main>
    );
  };
}

const LoadingData = () => (
  <div className="wrapper__spin">
    <Spin tip="Loading..." />
  </div>
);

const ErrorComponent = ({ error }) => (
  <div className="wrapper__error">
    <Alert message={error} />
  </div>
);

const MoviesListVisual = ({
  MoviesItem, switchThePage, totalPages, currentPage,
}) => (
  <>
    <Row className="main__list movies-app__main" gutter={[30, 30]}>
      {MoviesItem}
    </Row>
    <Pagination
      onChange={(evt) => switchThePage(evt)}
      className="movies-app__pagination"
      size="small"
      defaultPageSize
      showSizeChanger={false}
      total={totalPages}
      defaultCurrent={currentPage}
    />
  </>
);

MoviesList.defaultProps = {
  searchRequest: 'return',
  activeTab: 'search',
  sessionID: null,
};

MoviesList.propTypes = {
  searchRequest: string,
  activeTab: string,
  sessionID: string,
  getFilms: func.isRequired,
  setRatingForMovie: func.isRequired,
};

ErrorComponent.propTypes = {
  error: shape({
    string: string.isRequired,
  }).isRequired,
};

MoviesListVisual.propTypes = {
  MoviesItem: arrayOf(element).isRequired,
  switchThePage: func.isRequired,
  totalPages: number.isRequired,
  currentPage: number.isRequired,
};
