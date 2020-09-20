import React, {Component} from 'react';
import './App.css';
import MovieList from "./Components/MovieList";
import MovieDetails from "./Components/MovieDetails";

class App extends Component {
    state = {
        movies: [],
        selectedMovie: null
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
        this.setState({selectedMovie:movie})
    };

    movieDeleted = selmovie => {

        const movies = this.state.movies.filter( movie => movie.id !== selmovie.id);
        this.setState({movies: movies, selectedMovie:null})

    };

    editClicked = selmovie => {



    };

    render(){
        return (
            <div className="app">
               <h1> Movie Rater</h1>
                <div className="app__Layout">
                <MovieList movies={this.state.movies} movieClicked={this.loadMovie}
                movieDeleted={this.movieDeleted} editClicked={this.editClicked}/>
                <MovieDetails movie={this.state.selectedMovie} updateMovie={this.loadMovie}/>
                </div>
            </div>
          );
    }

}

export default App;
