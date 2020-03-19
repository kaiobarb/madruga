import React, { Component } from 'react';
//import { Link } from 'react-router';
import Nav from './Nav';
import YouTube from 'react-youtube'
import YoutubeCard from './YoutubeCard'

class Display extends Component {
  render() {    
    return (
      <div>
        
        <h3> Random Videos </h3>
        <hr />
        <div className='row display'>

          {this.props.ready ?
              this.props.videos.map(id =>
                <YoutubeCard id={id}/>
              )
            :
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }

        </div>
      </div>
    )
  }
}

export default Display
