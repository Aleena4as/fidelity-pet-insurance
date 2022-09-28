import React, { useState, useContext } from 'react';
import FormTitle from '@/components/Titles/FormTitle/FormTitle';
import TextAreaInput from '@/components/UiFields/TextAreaInput/TextAreaInput';
import ThankYouNote from '@/components/ThankYouNote/ThankYouNote';
import { GeneratedIDsContext } from '@/context/GeneratedIDsContext';
import axios from '@/utils/request';

const RequestHelp = () => {
   const callBackApi = '/callback';
   // generatedID context begins here
   const { generatedLeadID, generatedQuoteID } = useContext(GeneratedIDsContext);
   const [leadID, setLeadID] = generatedLeadID;
   const [quoteID, setQuoteID] = generatedQuoteID;
   // generatedID context  ends here

   const [helpMessage, setHelpMessage] = useState('');
   const [openThanksPanel, setOpenThanksPanel] = useState('');
   const [helpResponse, setHelpResponse] = useState('');
   const [helpMessageError, setHelpMessageError] = useState('');

   const handleChange = e => {
      setHelpMessage(e.target.value);
   };

   const postRequestHelpMessage = () => {
      const formData = new FormData();
      formData.append('quote_id', quoteID);
      formData.append('message', helpMessage);

      axios({
         url: callBackApi,
         method: 'POST',
         data: formData,
      })
         .then(response => {
            if (response.status === 200) {
               setHelpResponse(response.data.data);
            }
         })
         .catch(error => {
            setHelpMessageError('');
         });
   };

   return (
      <>
         <div className="imageOnTop">
            <img src="images/version2/animations/four_pets.png" alt="" />
         </div>
         {!openThanksPanel ? (
            <>
               <div className="requestHelpWrap">
                  <FormTitle title="Request help" />
                  <TextAreaInput
                     value={helpMessage}
                     rows={5}
                     name="helpMessage"
                     placeholder="Write Message"
                     onChange={e => handleChange(e)}
                     maxlength="1000"
                  />
                  <button
                     className="requestBtn"
                     onClick={() => {
                        postRequestHelpMessage();
                        setOpenThanksPanel(true);
                     }}
                  >
                     Submit
                  </button>
               </div>
            </>
         ) : (
            <ThankYouNote
               note="We have received your request and one of our team members will contact you for further support."
               imgSrc="images/version2/thanksTick.svg"
            />
         )}
      </>
   );
};

export default RequestHelp;
