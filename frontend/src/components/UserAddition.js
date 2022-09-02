import React, { useState } from 'react';
import '../Header/Header.css';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

function UserAddition() {
  const [user, setUser] = useState('');
  const add = () => {
    sessionStorage.setItem('user', user);
    console.log(sessionStorage.getItem('user'));
    window.alert('User Added');
  };
  return (
    <div className="header">
      <div className="header-center">
        <input
          type="text"
          onChange={(e) => setUser(e.target.value)}
          placeholder="Enter username"
          value={user}
        />
        <AddCircleOutlinedIcon className="header-searchbutton" onClick={add} />
      </div>
    </div>
  );
}

export default UserAddition;
