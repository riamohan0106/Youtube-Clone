import React from 'react';
import './VideoRow.css';

const VideoRow = ({ views, description, timestamp, channel, title, image }) => {
  return (
    <div className="videorow">
      <img src={image} alt="" />
      <div className="videorow-text">
        <h3>{title}</h3>
        <p className="videorow-headline">
          {channel} • {views} views • {timestamp}
        </p>
        <p className="videorow-description">{description}</p>
      </div>
    </div>
  );
};

export default VideoRow;
