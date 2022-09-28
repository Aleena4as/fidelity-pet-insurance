import React from 'react';
import MainTitle from '@/components/Titles/MainTitle/MainTitle';

const About = () => {
   return (
      <section id="aboutUs">
         <div className="aboutContainer">
            <div className="row">
               <div className="col-12 col-md-6 order-12 order-md-1">
                  <div className="contentWrap">
                     <MainTitle title="About" />
                     <MainTitle title="MyBuddy Pet Insurance Plan" addon="left" />
                     <p className="description">
                        The love and joy that come with owning a pet make all the work involved worth it. When it comes
                        to their health, the last thing that we want to be worried about is the cost of the tests,
                        treatments, or medication that they need. Helping them to lead long and healthy lives by having
                        insurance coverage is what every pet deserves. When a pet medical emergency strikes, just how
                        financially prepared are you?
                     </p>
                     <p className="description">
                        Our ‘My Buddy’ product coverage is designed exclusively for dogs and cats. With a selection of
                        insurance plans to choose from, the pet parents enjoy hassle-free and unique experience on our
                        portal from quote to policy issuance and much more. Our exceptional customer service and quick
                        claims process will bring a thorough customer journey, ensuring the best insurance support for
                        the furry friends and their parent. Exclusive product features:
                     </p>
                     <ul className="description" style={{textAlign:'left'}}>
                        <li>• Vet expenses</li>
                        <li>• Death benefit (due to injury or illness)</li>
                        <li>• Theft/Straying</li>
                        <li>• Third Party Liability</li>
                        <li>• One month waiting period</li>
                     </ul>

                     {/* <div className="scrollDown">
                        <img src="images/version2/viewDetailsBone.png" alt="" />
                     </div> */}
                  </div>
               </div>
               <div className="col-12 col-md-6 pr-0 order-1 order-md-12">
                  <div className="aboutImage">
                     <img src="images/version2/Aboutus.png" alt="" />
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default About;
