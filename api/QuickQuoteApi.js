import React, { useEffect, useState } from 'react';
import axios from '../utils/request';

const QuickQuoteApi = () => {
   const quoteformApi = '/form-fields';
   const [quoteInfo, setQuoteInfo] = useState({});
   const [errorQuoteInfo, setErrorQuoteInfo] = useState('');

   const fetchQuoteData = () => {
      axios(quoteformApi, {
         method: 'GET',
      })
         .then(response => {
            if (response.status === 200) {
               setQuoteInfo([...response.data.data]);
            }
         })
         .catch(error => {
            if (error.response.status === 401) {
               setErrorQuoteInfo(error.response.data.message);
            }
         });
   };

   useEffect(() => {
      fetchQuoteData();
   }, []);

   return { quoteInfo, errorQuoteInfo };
};

export default QuickQuoteApi;
