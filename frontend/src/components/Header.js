import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import VideoCallIcon from '@material-ui/icons/VideoCall';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Avatar from '@material-ui/core/Avatar';

function Header() {
  const [inputSearch, setInputSearch] = useState('');

  return (
    <div className="header">
      <div className="header-left">
        {/* <MenuIcon /> */}

        <Link
          to={
            sessionStorage.getItem('search')
              ? `/search/${sessionStorage.getItem('search')}`
              : '/'
          }
        >
          <img
            className="header-logo"
            src="https://img.icons8.com/ios-filled/344/fa314a/circled-left.png"
            alt=""
          />
        </Link>
        <Link to="/">
          <img
            className="header-logo"
            src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Logo_of_YouTube_%282015-2017%29.svg"
            alt=""
          />
        </Link>
      </div>

      <div className="header-center">
        <input
          type="text"
          onChange={(e) => setInputSearch(e.target.value)}
          value={inputSearch}
        />
        <Link to={`/search/${inputSearch}`}>
          <SearchIcon className="header-searchbutton" />
        </Link>
      </div>

      <div className="header-right">
        <VideoCallIcon className="header-icon" />
        <AppsIcon className="header-icon" />
        <NotificationsIcon className="header-icon" />
        <Avatar alt="Hiver" src="https://i.postimg.cc/B6ryryjY/hiver.png" />
      </div>
    </div>
  );
}

export default Header;
