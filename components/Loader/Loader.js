import React from 'react';

const Loader = ({ statusTitle }) => {
   return (
      <div className="loaderContainer">
         <label>
            <div className="wrapper">
               <div className="circle"></div>
               <div className="circle"></div>
               <div className="circle"></div>
               <div className="shadow"></div>
               <div className="shadow"></div>
               <div className="shadow"></div>
               <span>{statusTitle}</span>
            </div>
         </label>
      </div>
   );
};

export default Loader;
