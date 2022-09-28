import React from 'react';

const Footer = () => {
   return (
      <section id="footer">
         <div className="footerContainer">
            <div className="row">
               <div className="col-12 col-md-3">
                  <div className="footerLogo">
                     <a href="https://fidelityunited.ae/" target="_blank">
                        <img src="images/footerLogo.png" alt="logo" />
                     </a>
                  </div>
               </div>
               <div className="col-12 col-md-3">
                  <p className="footer-titles">Office Address</p>
                  <div className="footerDetails">
                     <p> The Opus Tower, Block B, Office B703, Business Bay Post Box, 1888, Dubai, U.A.E.</p>
                  </div>
               </div>
               <div className="col-12 col-md-3">
                  <p className="footer-titles">Contact Us</p>
                  <div className="footerDetails">
                     {/* <p> The Opus Tower, Block B, Office B703, Business Bay Post Box, 1888, Dubai, U.A.E.</p> */}
                     <p>
                        Toll Free: <a href="tel:800 842">800 842</a>
                     </p>
                     <p>
                        Visit us at: <a href="https://fidelityunited.ae/">https://fidelityunited.ae/</a>
                     </p>
                  </div>
               </div>
               <div className="col-12 col-md-3">
                  <p className="footer-titles">Connect with us.</p>
                  <div className="socialMediaWrap">
                     <a href="https://www.facebook.com/FidelityUnited/" target="_blank">
                        <img src="images/version2/fbIcon.svg" alt="" />
                     </a>
                     <a href="https://www.linkedin.com/company/fidelity-united/" target="_blank">
                        <img src="images/version2/linkedInIcon.svg" alt="" />
                     </a>
                     <a href="https://www.instagram.com/fidelity_united/" target="_blank">
                        <img src="images/version2/instaIcon.svg" alt="" />
                     </a>
                  </div>
               </div>
               <div className="col-12">
                  <div className="copyright">
                     <p>Copyright &copy; 2021. All Rights Reserved</p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Footer;
