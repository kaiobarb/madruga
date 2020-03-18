import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
//import {google} from 'googleapi'

import Upload from './components/Upload';
import Display from './components/Display';
import Callback from './components/Callback';
import { Router, Route, browserHistory } from 'react-router';
import { requireAuth } from './utils/AuthService';
import YouTube from 'react-youtube'
// import { youtube_v3 } from 'googleapis';
//import {youtube_v3} from 'googleapis'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [],
      gapiReady: false,
    }
    this.getRandomYoutubeVideos = this.getRandomYoutubeVideos.bind(this)
  }
  getRandomYoutubeVideos(max) {
    return []
  }

  loadYoutubeApi() {
    const API_KEY = 'AIzaSyBEa-dJTJHoQjkGRHgJl7ajsfiBUJZzOnY'
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";
    
    // return new Promise( (resolve, reject) => {
      //resolve(
        script.onload = () => {
          window.gapi.load('client', () => {
            window.gapi.client.setApiKey(API_KEY);
            window.gapi.client.load('youtube', 'v3', () => {
              this.setState({ gapiReady: true });
            });
          });
        };
        document.body.appendChild(script);
      //);
    //})
  }

  youtubeSearch(keyword) {
    var videoIdString = ""
    window.gapi.client.youtube.search.list({
      part: "snippet",
      maxResults: "25",
      q: "surf"
    }).then(response => {
      const videoList = []
      for (const video of response.result.items){
        videoList.push(video.id.videoId);
      }
      this.setState({videos: videoList})
      //videoIdString = response.result.items[0].id.videoId;
      return;
    })
    
    //console.log(window.gapi.client.youtube)
  }

  componentDidMount() {
    this.loadYoutubeApi();
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }
    return (
      <div className="container">
        <Router history={browserHistory}>
          <Route path="/" component={Display} />
          <Route path="/upload" component={Upload} onEnter={requireAuth} />
          <Route path="/callback" component={Callback} />
        </Router>
        <div>
          {this.state.gapiReady ?   
            <div>
              {this.youtubeSearch("surf")}
              <ul>
                { this.state.videos.map( id => 
                <li>Video Id: {id}</li>
                )}
              </ul>
            </div> : 
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          }
        </div>
      </div>
    )
  }
}
export default App;
