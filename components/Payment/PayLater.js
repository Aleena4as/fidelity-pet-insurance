import React, { useEffect } from 'react';
import ThankYouNote from '@/components/ThankYouNote/ThankYouNote';

const PayLater = ({ stepThirdAccept, message }) => {
   // useEffect(() => {
   //    stepThirdAccept(true);
   // }, []);
   return (
      <div className="paymentWrap">
         <div className="paymentButtonWrap">
            <ThankYouNote note={message} imgSrc="images/version2/animations/thankyouDog.gif" bg={true} />
         </div>
      </div>
   );
};

export default PayLater;
