import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import Modal from '../../common/Modal';
import * as types from './constants';

import './styles.css';

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: [],
      selectedCategory: 'all',
      sortBy: "-1",
      sortValues: ['A-Z', "Z-A"],
      showModal: false,
      newMovieName: '',
      newMovieCategory: '',
      isFeatured: '',
    }
  }

  componentDidMount() {
    this.props.onRequestMovieList();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.movieList !== this.props.movieList) {
      this.setState({ movieList: this.props.movieList });
    }
  }

  handleSelection = e => {
    this.setState({ selectedCategory: e.target.value });
  }

  sortByAcs = items => {
    const result = items.sort(function (a, b) {
      const titleA = a.name.toUpperCase();
      const titleB = b.name.toUpperCase();

      if (titleA < titleB) {
        return -1;
      }
      if (titleA > titleB) {
        return 1;
      }

      return 0;
    });
    return result;
  }

  sortByDesc = items => {
    const result = items.sort((a, b) => {
      const titleA = a.name.toUpperCase();
      const titleB = b.name.toUpperCase();
      if (titleA > titleB) {
        return -1;
      }
      if (titleA < titleB) {
        return 1;
      }

      return 0;
    });
    return result;
  }

  handleSort = (event) => {
    const sorted = event.target.value === 'A-Z'
      ? this.sortByAcs(this.state.movieList)
      : this.sortByDesc(this.state.movieList);

    this.setState({
      sortBy: event.target.value,
      selectedCategory: 'all',
      movieList: sorted
    });
  }

  renderAllMovies = movie => {
    return (
      <div className="movie-box" key={movie.id}>
        {this.props.location.pathname === '/list/admin=true'
          && <div className="add-button">
            <p className="add-new-movie-title" onClick={() => this.removeMovie(movie)}>Delete</p>
          </div>}
        <div><h1>{movie.name}</h1></div>
        <img src={movie.image} alt='img' className='photo' />
      </div>
    );
  }

  renderByCategory = movie => {
    return movie.map(film => {
      return (
        <div className="movie-box" key={film.id}>
          {this.props.location.pathname === '/list/admin=true'
            && <div className="add-button">
              <p className="add-new-movie-title" onClick={() => this.removeMovie(film)}>Delete</p>
            </div>
          }
          <div><div>{film.name}</div>
            <img src={film.image} alt='img' />
          </div>
        </div>
      );
    });
  }

  handleModal = () => {
    this.setState({ 
      showModal: !this.state.showModal,
      newMovieName: '',
      newMovieCategory: '',
      isFeatured: ''
    });
  }

  handleChange = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }

  handleSubmit = () => {
    this.props.addNewMovie({
      id: this.state.movieList.length + 1,
      name: this.state.newMovieName,
      category: this.state.newMovieCategory,
      featured: this.state.isFeatured,
    });
    this.setState({
      showModal: !this.state.showModal,
      newMovieName: '',
      newMovieCategory: '',
      isFeatured: ''
    })
  }

  removeMovie = (movie) => {
    this.props.removeMovie({
      id: movie.id,
      name: movie.name,
    });
  }

  handleRadio = (event) => {
    const isFeatured = event.currentTarget.value === 'true' ? true : false;
    this.setState({ isFeatured });
  }

  checkReadyness = () => {
    if (this.state.newMovieName.length &&
      this.state.newMovieCategory.length &&
      this.state.isFeatured !== '') {
      return true;
    }

    return false;
  }

  render() {
    const { isFeatured } = this.state;
    const unique = [...new Set(this.state.movieList?.map(item => item.category)), 'all'];
    const filteredMovies = this.state.movieList?.filter(movie => movie.category === this.state.selectedCategory);
    return (
      <div className="list-container">
        {unique?.length &&
          <div className="filter-box">
            <div>
              <div className="filter-or-sort">
                <h2>Please make a selection to filter:</h2>
              </div>
              <div>
                <select value={this.state.selectedCategory} onChange={this.handleSelection}>
                  {unique?.map((option, idx) => (
                    <option key={idx}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="sort-it-by">
              <h3>sort by:</h3>
              <select value={this.state.sortBy} onChange={this.handleSort}>
                {this.state.sortValues?.map((option, idx) => (
                  <option key={idx}>{option}</option>
                ))}
              </select>
            </div>
            {this.props.location.pathname === '/list/admin=true' &&
              <div className="new-movie-box">
                <div className="add-button" onClick={this.handleModal}>
                  <p className="add-new-movie-title">Add new movie</p>
                </div>
              </div>}
          </div>}

        {
          this.state.selectedCategory === 'all' &&
          this.state.movieList.length &&
          this.state.movieList.map(movie => {
            return this.renderAllMovies(movie)
          })
        }
        {
          this.state.selectedCategory !== 'all' && this.renderByCategory(filteredMovies)
        }
        {
          this.state.showModal &&
          <Modal show={this.state.showModal} handleClose={this.handleModal} handleSubmit={this.handleSubmit} readyToSubmit={this.checkReadyness()}>
            <p className="main-title">ADD NEW RECORD</p>
            <div>

              <div className="fillout">
                <div>
                  <p>Name:</p>
                  <input type="text" placeholder="Name" name="newMovieName" value={this.state.newMovieName} onChange={this.handleChange} />
                </div>
                <div>
                  <p>Category</p>
                  <input type="text" placeholder="Category" name="newMovieCategory" value={this.state.newMovieCategory} onChange={this.handleChange} />
                </div>
              </div>


              <div className="input-fields">
                <p>Is this new movie featured?</p>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="isFeatured"
                      value="true"
                      checked={isFeatured === true}
                      onChange={this.handleRadio} />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="isFeatured"
                      value="false"
                      checked={isFeatured === false}
                      onChange={this.handleRadio} />
                    No
                  </label>
                </div>
              </div>
            </div>
          </Modal>
        }
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    fetching: state.movieHomeReducer.fetching,
    movieList: state.movieHomeReducer.moviesList,
    error: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestMovieList: () => dispatch({ type: types.MOVIE_LIST_REQUEST }),
    addNewMovie: (data) => dispatch({ type: types.ADD_NEW_MOVIE, data }),
    removeMovie: (data) => dispatch({ type: types.REMOVE_MOVIE, data }),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(List));