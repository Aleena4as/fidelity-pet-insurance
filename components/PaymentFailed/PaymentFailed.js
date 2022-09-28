import React, { useState, useEffect } from 'react';
import Payment from '../Payment/Payment';
const PaymentFailed = ({ note, imgSrc, bg, idStatus }) => {
   const [redirectToPayment, setRedirectToPayment] = useState(false);
   // Load this effect on mount
   useEffect(() => {
      const timer = setTimeout(() => {
         setRedirectToPayment(true);
      }, 5000);
      // Cancel the timer while unmounting
      return () => clearTimeout(timer);
   }, []);

   return (
      <>
         {!redirectToPayment ? (
            <div className="paymentWrap">
               <div className="paymentButtonWrap">
                  <div className="thanksNote">
                     {bg ? (
                        <div className="gifBg">
                           <img src={imgSrc} alt="" />
                        </div>
                     ) : (
                        <img src={imgSrc} alt="" />
                     )}
                     <p className="noteTitle" style={{ color: 'red' }}>
                        Sorry
                     </p>
                     <p className="note" style={{ marginBottom: '0' }}>
                        {note}.
                     </p>
                     <p className="note">
                        Please wait you will be redirected to the Payment Options. If you are having trouble paying now,
                        you can opt for the Pay Later Option.
                     </p>
                  </div>
               </div>
            </div>
         ) : (
               <Payment idStatus={idStatus}/>
         )}
      </>
   );
};

export default PaymentFailed;
