import React, { useState, useEffect, createContext } from 'react';
import axios from '@/utils/request';
export const FaqContext = createContext();
export const FaqProvider = props => {
   const faqApi = '/faq';
   const [faqData, setFaqData] = useState('');
   const [faqError, setFaqError] = useState('');

   const getFaqContents = () => {
      axios(faqApi, {
         method: 'GET',
      })
         .then(response => {
            if (response.status === 200) {
               const faqs = response.data.data;
               setFaqData(faqs);
            }
         })
         .catch(error => {
            if (error.response.status === 401) {
               setFaqError(error.response.data.message);
            }
         });
   };
   useEffect(() => {
      getFaqContents();
   }, []);

   return (
      <>
         <FaqContext.Provider
            value={{
               faqContents: [faqData, setFaqData],
            }}
         >
            {props.children}
         </FaqContext.Provider>
      </>
   );
};
