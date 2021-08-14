import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import data from '../../mock.json';

import './styles.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieList: []
    }
  }

  componentDidMount() {
    this.setState({ movieList: data });
  }

  navigateToDetails = (movie) => {
    this.props.history.push({ 
      pathname: '/details',
      state: { data: movie }
    });
  }

  render() {
    console.log('state', this.state.movieList.items)
    return (
      <div className="main-container">
        <p>Home page lol</p>
        {
          this.state.movieList?.items?.length && this.state.movieList.items.map(movie => {
            return (
              <div className="movie-box" key={movie.id} onClick={() => this.navigateToDetails(movie)}>
                <div>{movie.name}</div>
                <img src={movie.image} alt='img' />
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default withRouter(Home);

/*
Home Page Requirements
The Home page should show the following:
  Feature DVDs from the JSON - DONE
  Feature products will show name and image - DONE
  Display vertically or carousel ??? - [VERTICAL - DONE, CAROUSEL - NOT Done]
  A user should be able to click the feature product and go to the detail page. - DONE
  A user should also be able to navigate to the List page. - DONE
*/