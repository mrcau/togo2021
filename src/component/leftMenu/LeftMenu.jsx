import './leftMenu.css';
import { Avatar, IconButton } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import React, { memo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import mime from 'mime-types';



function LeftMenu({ fireApp, user, photo, setPhoto }) {

  const upLoad = (e) => {
    const file = e.target.files[0];
    const metaData = { contentType: mime.lookup(file.name) }
    fireApp.imgUpload(user.uid, file, metaData, (e) => setPhoto(e));
  }
  const history = useHistory();
  return (
    <div className="leftMenu">

      {photo ? <div className="imgBg" style={{ backgroundImage: `url("${photo}")` }} />
        : <Avatar style={{ width: '120px', height: '120px' }} />}
      {Object.keys(user).length>0 &&
        <input accept="image/*" style={{ display: 'none' }} id="photoFile" type="file" onChange={upLoad} />
      }
      <label htmlFor="photoFile">
        <IconButton component="span">
          <PhotoCamera />
        </IconButton>
      </label>
      <h6>{user.email}</h6>
      {/* <hr style={{width:'90%',border:'dashed 1px gray'}} /> */}
      <button className="btnlink" onClick={() => history.push('/todo')}>Todo</button>
      <button className="btnlink" onClick={() => history.push('/scamper')}>scamper</button>
      <button className="btnlink" onClick={() => history.push('/authTable')}>회원관리</button>
    </div>
  );
}

export default memo(LeftMenu);