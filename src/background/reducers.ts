import { combineReducers } from "redux";
const MOVIE_ADD = "MOVIE_ADD";

function MovieReducer() {
  return function (state = [], action) {
    switch (action.type) {
      case MOVIE_ADD:
        return [
          {
            movieName: action.value.movieName,
            release_date: action.value.release_date,
            overview: action.value.overview,
            vote_average: action.value.vote_average,
            id: action.value.id,
          },
          ...state,
        ];
      default:
        return state;
    }
  };
}

export default combineReducers({
  movies: MovieReducer(),
});
