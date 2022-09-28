import React, { useState, createContext, useEffect } from 'react';
export const PayLaterContext = createContext();
export const PayLaterProvider = props => {
   const [payLaterinvoiceID, setPayLaterinvoiceID] = useState('');

   return (
      <>
         <PayLaterContext.Provider
            value={{
               payLaterinvoiceDetails: [payLaterinvoiceID, setPayLaterinvoiceID],
            }}
         >
            {props.children}
         </PayLaterContext.Provider>
      </>
   );
};
