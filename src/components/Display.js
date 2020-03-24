import React, { Component } from 'react';
import YoutubeCard from './YoutubeCard';
import SideNav from './SideNav';

class Display extends Component {
  render() {
    return (
      <div className=''>
        <div className='container ml-3 mt-5 results'>
          <div className='row mt-5'>
            <h3 className=' col'> Default Filename </h3>
            <div className='col'>
              <button type='button' onClick={() => this.props.refresh()} className='btn btn-info'>Refresh</button>
              <p className='text-muted right-align'>
                Search Terms: {this.props.searchQuery}
              </p>
            </div>
          </div>
          <hr />
            <div className='row cardcolumns'>
              {this.props.ready ?
                this.props.videos.map((video) =>
                  <YoutubeCard video={video} onClick={this.props.onClick}/>
                )
                :
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              }
            </div>
        </div>
        <SideNav video={this.props.activeVideo}/>
      </div>
    )
  }
}

export default Display
