import React from "react";
import "./popup.css";
import { connect } from "react-redux";
import * as actions from "./actions";

interface movie {
  id: number,
  movieName: string,
  overview: string,
  release_date: string,
  vote_average: number
}

const Popup = ({ movies }) => {
  return (
    <div>
      <h1 className="heading">Movie List</h1>

      {movies.map((movie: movie) => {
        return (
          <div className="movieDetail" key={movie.id}>
            <div className="movieName">
              <span>Movie name:</span> {movie.movieName}
            </div>
            <div className="movieOverview">
              <span>Overview:</span> {movie.overview}
            </div>
            <div className="movieReleaseDate">
              <span>Release date:</span> {movie.release_date}
            </div>
            <div className="movieRating">
              <span>Rating:</span> {movie.vote_average}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default connect((state) => {
  return state;
}, actions)(Popup);
