import React, { useState, useEffect, useContext } from 'react';
import EditInput from '@/components/UiFields/EditInput/EditInput';
import FormTitle from '@/components/Titles/FormTitle/FormTitle';
import { DocOcrContext } from '@/context/DocOcrContext';
import { GeneratedIDsContext } from '@/context/GeneratedIDsContext';
import axios from '@/utils/request';
import Loader from '@/components/Loader/Loader';
import Spin from '../Spin/Spin';
import { countries, gender } from '@/utils/data';
import { EmiratesIdContext } from '@/context/EmiratesIdContext';

const CapturedInfo = ({ onCancel, closeDocPanel, clearEmiratedIdDocs, stepSecondAccept }) => {
   const updateUserOcr = '/update-user-info';
   const onlyAlphabets = /^[a-zA-Z ]*$/;
   // useContext for emirates id begins here
   const { emiratesID, handleChange: handleChangeOCR, isConfirmed, setIsConfirmed } = useContext(EmiratesIdContext);
   // useContext for emirates id ends here

   const [loader, setLoader] = useState(true);
   const [spinner, setSpinner] = useState(false);

   const [proceedButton, setProceedButton] = useState(false);
   const [agreedtoBuyPolicy, setsetAgreedtoBuyPolicy] = useState(false);
   const [successUpdate, setSuccessUpdate] = useState('');
   // ocrContext begins here
   const { OcrDatas, OcrErrors } = useContext(DocOcrContext);
   const [ocrReceivables, setOcrReceivables] = OcrDatas;
   const [ocrError, setOcrError] = OcrErrors;
   // ocrContext ends here
   // generatedID context begins here
   const { generatedLeadID, generatedQuoteID } = useContext(GeneratedIDsContext);
   const [leadID, setLeadID] = generatedLeadID;
   const [quoteID, setQuoteID] = generatedQuoteID;
   // generatedID context  ends here

   const [capturedError, setCapturedError] = useState({
      invalidCardEmiratesId: '',
      invalidCardName: '',
      invalidCardNationality: '',
      invalidCardGender: '',
   });

   const { invalidCardEmiratesId, invalidCardName, invalidCardNationality, invalidCardGender } = capturedError;

   const [capturedValues, setCapturedValues] = useState({
      cardId: '',
      cardName: '',
      cardNationality: '',
      cardGender: '',
      cardTaxRegNo: '',
   });

   useEffect(() => {
      setCapturedValues({
         cardId: ocrReceivables.id,
         cardName: ocrReceivables.name,
         cardNationality: ocrReceivables.nationality,
         cardGender: ocrReceivables.sex,
         cardTaxRegNo: '',
      });
      sceenLoader();
      if (ocrReceivables) {
         setLoader(false);
      }
   }, [ocrReceivables]);

   const { cardId, cardName, cardNationality, cardGender, cardTaxRegNo } = capturedValues;

   const handleChange = e => {
      const { name, value } = e.target;
      setCapturedValues(prev => ({
         ...prev,
         [name]: value,
      }));
   };

   const updateOCRData = () => {
      setSpinner(true);

      const formData = new FormData();
      formData.append('quote_id', quoteID);
      formData.append('emirates_id', capturedValues.cardId);
      formData.append('eid_name', capturedValues.cardName);
      formData.append('nationality', capturedValues.cardNationality);
      formData.append('sex', capturedValues.cardGender);

      axios(updateUserOcr, {
         method: 'PUT',
         data: formData,
      })
         .then(function (response) {
            if (response.status === 200) {
               setSuccessUpdate(response.data.message);
               setSpinner(false);
               setProceedButton(true);
            }
         })
         .catch(error => {});
   };

   useEffect(() => {
      if (agreedtoBuyPolicy) {
         // enable the next button
         stepSecondAccept(true);
      }
   }, [agreedtoBuyPolicy]);

   const checkCardEmiratesId = () => {
      // const emiratesIDregex = '/^784-[0-9]{4}-[0-9]{7}-[0-9]{1}$/';
      if (!cardId) {
         setCapturedError({ ...capturedError, invalidCardEmiratesId: 'Please enter your emirates Id' });
      } else if (cardId.match(/^784-[0-9]{4}-[0-9]{7}-[0-9]{1}$/)) {
         setCapturedError({ ...capturedError, invalidCardEmiratesId: '' });
      } else {
         setCapturedError({
            ...capturedError,
            invalidCardEmiratesId: 'Please enter a valid Emirates Id in xxx-xxxx-xxxxxxx-x format',
         });
      }
   };
   const checkCardName = () => {
      if (cardName.length > 100) {
         setCapturedError({ ...capturedError, invalidCardName: 'Name must not exceed 100 charecters' });
      } else if (!onlyAlphabets.test(cardName.toLowerCase())) {
         setCapturedError({ ...capturedError, invalidCardName: 'Please enter alphabets only' });
      } else if (!cardName) {
         setCapturedError({ ...capturedError, invalidCardName: 'Please enter your name as in the emirates id' });
      } else {
         setCapturedError({ ...capturedError, invalidCardName: '' });
      }
   };
   const checkCardNationality = () => {
      if (!cardNationality) {
         setCapturedError({ ...capturedError, invalidCardNationality: 'Please enter your nationality' });
      } else {
         setCapturedError({ ...capturedError, invalidCardNationality: '' });
      }
   };
   const checkCardGender = () => {
      if (!cardGender) {
         setCapturedError({ ...capturedError, invalidCardGender: 'Please enter your gender' });
      } else {
         setCapturedError({ ...capturedError, invalidCardGender: '' });
      }
   };

   const timeout = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
   };
   const sceenLoader = async () => {
      setLoader(true);
      await timeout(3000);
   };
   const checkFormValidations = () => {
      checkCardEmiratesId();
      checkCardName();
      checkCardNationality();
      checkCardGender();
      if (!invalidCardEmiratesId && !invalidCardName && !invalidCardNationality && !invalidCardGender) {
         if (cardId && cardName && cardNationality && cardGender) {
            updateOCRData();
            setIsConfirmed(true);

            setTimeout(() => {
               onCancel();
               setsetAgreedtoBuyPolicy(true);
               closeDocPanel();
            }, 1000);
         }
      }
   };

   const addHyphen = e => {
      // add hyphen between card numbers to match ***-****-*******-* pattern

      var val = e.target.value;
      const valArray = val.split('-').join('').split('');
      var valSpace = val.split('');

      // to work with backspace
      if (valSpace[valSpace.length - 1] == '-') {
         var valSpaceN = valSpace.slice(0, -2);
         val = valSpaceN.join('');
         setCapturedValues(prev => ({
            ...prev,
            cardId: val,
         }));
         return;
      }

      if (isNaN(valArray.join(''))) return;
      if (valArray.length === 19) return;
      if (valArray.length === 3 && valArray.length <= 19) {
         setCapturedValues(prev => ({
            ...prev,
            cardId: e.target.value + '-',
         }));
      } else if (valArray.length === 7 && valArray.length <= 19) {
         setCapturedValues(prev => ({
            ...prev,
            cardId: e.target.value + '-',
         }));
      } else if (valArray.length === 14 && valArray.length <= 19) {
         setCapturedValues(prev => ({
            ...prev,
            cardId: e.target.value + '-',
         }));
      } else {
         setCapturedValues(prev => ({
            ...prev,
            cardId: e.target.value,
         }));
      }
   };

   return (
      <>
         <div className="capturedInfoWrap">
            <FormTitle title="Captured Information" center="true" />
            {loader ? (
               <div className="infoLoader">
                  <Loader statusTitle="Capturing" />
               </div>
            ) : (
               !loader &&
               ocrReceivables && (
                  <>
                     <div className="noticeMessage">
                        <p>Please enter details manually if no data is captured or edit details</p>
                     </div>
                     <EditInput
                        value={cardId}
                        label="Emirates Id"
                        name="cardId"
                        placeholder=""
                        type="text"
                        maxlength="18"
                        onChange={e => {
                           handleChange(e);
                           addHyphen(e);
                        }}
                        onKeyUp={checkCardEmiratesId}
                     />
                     {invalidCardEmiratesId && (
                        <p className="errorMessage" style={{ marginTop: '0' }}>
                           {invalidCardEmiratesId}
                        </p>
                     )}
                     <EditInput
                        value={cardName}
                        label="Name"
                        name="cardName"
                        placeholder=""
                        type="text"
                        onChange={e => handleChange(e)}
                        onKeyUp={checkCardName}
                     />
                     {invalidCardName && (
                        <p className="errorMessage" style={{ marginTop: '0' }}>
                           {invalidCardName}
                        </p>
                     )}
                     {/* <EditInput
                     value={cardNationality}
                     label="Nationality"
                     name="cardNationality"
                     placeholder=""
                     type="text"
                     onChange={e => handleChange(e)}
                     onKeyUp={checkCardNationality}
                     /> */}
                     <EditInput
                        value={cardNationality}
                        label="Nationality"
                        name="cardNationality"
                        placeholder="Please select"
                        type="select"
                        options={countries}
                        onChange={e => handleChange(e)}
                        onKeyUp={checkCardNationality}
                     />
                     {invalidCardNationality && (
                        <p className="errorMessage" style={{ marginTop: '0' }}>
                           {invalidCardNationality}
                        </p>
                     )}

                     {/* <EditInput
                     value={cardGender}
                     label="Sex"
                     name="cardGender"
                     placeholder=""
                     type="text"
                     onChange={e => handleChange(e)}
                     onKeyUp={checkCardGender}
                     /> */}

                     <EditInput
                        value={cardGender}
                        label="Sex"
                        name="cardGender"
                        placeholder="Please select"
                        type="select"
                        options={gender}
                        onChange={e => handleChange(e)}
                        onKeyUp={checkCardGender}
                     />
                     {invalidCardGender && (
                        <p className="errorMessage" style={{ marginTop: '0' }}>
                           {invalidCardGender}
                        </p>
                     )}

                     {/* <EditInput
                  value={cardTaxRegNo}
                  label="Tax Registration No"
                  name="cardTaxRegNo"
                  placeholder=""
                  type="text"
                  onChange={e => handleChange(e)}
               /> */}
                     {successUpdate && (
                        <div className="successPanel">
                           <p>{successUpdate}..!!</p>
                        </div>
                     )}
                     <div className="buttonWrap" style={{ marginTop: '36px' }}>
                        <button
                           type="button"
                           className="backButton"
                           onClick={() => {
                              onCancel();
                              setOcrReceivables('');
                              clearEmiratedIdDocs();
                              setIsConfirmed(false);
                           }}
                        >
                           Cancel
                        </button>
                        {!proceedButton && !spinner ? (
                           <button
                              className="nextButton"
                              onClick={() => {
                                 checkFormValidations();
                              }}
                           >
                              Confirm
                           </button>
                        ) : spinner ? (
                           <button className="nextButton">
                              <Spin />
                           </button>
                        ) : (
                           <button
                              className="nextButton"
                              onClick={() => {
                                 onCancel();
                                 setsetAgreedtoBuyPolicy(true);
                                 closeDocPanel();
                              }}
                           >
                              Buy Policy
                           </button>
                        )}
                     </div>
                  </>
               )
            )}
         </div>
         {/* <div id="walkingCat">
            <img src="images/version2/animations/walkingCat.png"  />
         </div>  */}
      </>
   );
};

export default CapturedInfo;
