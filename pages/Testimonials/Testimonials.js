import React, { useState } from 'react';
import Slider from 'react-touch-drag-slider';

import { images } from '@/utils/data';

// Whatever you render out in the Slider will be draggable 'slides'
const Testimonials = () => {
   // state should start with the index you want to start the slide on
   const [index, setIndex] = useState(0);
   const [activeDot, setActiveDot] = useState(index);
   const setFinishedIndex = i => {
      // dragging index
      setIndex(i);
      setActiveDot(i);
   };

   const next = () => {
      if (index < images.length - 1) {
         setIndex(index + 1);
         setActiveDot(index + 1);
      }
   };

   const previous = () => {
      if (index > 0) {
         setIndex(index - 1);
         setActiveDot(index - 1);
      }
   };

   return (
      <section id="testimonials" style={{ overflowX: 'hidden' }}>
         <div className="testimonialContainer">
            <div className="testimonialArrow btnPrev" onClick={previous} disabled={index === 0}>
               <img src="images/version2/arrowLeft.svg" alt="" />
            </div>
            <div className="testimonialArrow btnNext" onClick={next} disabled={index === images.length - 1}>
               <img src="images/version2/arrowRight.svg" alt="" />
            </div>
            <Slider
               className=""
               onSlideComplete={setFinishedIndex}
               onSlideStart={i => {
                  console.clear();
                  // console.log('started dragging on slide', i);
               }}
               activeIndex={index}
               threshHold={100}
               transition={0.5}
               scaleOnDrag={true}
            >
               {images?.reverse().map(({ url, title, name }, index) => (
                  <div className="row" key={index}>
                     <div className="col-12 col-md-6 order-12 order-md-1">
                        <div className="testimonialDescription">
                           <img src="images/version2/quotations.svg" alt="" />
                           <p className="meetCustomer">
                              Meet Our Awesome <br />
                              <span>Customers</span>
                           </p>
                           <p className="testimonialContent">{title}</p>
                        </div>
                     </div>
                     <div
                        className="col-12 col-md-6 order-1 order-md-12"
                        style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}
                     >
                        <div className="customerProfile" style={{ height: '100%' }}>
                           {/* <img src="images/version2/testimonial1.png" alt="" /> */}
                           <img src={url} key={index} alt="" />
                           <p className="petName">{name}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </Slider>
            <div className="container-fluid">
               <div className="row">
                  <div className="col-12 col-md-6">
                     <span className="dotContainer">
                        {images?.reverse().map(({ url, title }, index) => (
                           <p key={index} className={`${activeDot === index ? 'showActiveDot' : ''}`}></p>
                        ))}
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default Testimonials;
