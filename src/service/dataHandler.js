const createFilmsList = (data) => {
  const {
    poster_path, title, release_date, overview, popularity, vote_average, id, genre_ids,
  } = data;
  return {
    posterPath: poster_path,
    releaseDate: release_date,
    voteAverage: vote_average,
    genreId: genre_ids,
    overview,
    title,
    popularity,
    id,
  };
};

export default createFilmsList;
