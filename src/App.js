import React, { Component } from 'react';
import './custom.scss';
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
      searchQuery: '',
      videos: [{ id: "ZhstyJSNKME", description: "huehue", title: "lofi hip hop - brazil songs playlist", },
      { id: "ZhstyJSNKME", description: "huehue", title: "lofi hip hop - brazil songs playlist", },
      { id: "ZhstyJSNKME", description: "huehue", title: "lofi hip hop - brazil songs playlist", },
      { id: "ZhstyJSNKME", description: "huehue", title: "lofi hip hop - brazil songs playlist", },
      { id: "ZhstyJSNKME", description: "huehue", title: "lofi hip hop - brazil songs playlist", },
      { id: "ZhstyJSNKME", description: "huehue", title: "lofi hip hop - brazil songs playlist", },],
      gapiReady: false,
      activeVideo: {},
    }
  }

  // Maybe give each video an id corresponding to its index in the column?
  handleCardClick = (theVideo) => {
    this.setState({activeVideo: theVideo})
  }

  loadYoutubeApi = () => {
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

  youtubeSearch = () => {
    const prefix = ['IMG ', 'IMG_', 'IMG-', 'DSC '];
    const postfix = [' MOV', '.MOV', ' .MOV'];
    const query = prefix[Math.floor(Math.random() * prefix.length)] + String(Math.floor(Math.random() * 9999) + 999) + postfix[Math.floor(Math.random() * postfix.length)];
    this.setState({searchQuery:query})
    window.gapi.client.youtube.search.list({
      part: "snippet",
      maxResults: "12",
      q: query,
    }).then(response => {
      const videoList = []
      for (const video of response.result.items) {
        videoList.push({
          id: video.id.videoId,
          description: video.snippet.description,
          title: video.snippet.title,
          url: video.snippet.thumbnails.medium.url,
          channelTitle: video.snippet.channelTitle,
          date: video.snippet.publishedAt,
        });
      }
      this.setState({ videos: videoList })
      this.setState({activeVideo: videoList[0]})
      //videoIdString = response.result.items[0].id.videoId;
      return;
    })
  }

  componentDidMount() {
    this.loadYoutubeApi();
  }

  render() {

    return (
      <>
        <Nav />
        <div className='body'>
        <Router history={browserHistory}>
          <Route path="/" component={() => {
            return <Display 
              ready={true} 
              searchQuery={this.state.searchQuery} 
              videos={this.state.videos} 
              onClick={this.handleCardClick}
              refresh={this.youtubeSearch} 
              activeVideo={this.state.activeVideo} />;
          }} />
          <Route path="/upload" component={Upload} onEnter={requireAuth} />
          <Route path="/callback" component={Callback} />
        </Router>
        </div>
      </>
    )
  }
}
export default App;
