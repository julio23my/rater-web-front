import React, {Component} from 'react';
import './App.css';
import MovieList from "./Components/MovieList";
import MovieDetails from "./Components/MovieDetails";
import MovieForm from "./Components/MovieForm";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


class App extends Component {
    state = {
        movies: [],
        selectedMovie: null,
        editedMovie: null
    }



    componentDidMount() {
        //fetch data
        fetch(`${process.env.REACT_APP_API_URL}/api/movie/`,{
            method: 'GET',
            headers:{
                'Authorization':'Token d898a5e506865b9e61d2900bbd3aeaca6119279e'
            }
        }).then( resp => resp.json())
            .then( res => this.setState({movies: res}))
            .catch( error => console.log(error))
    };

    loadMovie = movie => {
        this.setState({selectedMovie:movie, editedMovie:null})
    };

    movieDeleted = selmovie => {

        const movies = this.state.movies.filter( movie => movie.id !== selmovie.id);
        this.setState({movies: movies, selectedMovie:null})

    };

    editClicked = selmovie => {
        this.setState({editedMovie: selmovie});



    };

    newMovie = () => {
        this.setState({editedMovie: {title: '', description: ''}});



    };
    cancelForm = () => {
        this.setState({editedMovie: null});



    };
    addMovie = movie => {
        this.setState({movies :[...this.state.movies, movie] });



    };

    render(){
        return (
            <div className="app">
               <h1><FontAwesomeIcon icon="film" />
                   <span>
                   Movie Rater
               </span></h1>
                <div className="app__Layout">
                <MovieList movies={this.state.movies} movieClicked={this.loadMovie}
                movieDeleted={this.movieDeleted} editClicked={this.editClicked} newMovie={this.newMovie}/>
                <div>
                    { !this.state.editedMovie ? (
                        <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie}/>

                    ) : (<MovieForm movie={this.state.editedMovie} cancelForm={this.cancelForm} newMovie={this.addMovie}
                    editedMovie={this.loadMovie}/>) }

                </div>
                </div>
            </div>
          );
    }

}

export default App;
