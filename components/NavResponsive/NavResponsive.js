import React, { useState, useContext } from 'react';
import PopUp from '@/components/PopUp/PopUp';
import QuoteStatus from '../QuoteStatus/QuoteStatus';
import { Link } from 'react-scroll';
import { QuoteOpenContext } from '@/context/QuoteOpenContext';
const Dropdown = ({ isOpen, toggle }) => {
   // openQuoteStatus context begins here
   const { openQuote } = useContext(QuoteOpenContext);
   const [quoteStatusOpen, setQuoteStatusOpen] = openQuote;
   // openQuoteStatus context ends here

   // for the quote status pop up begins
   // const [quoteStatusOpen, setQuoteStatusOpen] = useState(false);
   // for the quote status pop up ends here

   return (
      <div
         className="siderBar"
         style={{ opacity: `${isOpen ? '100%' : '0'}`, top: `${isOpen ? '0' : '-100%'}` }}
         onClick={toggle}
      >
         <div className="closeIcon" onClick={toggle}>
            <img src="images/version2/closeIcon.svg" alt="" />
         </div>
         <div className="logoCenter">
            <a href="https://fidelityunited.ae/" className="logo">
               <img src="images/version2/mainLogo.png" alt="logo" />
            </a>
         </div>
         <div className="navMenu">
            <div className="navLink ">
               <a href="https://www.fidelityunited.ae/#/mybuddyclaim" target="_blank">
                  <img src="images/version2/claimsBowl.svg" alt="" />
               </a>
            </div>
            <Link to="aboutUs" spy={true} smooth={true} offset={-100}>
               <div className="navLink" onClick={toggle}>
                  <img src="images/version2/aboutBowl.svg" alt="" />
               </div>
            </Link>
            <Link to="faqs" spy={true} smooth={true} offset={-130}>
               <div className="navLink" onClick={toggle}>
                  <img src="images/version2/faqBowl.svg" alt="" />
               </div>
            </Link>
            <div
               className="navLink"
               onClick={() => {
                  toggle();
                  setQuoteStatusOpen(true);
               }}
            >
               <img src="images/version2/quoteStatusBowl.svg" alt="" />
            </div>
         </div>
         <PopUp
            open={quoteStatusOpen}
            onClose={() => {
               setQuoteStatusOpen(false);
               toggle();
            }}
         >
            <QuoteStatus
               onCancel={() => {
                  setQuoteStatusOpen(false);
                  // toggle();
               }}
               toggleMenu={toggle}
            />
         </PopUp>
         {/* <button className="navBtn" onClick={toggle}>
            <a className="btn PrimaryBtn" href="#" target="_blank" rel="noopener noreferrer">
               Sign In
            </a>
         </button> */}
      </div>
   );
};

export default Dropdown;
