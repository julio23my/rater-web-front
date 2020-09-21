import React, { Component } from "react";
import "./MovieForm.css";
import { Button } from "@material-ui/core";

class MovieForm extends Component {
  state = {
    editedMovie: this.props.movie,
  };
  cancelClicked = () => {
    this.props.cancelForm();
  };
  inputChanged = (event) => {
    let movie = this.state.editedMovie;
    movie[event.target.name] = event.target.value;
    this.setState({ editedMovie: movie });
  };
  saveClicked = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/movie/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Token ${this.props.token}`,
      },
      body: JSON.stringify(this.state.editedMovie),
    })
      .then((resp) => resp.json())
      .then((res) => this.props.newMovie(res))
      .catch((error) => console.log(error));
  };
  updateClicked = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/movie/${this.props.movie.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: `Token ${this.props.token}`,
        },
        body: JSON.stringify(this.state.editedMovie),
      }
    )
      .then((resp) => resp.json())
      .then((res) => this.props.editedMovie(res))
      .catch((error) => console.log(error));
  };

  render() {
    const isDisable =
      this.state.editedMovie.title.length === 0 ||
      this.state.editedMovie.description.length === 0;
    return (
      <div className="movieForm">
        <div className="movieForm__textinput">
          <span>Title</span>
          <br />
          <input
            type="text"
            name="title"
            value={this.props.movie.title}
            onChange={this.inputChanged}
          />
          <br />
          <span> Description</span>
          <br />
          <textarea
            value={this.props.movie.description}
            name="description"
            onChange={this.inputChanged}
            rows="7"
          />
          <br />
        </div>
        {this.props.movie.id ? (
          <Button disabled={isDisable} onClick={this.updateClicked}>
            Update
          </Button>
        ) : (
          <Button disabled={isDisable} onClick={this.saveClicked}>
            Save
          </Button>
        )}
        &nbsp;
        <Button onClick={this.cancelClicked}>Cancel</Button>
      </div>
    );
  }
}

export default MovieForm;
