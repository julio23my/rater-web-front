import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./MovieList.css";
import { Button } from "@material-ui/core";

function MovieList(props) {
  const movieClicked = (movie) => (evt) => {
    props.movieClicked(movie);
  };
  const editClicked = (movie) => {
    props.editClicked(movie);
  };
  const removeClicked = (movie) => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movie/${movie.id}/`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
    })
      .then((resp) => props.movieDeleted(movie))
      .catch((error) => console.log(error));
  };

  const newMovie = () => {
    props.newMovie();
  };

  return (
    <div className="movieList__List">
      {props.movies.map((movie) => {
        return (
          <div key={movie.id} className="movieList__Item">
            <h3 onClick={movieClicked(movie)}>{movie.title}</h3>

            <FontAwesomeIcon icon="edit" onClick={() => editClicked(movie)} />
            <FontAwesomeIcon
              icon="trash"
              onClick={() => removeClicked(movie)}
            />
          </div>
        );
      })}
      <Button onClick={newMovie}>Add new</Button>
    </div>
  );
}

export default MovieList;
