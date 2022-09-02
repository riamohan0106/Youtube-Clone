import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import axios from 'axios';
import './VideoInfo.css';
import { Avatar } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';

const VideoInfo = ({
  title,
  description,
  publishedDate,
  channelTitle,
  channelImage,
  viewCount,

  subs,
}) => {
  let person = sessionStorage.getItem('user');
  let like = '';
  let dislike = '';
  // const [like, setLike] = useState('');
  // const [dislike, setDislike] = useState('');

  let l = '';
  let d = '';

  useEffect(() => {
    // declare the data fetching function
    const user = fetch(`http://localhost:8000/api/UserModel/${person}/${title}`)
      .then((response) => response.json())
      .then((user) => {
        return user.user_like;
      });
    const user1 = fetch(
      `http://localhost:8000/api/UserModel/${person}/${title}`
    )
      .then((response) => response.json())
      .then((user) => {
        return user.user_dislike;
      });

    const printLike = async () => {
      const a = await user;
      console.log(a);
      return a;
    };
    const printDislike = async () => {
      const a = await user1;
      console.log(a);
      return a;
    };

    l = printLike();
    console.log(l);
    d = printDislike();
    console.log(d);
    like = l;
    dislike = d;
  }, []);

  console.log('like' + like);
  console.log('dislike' + dislike);
  //your code to be executed after 1 second
  const likeCount = () => {
    // await sleep(2000);
    if (like) {
      like = false;
    } else {
      like = true;
      // if (dislike) {
      //   setDislikeCount(dislike_count - 1);
      // }
      dislike = false;
    }
    test = 2;
  };
  const dislikeCount = () => {
    if (dislike) {
      like = false;
    } else {
      dislike = true;
      // if (dislike) {
      //   setDislikeCount(dislike_count - 1);
      // }
      like = false;
    }
    test = 2;
  };

  // useEffect(() => {
  //   axios
  //   .put(
  //     `http://localhost:8000/api/likes/UserModel/${person}/${title}/${like}/${dislike}`,
  //     {
  //       user: person,
  //       url: title, //video_title
  //       like: like, //components on the left like video,like,dislike,user will be the parameter names
  //       dislike: dislike,
  //     }
  //   )
  //   .then((res) => console.log(res));

  // }, [test]);

  return (
    <div className="videoinfo">
      <div className="videoinfo-headline">
        <h1>{title}</h1>
      </div>
      <div className="videoinfo-stats">
        <p>
          {viewCount} views • {publishedDate}
        </p>
        <div className="videoinfo-likes">
          <ThumbUpIcon
            style={{ fill: like ? 'red' : 'black', margin: 10 }}
            onClick={likeCount}
          />

          {/* {like_count} */}
          <ThumbDownIcon
            style={{ fill: dislike ? 'red' : 'black', margin: 10 }}
            onClick={dislikeCount}
          />

          {/* {dislike_count} */}
          <div>
            <Icon name="thumbs outline up" />
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
      <hr />
      <div className="videoinfo-channel">
        <div>
          <Avatar
            className="videoinfo-avatar"
            alt={channelTitle}
            src={channelImage}
          />
          <div className="videoinfo-channelinfo">
            <h3 className="videoinfo-channeltitle">{channelTitle}</h3>
            <p className="videoinfo-channelsubs">{subs} subscribers</p>
          </div>
        </div>
      </div>
      <div className="videoinfo-channeldesc">
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default VideoInfo;
