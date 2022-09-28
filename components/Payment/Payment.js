import React, { useState, useEffect, useContext } from 'react';
import PayNow from '@/components/Payment/PayNow';
import PayLater from '@/components/Payment/PayLater';
import FormTitle from '@/components/Titles/FormTitle/FormTitle';
import { GeneratedIDsContext } from '@/context/GeneratedIDsContext';
import { PaymentContext } from '@/context/PaymentContext';
import PayLaterStatus from '@/components/Payment/PayLaterStatus';
import { PayLaterContext } from '@/context/PayLaterContext';

import axios from '@/utils/request';
import Loader from '@/components/Loader/Loader';

const Payment = ({ stepThirdAccept, idStatus }) => {
   const paymentApi = '/payment/request';

   // payLater context begnis here
   const { payLaterinvoiceDetails } = useContext(PayLaterContext);
   const [payLaterinvoiceID, setPayLaterinvoiceID] = payLaterinvoiceDetails;
   // payLater context ends here

   // payment context begins here
   const { paymentLinkDetails, paymentRefDetails, paymentMgsDetails } = useContext(PaymentContext);
   const [paymentLink, setPaymentLink] = paymentLinkDetails;
   const [transactionRef, setTransactionRef] = paymentRefDetails;
   const [payLaterMessage, setPayLaterMessage] = paymentMgsDetails;

   // payment context ends here

   const [paymentSuccessfull, setPaymentSuccessfull] = useState(false);
   const [paymentOption, setPaymentOption] = useState({ paynow: false, paylater: false });
   const { paynow, paylater } = paymentOption;

   // generatedID context begins here
   const { generatedLeadID, generatedQuoteID } = useContext(GeneratedIDsContext);
   const [leadID, setLeadID] = generatedLeadID;
   const [quoteID, setQuoteID] = generatedQuoteID;
   // generatedID context  ends here

   useEffect(() => {
      if (idStatus === false) {
         setPayLaterinvoiceID(idStatus);
      }
   }, [idStatus]);

   const [loader, setLoader] = useState(false);

   const optionPayNow = () => {
      const formData = new FormData();
      formData.append('quote_id', quoteID);
      formData.append('pay_type', 'now');

      axios({
         url: paymentApi,
         method: 'POST',
         data: formData,
      })
         .then(response => {
            if (response.status === 200) {
               setPaymentLink(response.data.data.link);
               setTransactionRef(response.data.data.tran_ref);
            }
         })
         .catch(error => {
            if (error.response.status === 400) {
               // setPaymentError(error.response.data.data); // for already paid cases
            }
         });
   };

   const optionPayLater = () => {
      setLoader(true);
      const formData = new FormData();
      formData.append('quote_id', quoteID);
      formData.append('pay_type', 'later');

      axios({
         url: paymentApi,
         method: 'POST',
         data: formData,
      })
         .then(response => {
            if (response.status === 200) {
               setPayLaterMessage(response.data.data);
            }
         })
         .catch(error => {
            if (error.response.status === 400) {
               setPayLaterMessage(error.response.data.data);
            }
         });
   };
   useEffect(() => {
      if (payLaterMessage) {
         setLoader(false);
      } else if (paymentLink && transactionRef) {
         setLoader(false);
      }
   }, [payLaterMessage]);

   return (
      <>
         {payLaterinvoiceID ? (
            <PayLaterStatus stepThirdAccept={stepThirdAccept} />
         ) : loader ? (
            <div className="paymentWrap">
               <div className="infoLoader" style={{ margin: '0 auto' }}>
                  <Loader statusTitle="Loading" />
               </div>
            </div>
         ) : paynow ? (
            <PayNow stepThirdAccept={stepThirdAccept} />
         ) : paylater && !loader ? (
            <PayLater message={payLaterMessage} stepThirdAccept={stepThirdAccept} />
         ) : (
            <div className="paymentWrap">
               <div className="paymentButtonWrap">
                  <div className="thanksNote">
                     <div className="gifBg">
                        <img src="images/version2/animations/paymentOption.gif" alt="" />
                     </div>
                     <p className="noteTitle">Payment Option</p>
                     <p className="note">Please select your paymet option to proceed further.</p>
                     <button
                        className="paybtns payNowbtn"
                        onClick={(paynow, paylater) => {
                           setPaymentOption({ paynow: true, paylater: false });
                           optionPayNow();
                        }}
                     >
                        Pay Now
                     </button>
                     {/* <button
                        className="paybtns payLaterbtn"
                        onClick={(paynow, paylater) => {
                           setPaymentOption({ paynow: false, paylater: true });
                           optionPayLater();
                        }}
                     >
                        Pay Later
                     </button> */}
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default Payment;
