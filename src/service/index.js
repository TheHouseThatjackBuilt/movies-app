import TmdbService from './TmdbApi';
import createFilmsList from './dataHandler';
import formattedDescription from './formattedDescription';
import errorHandler from './errorHandler';
import { TmdbProvider, TmdbConsumer } from './tmdbContext';
import coloringTheRating from './coloringTheRating';

export {
  TmdbService,
  createFilmsList,
  formattedDescription,
  errorHandler,
  TmdbProvider,
  TmdbConsumer,
  coloringTheRating,
};
