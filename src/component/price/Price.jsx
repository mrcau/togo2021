import React, { useEffect, useRef, useState } from 'react';
import Swal from 'sweetalert2';
import "./price.css";

function Price({fireApp,user,userInfo}) {
 
  return (
    <div className="price">      
      <div className="mypageTop"><div className="logo"/>Price plan</div>
      <div className="priceTable">
        <div className="priceImg silver" />
        <div className="priceImg gold" />
        <div className="priceImg dia" />
        <div className="priceImg group" />
      </div>

    </div>
  );
}

export default Price;

