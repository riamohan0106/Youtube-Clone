import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import axios from 'axios';
import './VideoInfo.css';
import { Avatar } from '@material-ui/core';
import { useState, useEffect, Component } from 'react';

import { Icon } from 'semantic-ui-react';

window.like = '';
window.dislike = '';
window.likeStatus = [{}];
window.countStatus = [{}];
window.like_count = 0;
window.dislike_count = 0;
//window.location = '';

const VideoInfo = ({
  title,
  description,
  publishedDate,
  channelTitle,
  channelImage,
  viewCount,
  subs,
}) => {
  console.log('hi' + window.like);
  let id = sessionStorage.getItem('video_id');
  let person = sessionStorage.getItem('user');
  console.log(person);
  console.log(id);
  const reloading = () => {
    if (window.localStorage) {
      if (!localStorage.getItem('firstLoad')) {
        localStorage['firstLoad'] = true;
        window.location.reload();
      } else localStorage.removeItem('firstLoad');
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/UserModel/${person}/${id}`)
      .then((res) => {
        console.log(res.data.user_like);
        window.likeStatus = res.data;
        window.like = res.data.user_like;
        window.dislike = res.data.user_dislike;
        localStorage.setItem('like_status', res.data.user_like);
        localStorage.setItem('dislike_status', res.data.user_dislike);

        reloading();
      });

    axios.get(`http://localhost:8000/api/Youtube_clone/${id}`).then((res) => {
      console.log(res.data.video_dislikes);
      window.dislike_count = res.data.video_dislikes;
      window.like_count = res.data.video_likes;
      window.countStatus = res.data;
      localStorage.setItem('like_count', res.data.video_likes);
      localStorage.setItem('dislike_count', res.data.video_dislikes);
    });
    //window.like_count = window.countStatus.video_likes;
    //window.dislike_count = window.countState.video_dislikes;
  }, []);
  const likeHandler = () => {
    console.log('after click');
    console.log(window.like);
    console.log(window.dislike);
    let person1 = sessionStorage.getItem('user');
    console.log(person1);
    axios
      .put(
        `http://localhost:8000/api/likes/UserModel/${person1}/${id}/${window.like}/${window.dislike}`,
        {
          user: person1,
          url: id, //video_id
          like: window.like, //components on the left like video,like,dislike,user will be the parameter names
          dislike: window.dislike,
        }
      )
      .then((res) => console.log(res));
    axios
      .put(
        `http://localhost:8000/api/likes/Youtube_clone/${id}/${window.like_count}/${window.dislike_count}`,
        {
          url: id, //video_id
          video_likes: window.like_count, //components on the left like video_likes,title,video_dislikes will be the parameter names
          video_dislikes: window.dislike_count,
        }
      )
      .then((res) => console.log(res));
    reloading();
    reloading();
  };
  const likeCount = (e) => {
    e.preventDefault();
    console.log('in click');
    console.log(window.likeStatus);
    console.log(window.like);
    console.log(window.dislike);
    if (window.like == 'true') {
      window.like = 'false';
      window.like_count -= 1;
    } else {
      window.like = 'true';
      if (window.dislike == 'true') {
        window.dislike_count -= 1;
      }
      window.dislike = 'false';
      window.like_count += 1;
    }
    likeHandler();
    console.log('after click');
    console.log(window.likeStatus);
    console.log(window.like);
    console.log(window.dislike);
  };
  const dislikeCount = (e) => {
    e.preventDefault();
    console.log('in click');
    console.log(window.likeStatus);
    console.log(window.like);
    console.log(window.dislike);
    if (window.dislike == 'true') {
      window.dislike = 'false';
      window.dislike_count -= 1;
    } else {
      window.dislike = 'true';
      if (window.like == 'true') {
        window.like_count -= 1;
      }
      window.like = 'false';
      window.dislike_count += 1;
    }
    likeHandler();
  };

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
            style={{
              fill:
                localStorage.getItem('like_status') == 'true' ? 'red' : 'black',
              margin: 10,
            }}
            onClick={likeCount}
          />
          {localStorage.getItem('like_count')}

          {/* {like_count} */}
          <ThumbDownIcon
            style={{
              fill:
                localStorage.getItem('dislike_status') == 'true'
                  ? 'red'
                  : 'black',
              margin: 10,
            }}
            onClick={dislikeCount}
          />

          {localStorage.getItem('dislike_count')}

          {/* {dislike_count} */}
          <div>
            <Icon name="thumbs outline up" />
            {/* <span>{likeCount}</span> */}
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
