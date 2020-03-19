import React, { Component } from 'react';
import './App.css';
import Upload from './components/Upload';
import Display from './components/Display';
import Callback from './components/Callback';
import { Router, Route, browserHistory } from 'react-router';
import { requireAuth } from './utils/AuthService';
import Nav from './components/Nav';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: ["SZpjovHCQd8", "SZpjovHCQd8", "SZpjovHCQd8", "SZpjovHCQd8", "SZpjovHCQd8", "SZpjovHCQd8",],
      gapiReady: false,
    }
  }

  loadYoutubeApi() {
    const API_KEY = 'AIzaSyBEa-dJTJHoQjkGRHgJl7ajsfiBUJZzOnY'
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      window.gapi.load('client', () => {
        window.gapi.client.setApiKey(API_KEY);
        window.gapi.client.load('youtube', 'v3', () => {
          this.setState({ gapiReady: true });
          this.youtubeSearch()
        });
      });
    };
    document.body.appendChild(script);
  }

  youtubeSearch() {
    const prefix = ['IMG ', 'IMG_', 'IMG-', 'DSC '];
    const postfix = [' MOV', '.MOV', ' .MOV'];
    const query = prefix[Math.floor(Math.random() * prefix.length)] + String(Math.floor(Math.random() * 9999) + 999) + postfix[Math.floor(Math.random() * postfix.length)];
    window.gapi.client.youtube.search.list({
      part: "snippet",
      maxResults: "25",
      q: query,
    }).then(response => {
      /*const videoList = []
      for (const video of response.result.items) {
        videoList.push(video.id.videoId);
      }
      this.setState({ videos: videoList })
      //videoIdString = response.result.items[0].id.videoId;*/
      return;
    })
  }

  componentDidMount() {
    //this.loadYoutubeApi();
  }

  render() {
    
    return (
      <>
      <Nav />
      <div className="ml-5 mt-5">
        <Router history={browserHistory}>
          <Route path="/" component={() => {
            return <Display ready={true} videos={this.state.videos} />;
          }} />
          <Route path="/upload" component={Upload} onEnter={requireAuth} />
          <Route path="/callback" component={Callback} />
        </Router>
        <div>

        </div>
      </div>
      </>
    )
  }
}
export default App;
