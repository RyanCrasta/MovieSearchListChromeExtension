import "./popup.css";
import { connect } from "react-redux";
import * as actions from "./actions";
import React, { Component } from "react";

interface movie {
  id: number;
  movieName: string;
  overview: string;
  release_date: string;
  vote_average: number;
}

interface PopupProps {
  movies: movie[]; // Replace 'any[]' with the actual type of the 'movies' property
}

class Popup extends Component<PopupProps> {
  render() {
    const { movies } = this.props;

    return (
      <div>
        <h1 className="heading">Movie List</h1>

        {movies.map((movie) => {
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
  }
}

export default connect((state) => {
  return state;
}, actions)(Popup);
