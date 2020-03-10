import React, {Component} from 'react'
import {Link} from 'react-router'
import Nav from './Nav'

class Upload extends Component {
  render() {
    return(
      <div>
        <Nav/>
        <h3 className="text-center"> Upload your 20-second video</h3>
        <h3/>
        <div className='col-sm-12'>
          <div classname='jumbotron text-center'>
            <button className='btn btn-large btn-info'> Upload Video </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Upload
