import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './VideoCard.css';

const VideoCard = ({
  image,
  title,
  channel,
  views,
  timestamp,
  channelImage,
}) => {
  return (
    <div className="videocard">
      <img className="videocard-image" src={image} alt="" />
      <div className="videocard-info">
        <Avatar className="videocard-avatar" alt={channel} src={channelImage} />
        <div className="videocard-text">
          <h4>{title}</h4>
          <p>{channel}</p>
          <p>
            {views} views • {timestamp}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
