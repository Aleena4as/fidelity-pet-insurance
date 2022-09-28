import React from 'react';
import MainTitle from '@/components/Titles/MainTitle/MainTitle';

const HowItWorks = () => {
   return (
      <section id="howItWorks">
         <div className="container howItWorksContainer">
            <div className="worksWrap">
               <div className="howWorksBg responsiveBg">
                  <img className="d-none d-md-block" src="images/version2/howItworksBg.svg" alt="" />
                  <img className="d-block d-md-none" src="images/version2/respHowITWorksBg.svg" alt="" />
                  <div className="worksContent">
                     <MainTitle title="How It Works" addon="grey" />
                     <div className="worksOptions">
                        <div className="workSteps">
                           <img src="images/version2/work3.svg" alt="" />
                           <p className="stepDescription">1.Create an Account</p>
                        </div>
                        <div className="workSteps d-none d-md-block">
                           <img
                              src="images/version2/waveLeft.svg"
                              alt=""
                              style={{ marginTop: '-60px', marginLeft: '-62px', marginRight: '-25px' }}
                           />
                        </div>

                        <div className="workSteps">
                           <img src="images/version2/work1.svg" alt="" />
                           <p className="stepDescription">2. Upload Documents</p>
                        </div>
                        <div className="workSteps  d-none d-md-block">
                           <img
                              src="images/version2/waveRight.svg"
                              alt=""
                              style={{ marginTop: '-60px', marginLeft: '-65px', marginRight: '-25px' }}
                           />
                        </div>
                        <div className="workSteps">
                           <img src="images/version2/work2.svg" alt="" />
                           <p className="stepDescription">3. Get a Quick Quote</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default HowItWorks;
