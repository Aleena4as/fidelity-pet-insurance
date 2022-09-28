import React, { useState, useEffect, useContext } from 'react';
import { TabIndexContext } from '@/context/TabIndexContext';
import axios from '@/utils/request';
import { Link } from 'react-scroll';
// import { RetrieveQuoteContext } from '@/context/RetrieveQuoteContext';
import { GeneratedIDsContext } from '@/context/GeneratedIDsContext';

const QuoteStatusDetails = ({
   note,
   imgSrc,
   bg,
   title,
   onload,
   onCancel,
   dataToDisplay,
   searchedQuotedId,
   toggleMenu,
   error,
}) => {
   const retrieveQuote = '/quote-data';

   useEffect(() => {
      onload();
   }, []);

   const { stepperTabIndex } = useContext(TabIndexContext);
   const [currentTabIndex, setCurrentTabIndex] = stepperTabIndex;

   const [retrievalDetails, setRetrievalDetails] = useState('');

   // generatedID context begins here
   const { generatedLeadID, generatedQuoteID } = useContext(GeneratedIDsContext);
   const [leadID, setLeadID] = generatedLeadID;
   const [quoteID, setQuoteID] = generatedQuoteID;
   // generatedID context  ends here

   // context for setting all the details of user to proceed for retrieval begins
   // const { retrivedQuoteDetails } = useContext(RetrieveQuoteContext);
   // const [quoteSummaryData, setQuoteSummaryData] = retrivedQuoteDetails;

   // context for setting all the details of user to proceed for retrieval ends

   const retrieveQuoteData = () => {
      setCurrentTabIndex(2);
      setQuoteID(searchedQuotedId);
      // axios(retrieveQuote, {
      //    method: 'GET',
      //    params: {
      //       quote_id: searchedQuotedId,
      //    },
      // })
      //    .then(response => {
      //       if (response.status === 200) {
      //          setRetrievalDetails(response.data.data);
      //          setQuoteSummaryData(response.data.data);
      //          console.log('retrieval Data', response.data.data);
      //       }
      //    })
      //    .catch(error => {
      //       // if (error.response.status === 401) {
      //       //    console.log(error.response.data.message);
      //       // }
      //    });
   };

   return (
      <div className="statusDetailPanel">
         {bg ? (
            <div className="gifBg">
               <img src={imgSrc} alt="" />
            </div>
         ) : (
            <img src={imgSrc} alt="" />
         )}
         {!error ? (
            <>
               <p className="noteTitle">{title ? title : ''}</p>
               <div>
                  {searchedQuotedId && !error && <p className="note">Quote Id: {searchedQuotedId}</p>}
                  {dataToDisplay.user_name && <p className="note">User Name: {dataToDisplay.user_name}</p>}
                  {dataToDisplay.start_date && note !== 'Rejected' && (
                     <p className="note">Start Date:{dataToDisplay.start_date}</p>
                  )}
                  {dataToDisplay.pet_name && <p className="note">Pet Name: {dataToDisplay.pet_name}</p>}
                  {dataToDisplay.user_mobile && <p className="note">Mobile : {dataToDisplay.user_mobile}</p>}
                  {dataToDisplay.user_email && <p className="note">Email : {dataToDisplay.user_email}</p>}
               </div>
               <p className="note">
                  Status : <span style={{ color: note == 'Rejected' ? 'red' : 'green' }}>{note}</span>
               </p>
               {note === 'Approved' ? (
                  <p className="note" style={{ marginTop: '14px' }}>
                     Your quote has been approved by our team. An email has been sent to you with the final quote.
                  </p>
               ) : note === 'Waiting for Approval' ? (
                  <p className="note" style={{ marginTop: '14px' }}>
                     Your quote is still under review by our team. You will be notified via email once your quote is
                     approved.
                  </p>
               ) : (
                  note === 'Rejected' && (
                     <p className="note" style={{ marginTop: '14px' }}>
                        Your Quote has been rejected. For more information, please contact us at 800 842 or email us at
                        customercare@fidelityunited.ae.
                     </p>
                  )
               )}
               {note === 'Approved' ? (
                  <>
                     <Link to="getQuote" spy={true} smooth={true} hashSpy={true} offset={-150}>
                        <button
                           type="button"
                           className="nextButton"
                           onClick={() => {
                              retrieveQuoteData();
                              onCancel();
                              // toggleMenu();
                           }}
                        >
                           Retrieve Quote
                        </button>
                     </Link>
                  </>
               ) : (
                     null
                  // <button type="button" className="nextButton" disabled>
                  //    Retrieve Quote
                  // </button>
               )}
            </>
         ) : (
            <p className="note" style={{ color: 'red', marginTop: '40px', fontWeight: '900' }}>
               {error}.
            </p>
         )}
      </div>
   );
};

export default QuoteStatusDetails;
