import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from '@/utils/request';
import { GeneratedIDsContext } from './GeneratedIDsContext';

export const QuoteSummaryContext = createContext();
export const QuoteSummaryProvider = props => {
   // generatedID context begins here
   const { generatedLeadID, generatedQuoteID } = useContext(GeneratedIDsContext);
   // const [leadID, setLeadID] = generatedLeadID;
   const [quoteID, setQuoteID] = generatedQuoteID;
   // generatedID context  ends here

   const QuoteApi = '/quote-data';
   const [quoteSummaryData, setQuoteSummaryData] = useState({});

   const [quoteError, setQuoteError] = useState('');


   const getQuoteSummary = () => {
      axios(QuoteApi, {
         method: 'GET',
         params: {
            quote_id: quoteID,
         },
      })
         .then(response => {
            if (response.status === 200) {
               const Qdata = response.data.data;
               setQuoteSummaryData(Qdata);
            }
         })
         .catch(error => {
            if (error.response.status === 401) {
               setQuoteError(error.response.data.message);
            }
         });
   };

   useEffect(() => {
      getQuoteSummary();
   }, [quoteID]);

   return (
      <>
         <QuoteSummaryContext.Provider
            value={{
               quoteData: [quoteSummaryData, setQuoteSummaryData],
               quoteError: [quoteError, setQuoteError],
            }}
         >
            {props.children}
         </QuoteSummaryContext.Provider>
      </>
   );
};
