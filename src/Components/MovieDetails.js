import React, {Component } from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './MovieDetail.css'


class MovieDetails extends Component {

    state = {
        highlighted:-1
    };
    highlightRate= high=> evt => {
        this.setState({highlighted:high});
    };

    rateClicked = stars => evt => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movie/${this.props.movie.id}/rate_movie/`,{
            method: 'POST',
            headers:{
                'Content-type':'application/json',
                'Authorization':'Token e6771f5f4523829fc2abc104810c2a81d7d3b72d'
            },
            body:JSON.stringify({
                points: stars + 1
            })
        }).then( resp => resp.json())
            .then( res => this.getDetails())
            .catch( error => console.log(error))

    };

    getDetails = ()=> {

        fetch(`${process.env.REACT_APP_API_URL}/api/movie/${this.props.movie.id}/`,{
            method: 'GET',
            headers:{
                'Content-type':'application/json',
                'Authorization':'Token d898a5e506865b9e61d2900bbd3aeaca6119279e'
            }
        }).then( resp => resp.json())
            .then( res => this.props.updateMovie(res))
            .catch( error => console.log(error))
    }



    render() {

        const mov = this.props.movie;
        return (
            <div className="movieDetails">
                {mov ? (
                    <div className="movieDetails__Info">
                    <div className="movieDetails__Title">
                        <h3> {mov.title}</h3>
                    </div>
                    <div className="movieDetails__Description">
                        <FontAwesomeIcon icon="star" className={mov.avg_rating > 0 ? 'movieDetails__Star': ''}/>
                        <FontAwesomeIcon icon="star" className={mov.avg_rating > 1 ? 'movieDetails__Star': ''}/>
                        <FontAwesomeIcon icon="star" className={mov.avg_rating > 2 ? 'movieDetails__Star': ''}/>
                        <FontAwesomeIcon icon="star" className={mov.avg_rating > 3 ? 'movieDetails__Star': ''}/>
                        <FontAwesomeIcon icon="star" className={mov.avg_rating > 4 ? 'movieDetails__Star': ''}/>
                        ({mov.no_of_ratings})
                        <p>{mov.description}</p>

                        <div className="movieDetails__RateContainer">
                            <h2>Rate it!!! </h2>
                            { [...Array(5)].map( (e, i)=> {
                                return <FontAwesomeIcon key={i} icon="star" className={this.state.highlighted > i - 1 ? 'movieDetails__StarRating': ''}
                                onMouseEnter={this.highlightRate(i)} onMouseLeave={this.highlightRate(-1)} onClick={this.rateClicked(i)}/>;
                            })}
                        </div>

                    </div>
                    </div>
                ): null}
            </div>
        )
    }
};

export default MovieDetails;