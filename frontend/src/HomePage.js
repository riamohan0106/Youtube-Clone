import UserAddition from './components/UserAddition/UserAddition';
import RecommendedVideos from './components/RecommendedVideos/RecommendedVideos';
import React from 'react';

function HomePage() {
  return (
    <div>
      <UserAddition />
      <RecommendedVideos />
    </div>
  );
}

export default HomePage;
