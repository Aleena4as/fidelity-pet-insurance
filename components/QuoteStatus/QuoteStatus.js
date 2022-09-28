import React, { useState, useEffect, useContext } from 'react';
import InputField from '@/components/UiFields/InputField/InputField';
import FormTitle from '@/components/Titles/FormTitle/FormTitle';
import QuoteStatusDetails from '../QuoteStatusDetails/QuoteStatusDetails';
import axios from '@/utils/request';
import Loader from '@/components/Loader/Loader';
import { RetrieveQuoteContext } from '@/context/RetrieveQuoteContext';

const QuoteStatus = ({ onCancel, toggleMenu }) => {
   const QuoteStatusApi = '/quote-status';
   const uaeMobileReg = /^(?:0)(?:50|51|52|54|55|56|58|2|3|4|6|7|9)\d{7}$/; //format 05066936365

   const [loader, setLoader] = useState(false);
   const [emptyField, setEmptyField] = useState('');
   const [emptyMobile, setEmptyMobile] = useState('');
   const [quoteStatusResponse, setQuoteStatusResponse] = useState('');
   const [retrievalBasics, setRetrievalBasics] = useState('');
   const [quoteStatusError, setQuoteStatusError] = useState('');
   const [statusOfQuote, setStatusOfQuote] = useState({
      statusQuoteId: '',
      statusMobile: '',
   });

   // context for setting all the details of user to proceed for retrieval begins
   const { retrivedQuoteDetails, retrievalState } = useContext(RetrieveQuoteContext);
   const [quoteSummaryData, setQuoteSummaryData] = retrivedQuoteDetails;
   const [isRetrieval, setRetrieval] = retrievalState;
   // context for setting all the details of user to proceed for retrieval ends

   const { statusQuoteId, statusMobile } = statusOfQuote;

   const handleChange = e => {
      const { name, value } = e.target;
      setStatusOfQuote(prev => ({
         ...prev,
         [name]: value,
      }));
   };

   const timeout = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
   };
   const sceenLoader = async () => {
      setLoader(true);
      await timeout(3000);
      // if (quoteStatusResponse) {
      setLoader(false);
      // }
   };
   const checkQuoteIdValid = () => {
      if (!statusQuoteId) {
         setEmptyField('Please fill the Quote ID to proceed.');
         return false;
      } else {
         setEmptyField('');
         return true;
      }
   };

   const checkMobileNumValid = () => {
      if (!statusMobile) {
         setEmptyMobile('Please fill your mobile number to proceed.');
         return false;
      } else if (statusMobile && !uaeMobileReg.test(statusMobile.toLowerCase())) {
         setEmptyMobile('Please enter mobile number in 05******** format.');
         return false;
      } else if (statusMobile && statusMobile.length > 10) {
         setEmptyMobile('Please enter a valid mobile number.');
         return false;
      } else {
         setEmptyMobile('');
         return true;
      }
   };

   const submitQuoteStatus = () => {
      const valid = checkQuoteIdValid();
      const numValid = checkMobileNumValid();
      if (valid && numValid) {
         getQuoteStatus();
         sceenLoader();
      }
   };
   const getQuoteStatus = () => {
      axios(QuoteStatusApi, {
         method: 'GET',
         params: {
            quote_id: statusQuoteId,
            mobile: statusMobile,
         },
      })
         .then(response => {
            if (response.status === 200) {
               const Qdata = response.data.data;
               setRetrievalBasics(Qdata);
               setQuoteStatusResponse(Qdata.status);
            }
         })
         .catch(error => {
            setQuoteStatusError('Sorry..! No Status is found for the entered Details');
            if (error.response.status === 400) {
               // setQuoteStatusResponse(error.response.data);
               setQuoteStatusError(error.response.data.data);
            }
         });
   };
   useEffect(() => {
   }, [retrievalBasics]);

   return (
      <div className="QuoteStatusWrap">
         <FormTitle title="Quote Status" center="true" />
         {loader ? (
            <div className="infoLoader">
               <Loader statusTitle="Fetching" />
            </div>
         ) : quoteStatusResponse || quoteStatusError ? (
            <QuoteStatusDetails
               note={quoteStatusResponse}
               imgSrc="images/version2/animations/referralStatus.gif"
               bg={true}
               onload={() => {}}
               onCancel={onCancel}
               dataToDisplay={retrievalBasics}
               searchedQuotedId={statusQuoteId}
               toggleMenu={toggleMenu}
               error={quoteStatusError}
            />
         ) : (
            <form autoComplete="off">
               <InputField
                  value={statusQuoteId}
                  //    label="Mobile Number"
                  name="statusQuoteId"
                  placeholder="Quote Number"
                  type="text"
                  onChange={e => {
                     handleChange(e);
                     checkQuoteIdValid();
                  }}
                  onBlur={checkQuoteIdValid}
                  autoFocus="false"
               />
               {emptyField && <p className="errorMessage">{emptyField}</p>}
               <InputField
                  value={statusMobile}
                  //    label="Mobile Number"
                  name="statusMobile"
                  placeholder="Mobile Number"
                  type="text"
                  onChange={e => {
                     handleChange(e);
                     checkMobileNumValid();
                  }}
                  onBlur={checkMobileNumValid}
               />
               {emptyMobile && <p className="errorMessage">{emptyMobile}</p>}

               <div className="buttonWrap" style={{ marginTop: '36px' }}>
                  <button
                     type="button"
                     className="backButton"
                     onClick={() => {
                        toggleMenu();
                        onCancel();
                     }}
                  >
                     Cancel
                  </button>

                  <button
                     type="button"
                     className="nextButton"
                     onClick={() => {
                        toggleMenu();
                        submitQuoteStatus();
                        setRetrieval(true);
                     }}
                  >
                     Submit
                  </button>
               </div>
            </form>
         )}
      </div>
   );
};

export default QuoteStatus;
