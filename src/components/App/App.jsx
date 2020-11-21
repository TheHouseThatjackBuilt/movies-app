import React, { PureComponent } from 'react';
import { Tabs, Layout } from 'antd';
import { string, func, shape } from 'prop-types';

import { TmdbService, TmdbProvider } from '../../service';
import MoviesList from '../Movies-list';
import Search from '../Search';

export default class App extends PureComponent {
  state = {
    searchValue: 'return',
    sessionID: null,
    activeTab: 'search',
  };

  tmdbService = new TmdbService();

  decoderGenres = this.tmdbService.getGenres();

  componentDidMount = () => {
    this.getGuestSession();
  };

  getGuestSession = async () => {
    const sessionID = await this.tmdbService.getGuestSession();
    this.setState({ sessionID });
  };

  userSearchParams = (value) => {
    this.setState({ searchValue: value });
  };

  changeTheTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  render = () => {
    const {
      userSearchParams, changeTheTab, decoderGenres, tmdbService,
    } = this;
    const { searchValue, sessionID, activeTab } = this.state;
    const { getFilms, getRatingMovies, setRatingForMovie } = tmdbService;
    return (
      <AppVisual
        onChange={changeTheTab}
        userSearchParams={userSearchParams}
        getFilms={getFilms}
        getRatingMovies={getRatingMovies}
        setRatingForMovie={setRatingForMovie}
        decoderGenres={decoderGenres}
        tmdbService={tmdbService}
        searchValue={searchValue}
        activeTab={activeTab}
        sessionID={sessionID}
      />
    );
  };
}

const AppVisual = ({
  onChange,
  userSearchParams,
  decoderGenres,
  searchValue,
  activeTab,
  sessionID,
  getFilms,
  getRatingMovies,
  setRatingForMovie,
}) => {
  const { TabPane } = Tabs;
  return (
    <Layout className="movies-app">
      <TmdbProvider value={decoderGenres}>
        <Tabs defaultActiveKey="search" onChange={(tab) => onChange(tab)} centered="true">
          <TabPane tab="Search" key="search">
            <Search userSearchParams={userSearchParams} />
            <MoviesList
              getFilms={getFilms}
              searchRequest={searchValue}
              sessionID={sessionID}
              setRatingForMovie={setRatingForMovie}
            />
          </TabPane>
          <TabPane tab="Rated" key="rated">
            <MoviesList
              getFilms={getRatingMovies}
              activeTab={activeTab}
              sessionID={sessionID}
              setRatingForMovie={setRatingForMovie}
            />
          </TabPane>
        </Tabs>
      </TmdbProvider>
    </Layout>
  );
};

AppVisual.defaultProps = {
  searchValue: undefined,
  sessionID: null,
};

AppVisual.propTypes = {
  onChange: func.isRequired,
  userSearchParams: func.isRequired,
  activeTab: string.isRequired,
  sessionID: string,
  getFilms: func.isRequired,
  getRatingMovies: func.isRequired,
  setRatingForMovie: func.isRequired,
  searchValue: string,
  decoderGenres: shape({
    then: func.isRequired,
    catch: func.isRequired,
  }).isRequired,
};
