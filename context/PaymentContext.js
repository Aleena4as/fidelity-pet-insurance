import React, { useState, createContext } from 'react';
export const PaymentContext = createContext();
export const PaymentProvider = props => {
   const [paymentLink, setPaymentLink] = useState('');
   const [transactionRef, setTransactionRef] = useState('');
   const [payLaterMessage, setPayLaterMessage] = useState('');

   return (
      <>
         <PaymentContext.Provider
            value={{
               paymentLinkDetails: [paymentLink, setPaymentLink],
               paymentRefDetails: [transactionRef, setTransactionRef],
               paymentMgsDetails: [payLaterMessage, setPayLaterMessage],
            }}
         >
            {props.children}
         </PaymentContext.Provider>
      </>
   );
};
