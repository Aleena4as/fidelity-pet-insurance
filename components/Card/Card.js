import React, { useState, useEffect, useRef, useCallback } from 'react';

const Card = ({ children, styles }) => {
   const [isSticky, setSticky] = useState(false);
   const ref = useRef(null);

   const handleScroll = () => {
      const containerTop = ref?.current?.offsetTop; //top the card container
      const containerHeight = ref?.current?.clientHeight; // height of the card container
      const containerBottom = containerTop + containerHeight;
      const stickyImageHeight = 500; //height of the scrolling along image
      if (!ref.current) return;
      if (document.documentElement.scrollTop >= containerBottom - stickyImageHeight || null) {
         setSticky(true);
      } else {
         setSticky(false);
      }
   };

   useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
         window.removeEventListener('scroll', () => handleScroll);
      };
   }, []);

   return (
      <>
         <div
            className="cardContainer"
            ref={ref}
            // ref={containerContent} onScroll={onScroll}
         >
            <div className={` d-none d-md-block crawlingCat ${isSticky ? 'stopScrolling' : ''}`}>
               <img src="images/version2/climbingCat.svg" />
            </div>
            {children}
         </div>
      </>
   );
};

export default Card;
