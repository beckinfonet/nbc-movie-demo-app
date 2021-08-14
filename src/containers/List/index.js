import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Modal from '../../common/Modal';
import data from '../../mock.json';

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
      isFeatured: null
    }
  }

  componentDidMount() {
    this.setState({ movieList: data });
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
      ? this.sortByAcs(this.state.movieList?.items)
      : this.sortByDesc(this.state.movieList?.items);

    this.setState({
      sortBy: event.target.value,
      selectedCategory: 'all',
      movieList: { items: sorted }
    });
  }

  renderAllMovies = movie => {
    return (
      <div className="movie-box" key={movie.id}>
        {this.props.location.pathname === '/list/admin=true'
          && <p>Delete</p>}
        <div>{movie.name}</div>
        <img src={movie.image} alt='img' />
      </div>
    );
  }

  renderByCategory = movie => {
    return movie.map(film => {
      return (
        <div className="movie-box" key={film.id}>
          {this.props.location.pathname === '/list/admin=true' && <p>Delete</p>}
          <div><div>{film.name}</div>
            <img src={film.image} alt='img' />
          </div>
        </div>
      );
    });
  }

  handleModal = () => {
    this.setState({ showModal: !this.state.showModal });
  }

  handleChange = (event) => {
    const { target: { name, value } } = event
    this.setState({ [name]: value })
  }
  render() {
    const unique = [...new Set(this.state.movieList?.items?.map(item => item.category)), 'all'];
    const filteredMovies = this.state.movieList?.items?.filter(movie => movie.category === this.state.selectedCategory);
    console.log('this.props::: ', this.state);
    return (
      <div className="list-container">
        {unique?.length &&
          <div className="filter-box">
            <div className="filter-or-sort">
              <div>
                <p>Please make a selection to filter:</p>
              </div>
              <div className="sort-it-by">
                <p>sort by:</p>
                <select value={this.state.sortBy} onClick={this.handleSort}>
                  {this.state.sortValues?.map((option, idx) => (
                    <option key={idx}>{option}</option>
                  ))}
                </select>
              </div>



            </div>
            <select value={this.state.selectedCategory} onChange={this.handleSelection}>
              {unique?.map((option, idx) => (
                <option key={idx}>{option}</option>
              ))}
            </select>
            {this.props.location.pathname === '/list/admin=true' && <div onClick={this.handleModal}><p >Add new movie</p></div> }
          </div>}


        {
          this.state.selectedCategory === 'all' &&
          this.state.movieList.items?.length &&
          this.state.movieList.items.map(movie => {
            return this.renderAllMovies(movie)
          })
        }
        {
          this.state.selectedCategory !== 'all' && this.renderByCategory(filteredMovies)
        }
        {
          
          this.state.showModal && 
          <Modal show={this.state.showModal} handleClose={this.handleModal}>
            <p>Add your new blockbuster :)</p>
            <div>
              <p>Name:</p>
              <input type="text" name="newMovieName" value={this.state.newMovieName} onChange={this.handleChange} />
              <input type="text" name="newMovieCategory" value={this.state.newMovieCategory} onChange={this.handleChange} />
              <input type="text" name="isFeatured" value={this.state.isFeatured} onChange={this.handleChange} />
            </div>
          </Modal>
        }
      </div>
    );
  }
}

export default withRouter(List);
/*
The list should be filterable:
  All items - render everything - DONE
  By category - ask which category to show - DONE

The list should be sortable:
  By category - render movies by in alphabetic order of category;
  Alphabetically by title - automatic sort on alphabetic order;

*/