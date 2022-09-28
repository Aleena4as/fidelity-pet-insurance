import React from 'react';

function MainTitle({ title, addon, img }) {
   return (
      <div
         className={`mainTitle  ${
            addon === 'grey'
               ? 'greyBox'
               : addon === 'left'
               ? 'colouredLeft'
               : addon === 'center'
               ? 'colouredCenter'
               : ''
         }`}
      >
         <p>{title}</p>
         {/* {img && <img src={img} alt="" />} */}
      </div>
   );
}

export default MainTitle;
