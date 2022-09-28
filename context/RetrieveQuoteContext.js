import React, { useState, createContext } from 'react';
export const RetrieveQuoteContext = createContext();
export const RetrieveQuoteProvider = props => {
   const [quoteSummaryData, setQuoteSummaryData] = useState({});
   const [isRetrieval, setRetrieval] = useState(false);

   // console.log('firstNextButtonStatus', firstNextButtonStatus);

   return (
      <>
         <RetrieveQuoteContext.Provider
            value={{
               retrivedQuoteDetails: [quoteSummaryData, setQuoteSummaryData],
               retrievalState: [isRetrieval, setRetrieval],
            }}
         >
            {props.children}
         </RetrieveQuoteContext.Provider>
      </>
   );
};
