import React, { Component } from 'react';
import YouTube from 'react-youtube';

export default class YoutubeCard extends Component {
  handleClick() {
    this.props.onClick(this.props.video);
  }

  render() {
    
    return (
      <div onClick={() => this.handleClick()} className='card mx-auto mb-3 shadow rounded dark expand-on-hover text-light'>
        <img className='card-img-top py-2 px-2' src={this.props.video.url}/>
        {/* <YouTube className='rounded' opts={opts} containerClassName='col-6 text-center my-4' videoId={this.props.id} /> */}
        {this.props.description ?
        <div className='content px-3 pb-3'>
          {this.props.video.description}
        </div>
        :
        null
        }
      </div>
    )
  }
}