import { Avatar, IconButton } from '@material-ui/core';
import { PhotoCamera } from '@material-ui/icons';
import React, { useState } from 'react';
import './leftMenu.css';
function LeftMenu({ menuToggle, ontoggle }) {
  const [logo, setLogo] = useState('');
  const email ='';

  const upLoad = (e) => {
    const file = e.target.files[0];
    // const metaData = {contentType:mime.lookup(file.name)}
    // fireApp.imgUpload(user.uid,file,metaData,(e)=>{setlogo(e);setLogoUrl(e);})
    console.log(file);
    }
  return (
    <div className="leftMenu">
    
      {logo ? <div className="imgBg" /> 
      : <Avatar style={{ width: '120px', height: '120px' }} /> }
      
      <input accept="image/*" style={{display:'none'}} id="photoFile" type="file" onChange={upLoad} />
          <label htmlFor="photoFile">
            <IconButton color="secondary" aria-label="upload picture" component="span">
              <PhotoCamera />
            </IconButton>
          </label>

      {/* <hr style={{width:'90%',border:'dashed 1px gray'}} /> */}
      <button className="btnlink todo">Todo</button>
    </div>
  );
}

export default LeftMenu;