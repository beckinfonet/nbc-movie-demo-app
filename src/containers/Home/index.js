import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from './constants.js';
import Loader from '../../common/Loader';

import './styles.css';

class Home extends Component {

  componentDidMount() {
    if(!this.props.movies) {
      this.props.onRequestMovieList();
    }
  }

  navigateToDetails = (movie) => {
    this.props.history.push({
      pathname: '/details',
      state: { data: movie }
    });
  }

  render() {
    return (
      <div className="main-container">
        <p className="home-page bold">Home page</p>
        {this.props.fetching && <Loader />}
        {
          this.props.movies?.filter(name => name.featured).map(movie => {
            return (
              <div className="movie-box" key={movie.id} onClick={() => this.navigateToDetails(movie)}>
                <div><p className="home-page">{movie.name}</p></div>
                <img src={movie.image} alt='img' className="photo" />
              </div>
            )
          })
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    fetching: state.movieHomeReducer.fetching,
    movies: state.movieHomeReducer.moviesList,
    error: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestMovieList: () => dispatch({ type: actions.MOVIE_LIST_REQUEST })
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));