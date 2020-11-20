const createFilmsList = (data) => {
  const {
    poster_path, title, release_date, overview, vote_average, id, genre_ids, rating,
  } = data;
  return {
    posterPath: poster_path,
    releaseDate: release_date,
    voteAverage: vote_average,
    genreId: genre_ids,
    overview,
    rating,
    title,
    id,
  };
};

export default createFilmsList;
