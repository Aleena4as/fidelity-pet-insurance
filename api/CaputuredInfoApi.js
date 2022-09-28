import React, { useEffect, useState } from 'react';
import axios from './request';

const CaputuredInfoApi = () => {
   const captureformApi = '/update-user-info';
   const [captureInfo, setCaptureInfo] = useState({});
   const [errorCaptureInfo, setErrorCaptureInfo] = useState('');

   const fetchCaputerdData = () => {
      axios(captureformApi, {
         method: 'GET',
      })
         .then(response => {
            if (response.status === 200) {
               setCaptureInfo([...response.data.data]);
            }
         })
         .catch(error => {
            if (error.response.status === 401) {
               setErrorCaptureInfo(error.response.data.message);
            }
         });
   };

   useEffect(() => {
      fetchCaputerdData();
   }, []);

   return { captureInfo, errorCaptureInfo };
};

export default CaputuredInfoApi;
