import React, { useEffect } from 'react';

const AlertPopUp = ({ note, imgSrc, bg, title, onload }) => {
   useEffect(() => {
      onload();
   }, []);
   return (
      <div className="alertPanel">
         {bg ? (
            <div className="gifBg">
               <img src={imgSrc} alt="" />
            </div>
         ) : (
            <img src={imgSrc} alt="" />
         )}
         <p className="noteTitle">{title ? title : ''}</p>
         <p className="note">{note}</p>
      </div>
   );
};

export default AlertPopUp;
