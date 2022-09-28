import React from 'react';

const SectionTitle = ({ title, classes, img }) => {
   return (
      <div className={`sectionTitle ${classes ? classes : ''}`}>
         <p>{title}</p>
       
      </div>
   );
};

export default SectionTitle;
