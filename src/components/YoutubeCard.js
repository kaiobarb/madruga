import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class YoutubeCard extends Component {
  render() {
    const opts = {
      height: '230',
      width: '410',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }
    return (
      <div className='card rounded my-2 mx-auto dark expand-on-hover align-self-center text-light'>
        <YouTube opts={opts} containerClassName='col text-center my-4' videoId={this.props.id} />
        <div className='content mx-3 mb-3'>Lorem ipsum</div>
      </div>        
    ) 
  }
}