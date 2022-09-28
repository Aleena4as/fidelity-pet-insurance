import React from 'react';

const BackAndNextButton = ({ leftTitle, rightTitle, handleUploadPolicyDocs, handleRequestHelp }) => {
   return (
      <div className="buttonWrap">
         <button type="button" className="nextButton" onClick={handleUploadPolicyDocs}>
            {leftTitle}
         </button>
         <button className="backButton" onClick={() => handleRequestHelp()}>
            {rightTitle}
         </button>
      </div>
   );
};

export default BackAndNextButton;
