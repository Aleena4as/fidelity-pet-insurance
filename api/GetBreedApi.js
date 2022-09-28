import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetBreedApi = slug => {
   const [manualBreedOptions, setManualBreedOptions] = useState([]);
   const [errorBreedOptions, setErrorBreedOptions] = useState('');
   const getBreedOptions = () => {
      axios(slug, {
         method: 'GET',
      })
         .then(response => {
            if (response.status === 200) {
               setManualBreedOptions([...response.data.data]);
            }
         })
         .catch(error => {
            if (error.response.status === 401) {
               setErrorBreedOptions(error.response.data.message);
            }
         });
   };

   useEffect(() => {
      getBreedOptions();
      // console.log('capture details', manualBreedOptions);
   }, []);

   return { manualBreedOptions, errorBreedOptions };
};

export default GetBreedApi;
