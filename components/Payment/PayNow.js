import React, { useState, useEffect, useContext } from 'react';
import ThankYouNote from '@/components/ThankYouNote/ThankYouNote';
import { PaymentContext } from '@/context/PaymentContext';
import PaymentFailed from '@/components/PaymentFailed/PaymentFailed';
import Loader from '../Loader/Loader';
import axios from '@/utils/request';

const PayNow = ({ stepThirdAccept }) => {
   const paymentStatusApi = '/payment/status';
   const [redirectMessage, setRedirectMessage] = useState(false);
   const [loader, setLoader] = useState(true);
   const [paymentStatus, setPaymentStatus] = useState('');
   const [paymentResponseMessage, setPaymentResponseMessage] = useState('');
   // payment context begins here
   const { paymentLinkDetails, paymentRefDetails, paymentMgsDetails } = useContext(PaymentContext);
   const [paymentLink, setPaymentLink] = paymentLinkDetails;
   const [transactionRef, setTransactionRef] = paymentRefDetails;
   const [payLaterMessage, setPayLaterMessage] = paymentMgsDetails;

   // payment context ends here

   useEffect(() => {
      setLoader(true);
      if (transactionRef) {
         setLoader(false);
      }
   }, [paymentLink, transactionRef]);

   const fetchPaymentStatus = () => {
      axios(paymentStatusApi, {
         method: 'GET',
         params: {
            tran_ref: transactionRef,
            pay_type: 'now',
         },
      })
         .then(response => {
            if (response.status === 200) {
               if (response.data.state !== 'PENDING') {
                  setPaymentStatus(response.data.state);
                  setPaymentResponseMessage(response.data.message);
               }
            }
         })
         .catch(error => {
            if (error.response.data.status === 400) {
               setPaymentResponseMessage(error.response.data.message);
               setPaymentStatus(error.response.data.state);
            }
         });
   };

   useEffect(() => {
      const interval = setInterval(() => {
         if (paymentStatus === 'PENDING' || paymentStatus === '') {
            fetchPaymentStatus();
         }
      }, 10 * 1000);
      return () => clearInterval(interval);
   }, [transactionRef, paymentStatus]);

   useEffect(() => {
      if (paymentStatus === 'APPROVE') {
         // stepThirdAccept(true);
      }
   }, [paymentStatus]);

   return (
      <div>
         {loader ? (
            <div className="paymentWrap">
               <div className="infoLoader" style={{ margin: '0 auto' }}>
                  <Loader statusTitle="Redirecting" />
               </div>
            </div>
         ) : !loader && !paymentStatus ? (
            <div className="paymentWrap" style={{ backgroundColor: '#f5fafe', flexDirection: 'column' }}>
               <p className="paymentWaitingNote">
                  Note: Please don't close the window post payment. We will redirect you back to the portal once your
                  transaction is complete.
               </p>
               <iframe className="paymentIframe" src={paymentLink} />
            </div>
         ) : paymentStatus === 'APPROVE' ? (
            <div className="paymentWrap">
               <ThankYouNote
                  note={paymentResponseMessage}
                  imgSrc="images/version2/animations/thankyouDog.gif"
                  bg={true}
               />
            </div>
         ) : (
            paymentStatus !== 'APPROVE' && (
               <PaymentFailed note={paymentResponseMessage} imgSrc="images/version2/cryingDog.png" bg={true} />
            )
         )}
      </div>
   );
};

export default PayNow;
