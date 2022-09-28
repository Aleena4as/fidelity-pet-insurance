import React from 'react';

const NavWeb = ({ toggle }) => {
   return (
      <div className="navWeb">
         <div className="nav">
            <a href="https://fidelityunited.ae/" className="logo" target="_blank">
               <img src="images/MicrosoftTeams-image(8).png" alt="logo" />
            </a>

            <div className="bars" onClick={toggle}>
               <img src="images/version2/hamburgerMenu.svg" alt="" />
            </div>
         </div>
      </div>
   );
};

export default NavWeb;
