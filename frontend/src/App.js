import React from 'react';
import './App.css';
import SearchPage from './components/SearchPage/SearchPage';
import RecommendedVideos from './components/RecommendedVideos/RecommendedVideos';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
import HomePage from './HomePage';

function App() {
  return (
    <div className="App">
      {/* <script>{window.alert('Enter Username')}</script> */}
      <Router>
        <Header />
        <Routes>
          <Route path="/video/:videoId" element={<VideoPlayer />}></Route>
          <Route path="/search/:searchQuery" element={<SearchPage />}></Route>
          {/* <Route path="/" element={<App1 />}></Route> */}
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
