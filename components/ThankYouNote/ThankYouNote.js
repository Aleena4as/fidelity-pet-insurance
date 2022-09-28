import React from "react";

const ThankYouNote = ({ note, imgSrc, bg }) => {
   return (
      <div className="thanksNote">
         {bg ? (
            <div className="gifBg">
               <img src={imgSrc} alt="" />
            </div>
         ) : (
            <img src={imgSrc} alt="" />
         )}
         <p className="noteTitle">Thank You</p>
         <p className="note">{note}</p>
      </div>
   );
};

export default ThankYouNote;
