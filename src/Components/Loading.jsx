import React, { Component } from 'react';
import Spinner from 'react-bootstrap/Spinner';

export default class Loading extends Component {
  render() {
    return (
      <div className='text-center '>
        <Spinner animation="border" variant="danger" style={{fontSize:"50px"}} />
      </div>
    )
  }
}
