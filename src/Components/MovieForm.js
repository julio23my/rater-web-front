import React, {Component } from 'react';
import './MovieForm.css'


class MovieForm extends Component {

    state = {
        editedMovie: this.props.movie

    };
    cancelClicked = () => {
        this.props.cancelForm();
    };
    inputChanged = event =>{
        let movie = this.state.editedMovie;
        movie[event.target.name] = event.target.value;
        this.setState({editedMovie: movie});
    };
    saveClicked = () =>{
    fetch(`${process.env.REACT_APP_API_URL}/api/movie/`,{
            method: 'POST',
            headers:{
                'Content-type':'application/json',
                'Authorization':'Token e6771f5f4523829fc2abc104810c2a81d7d3b72d'
            },
            body:JSON.stringify(this.state.editedMovie)
        }).then( resp => resp.json())
            .then( res => this.props.newMovie(res))
            .catch( error => console.log(error))
    };
    updateClicked = () =>{
     fetch(`${process.env.REACT_APP_API_URL}/api/movie/${this.props.movie.id}/`,{
            method: 'PUT',
            headers:{
                'Content-type':'application/json',
                'Authorization':'Token e6771f5f4523829fc2abc104810c2a81d7d3b72d'
            },
            body:JSON.stringify(this.state.editedMovie)
        }).then( resp => resp.json())
            .then( res => this.props.editedMovie(res))
            .catch( error => console.log(error))
    };

    render() {
        const isDisable = this.state.editedMovie.title.length === 0 ||
            this.state.editedMovie.description.length === 0
        return (

            <div className="movieForm">
                <span>Title</span><br/>
                <input type="text" name='title' value={this.props.movie.title} onChange={this.inputChanged}/><br/>
                <span> Description</span><br/>
                <textarea value={this.props.movie.description} name='description' onChange={this.inputChanged}/><br/>
                {this.props.movie.id ? (<button  disabled={isDisable} onClick={this.updateClicked}>Update</button>)

                : (<button disabled={isDisable} onClick={this.saveClicked}>Save</button>)}

                &nbsp;
                <button onClick={this.cancelClicked}>Cancel</button>

            </div>
        )
    }
};

export default MovieForm;