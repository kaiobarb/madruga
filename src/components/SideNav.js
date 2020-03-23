import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class SideNav extends Component {
  render() {
    const opts = {
      // height: '180',
      width: '550',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }
    return (
      <div className='sidebar content shadow dark px-3'>
        <h2>{this.props.video.title}</h2>
        <YouTube className='rounded' videoId={this.props.video.id} opts={opts}/>
        <div className='container border border-dark bg-dark rounded'>
          {this.props.video.description ?
          <p>{this.props.video.description}</p>
          :
          <p className='text-muted'><em>No Description</em></p>
          }
        </div>
      </div>
    )
  }
}