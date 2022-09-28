import React, { useState, useContext } from 'react';
import NavResponsive from '@/components/NavResponsive/NavResponsive';
import NavWeb from '@/components/NavWeb/NavWeb';
import PopUp from '@/components/PopUp/PopUp';
import QuoteStatus from '../QuoteStatus/QuoteStatus';
import { Link } from 'react-scroll';
import { QuoteOpenContext } from '@/context/QuoteOpenContext';

function MainScreen() {
   const [isOpen, setIsOpen] = useState(false);
   const toggle = () => {
      setIsOpen(!isOpen);
   };

   // openQuoteStatus context begins here
   const { openQuote } = useContext(QuoteOpenContext);
   const [quoteStatusOpen, setQuoteStatusOpen] = openQuote;
   // openQuoteStatus context ends here

   return (
      <main className="headerMain">
         <NavResponsive isOpen={isOpen} toggle={toggle} />
         <NavWeb toggle={toggle} />
         <div className="heroContainer">
            <div className="heroWrapper">
               <div className="heroLeft">
                  <h1>
                     Buy{' '}
                     <span>
                        {' '}
                        Pet Insurance <br className="d-md-none" />{' '}
                     </span>{' '}
                     With Just a Few Clicks
                  </h1>
                  <p>
                     Use our Portal to buy Pet Insurance. A quick, user friendly portal designed to provide you the best
                     coverage for your pets at competitive rates.
                  </p>
               </div>
               <div className="heroRight">
                  {/* <div className="comment d-none d-md-block">Lorem Ipsum is simply dummy text of the printing.</div> */}

                  <div className="navMenu d-none d-lg-block">
                     <div className="navLink linkD">
                        <a href="https://www.fidelityunited.ae/#/mybuddyclaim" target="_blank">
                           <img src="images/version2/claimsBowl.svg" alt="" />
                        </a>
                     </div>

                     <Link to="aboutUs" spy={true} smooth={true} offset={-100}>
                        <div className="navLink linkA">
                           <img src="images/version2/aboutBowl.svg" alt="" />
                        </div>
                     </Link>
                     <Link to="faqs" spy={true} smooth={true} offset={-100}>
                        <div className="navLink linkB">
                           <img src="images/version2/faqBowl.svg" alt="" />
                        </div>
                     </Link>

                     <div className="navLink linkC" onClick={() => setQuoteStatusOpen(true)}>
                        <img src="images/version2/quoteStatusBowl.svg" alt="" />
                     </div>
                  </div>
                  <div className="animationBg">
                     <img className="bgImg" src="images/version2/animations/dogHeader.gif" alt="" />
                     <div className="headerImage">
                        {/* <img src="images/version2/animations/dogHeader.gif" alt="" /> */}
                     </div>
                  </div>
               </div>
            </div>
            <Link
               to="getQuote"
               spy={true}
               smooth={true}
               hashSpy={true}
               offset={-150}
               duration={500}
               delay={1000}
               isDynamic={true}
               ignoreCancelEvents={false}
               spyThrottle={500}
            >
               <div className="scrollDown">
                  <div className="scrollLink">
                     <img src="images/version2/boneGetaQuote.png" alt="" />
                  </div>
               </div>
            </Link>
            <PopUp open={quoteStatusOpen} onClose={() => setQuoteStatusOpen(false)}>
               <QuoteStatus onCancel={() => setQuoteStatusOpen(false)} toggleMenu={() => setIsOpen(false)} />
            </PopUp>
         </div>
      </main>
   );
}

export default MainScreen;
