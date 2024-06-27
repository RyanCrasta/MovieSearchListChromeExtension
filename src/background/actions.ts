const MOVIE_ADD = "MOVIE_ADD";

export function addMovie(value) {
  return {
    type: MOVIE_ADD,
    value,
  };
}
