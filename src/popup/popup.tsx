import React from "react";
import "./popup.css";
import { connect } from "react-redux";
import * as actions from "./actions";

const Popup = ({ movies }) => {
  return (
    <div>
      <h1 className="heading">Movie List</h1>

      {movies.map((oneMovie) => {
        return (
          <div className="movieDetail" key={oneMovie.id}>
            <div className="movieName">
              <span>Movie name:</span> {oneMovie.movieName}
            </div>
            <div className="movieOverview">
              <span>Overview:</span> {oneMovie.overview}
            </div>
            <div className="movieReleaseDate">
              <span>Release date:</span> {oneMovie.release_date}
            </div>
            <div className="movieRating">
              <span>Rating:</span> {oneMovie.vote_average}
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
