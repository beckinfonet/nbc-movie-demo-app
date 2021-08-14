import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import './styles.css';

class Details extends Component {
  render() {
    return (
      <div className="main-box">
        <div>
          <p className="title">{this.props.location.state.data.name}</p>
          <img src={this.props.location.state.data.image} alt='images' />
        </div>
      </div>
    )
  }
}

export default withRouter(Details);
// deatils