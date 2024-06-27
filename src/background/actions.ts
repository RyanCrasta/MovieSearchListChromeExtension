const MOVIE_ADD = "MOVIE_ADD";

interface value {
  movieName: string,
  release_date: string,
  overview: string,
  vote_average: number,
  id: number,
}

export function addMovie(value: value) {
  return {
    type: MOVIE_ADD,
    value,
  };
}
