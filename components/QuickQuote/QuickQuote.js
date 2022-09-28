import React, { useState, useContext, useEffect, useRef, Fragment } from 'react';
import Card from '@/components/Card/Card';
import InputField from '@/components/UiFields/InputField/InputField';
import BackAndNextButton from '@/components/UiFields/BackAndNextButton/BackAndNextButton';
import UploadDocs from '@/components/UploadDocs/UploadDocs';
import CalendarInput from '@/components/UiFields/CalenderInput/CalendarInput';
import FormTitle from '@/components/Titles/FormTitle/FormTitle';
import PopUp from '@/components/PopUp/PopUp';
import RequestHelp from '@/components/RequestHelp/RequestHelp';
import CapturedInfo from '@/components/CapturedInfo/CapturedInfo';
import DatePicker from 'react-datepicker';
import { GeneratedIDsContext } from '@/context/GeneratedIDsContext';
import { EmiratesIdContext } from '@/context/EmiratesIdContext';
import { DocOcrContext } from '@/context/DocOcrContext';
import { LeadsContext } from '@/context/LeadsContext';
import Loader from '@/components/Loader/Loader';
import { dateToDBFormat, checkSmallDate } from '@/utils/functions';
import axios from '@/utils/request';
import MaskedInput from 'react-text-mask';
import { RetrieveQuoteContext } from '@/context/RetrieveQuoteContext';
import Spin from '../Spin/Spin';

const QuickQuote = ({ stepSecondAccept }) => {
   const QuoteApi = '/quote-data';
   const OCRApi = '/user-docs';
   const UpdateDateApi = '/update-date';
   const PrintQuoteApi = '/quote-doc';

   const [loader, setLoader] = useState(true);
   const [isContinueDisabled, setIsContinueDisabled] = useState(false);
   const [isContinueLoader, setIsContinueLoader] = useState(false);
   const [isContinueButtonDisabled, setIsContinueButtonDisabled] = useState(true);
   const [isMicrochipInvalid, setIsMicrochipInvalid] = useState(false);
   const [errMicrochip, setErrMicrochip] = useState('');

   const sectionQuicksummary = useRef();
   const sectionUploadEmiratesDocs = useRef();

   // context for setting all the details of user to proceed for retrieval begins
   const { retrivedQuoteDetails, retrievalState } = useContext(RetrieveQuoteContext);
   const [quoteSummaryData, setQuoteSummaryData] = retrivedQuoteDetails;
   const [isRetrieval, setRetrieval] = retrievalState;
   // context for setting all the details of user to proceed for retrieval ends

   const scrollToDiv = () => {
      setTimeout(() => {
         document
            .getElementById('buyPolicyWrap')
            .scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
         // window.scrollTo(0, sectionUploadEmiratesDocs.current.offsetTop -100);
      }, 1000);
   };

   const scrolltoMainDiv = () => {
      window.scrollTo(0, sectionQuicksummary.current.offsetTop - 100);
   };
   // const [quoteSummaryData, setQuoteSummaryData] = useState({});
   const [quoteError, setQuoteError] = useState('');
   const [passportMicroChip, setPassPortMicroChip] = useState({
      passport: '',
      microChip: '',
   });

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

   // useContext for emirates id begins here
   const {
      emiratesID,
      handleChange: handleChangeOCR,
      isConfirmed,
      setIsConfirmed,
      clearDocsFromUpload,
      setClearDocsFromUpload,
   } = useContext(EmiratesIdContext);
   // useContext for emirates id ends here

   const [startDate, setStartDate] = useState(new Date());
   const [errorStartDate, setErrorStartDate] = useState('');

   const [openUploadSection, setOpenUploadSection] = useState(false);
   const [clickedUploadPolicyDocs, setClickedUploadPolicyDocs] = useState(false);
   const [quoteValue, setQuoteValue] = useState({
      quotePetNameDob: '',
      quoteStartDate: startDate,
      quoteCoverage: '',
   });
   const { quotePetNameDob, quoteStartDate, quoteCoverage } = quoteValue;
   const [quoteDocSrc, setQuoteDocSrc] = useState('');
   const [quoteDocError, setQuoteDocError] = useState('');

   // for modal begins here for request help and emirates id
   const [open, setOpen] = useState(false);
   const [openOCR, setOpenOCR] = useState(false);

   const openRequestHelpModal = () => {
      setOpen(true);
   };
   const closeOCRModal = () => {
      // handleChangeOCR('emiratesIdFrontPage', '');
      // handleChangeOCR('emiratesIdBackPage', '');

      setOpenOCR(false);
   };
   // for modal endss here

   const clearEmiratedIdDocs = () => {
      // handleChangeOCR('emiratesIdFrontPage', '');
      // handleChangeOCR('emiratesIdBackPage', '');
      // setClearDocsFromUpload(true);
      // setClickedUploadPolicyDocs(false);
   };

   const docUploadPanel = () => {
      setClickedUploadPolicyDocs(false);
   };

   const handleChange = e => {
      const { name, value } = e.target;
      setQuoteValue(prev => ({
         ...prev,
         [name]: value,
      }));
   };

   const handleChangeForMicroPassport = (name, value) => {
      const regex = /^[0-9\b]+$/;

      if (name === 'microChip') {
         if (value === '' || regex.test(value)) {
            console.log('Inside');
            setPassPortMicroChip(prev => ({
               ...prev,
               [name]: value,
            }));
         }
      } else {
         console.log('Outside');
         setPassPortMicroChip(prev => ({
            ...prev,
            [name]: value,
         }));
      }
   };

   useEffect(() => {
      if (passportMicroChip.microChip && passportMicroChip.passport) {
         setIsContinueButtonDisabled(false);
      } else {
         setIsContinueButtonDisabled(true);
      }
   }, [passportMicroChip]);

   const checkStartDateValid = () => {
      inputStartDate();
      const isStartDate = checkSmallDate(startDate);
      if (!isStartDate) {
         setErrorStartDate('Please enter a date within a month starting today.');
         return false;
      } else if (!quoteStartDate) {
         setErrorStartDate('Please select a start date to proceed.');
         return false;
      } else {
         setErrorStartDate('');
         return true;
      }
   };

   const inputStartDate = () => {
      if (startDate) {
         const policyStartDate = dateToDBFormat(startDate);
         setQuoteValue(prev => ({
            ...prev,
            quoteStartDate: policyStartDate,
         }));
      } else {
         setQuoteValue(prev => ({
            ...prev,
            quoteStartDate: '',
         }));
      }
      if (startDate) {
         setErrorStartDate('');
      }
   };

   useEffect(() => {
      inputStartDate();
   }, [startDate]);

   useEffect(() => {
      if (quoteSummaryData.documents?.eid_front && quoteSummaryData.documents?.eid_back && isRetrieval) {
         stepSecondAccept(true);
      }
   }, [quoteSummaryData]);

   const changeDocStatus = val => {
      setClearDocsFromUpload(val);
   };

   const handleUploadPolicyDocs = () => {
      const validDate = checkStartDateValid();
      if (validDate && !errorStartDate) {
         postUpdatedStartDate(); // update the new date added by user

         setClearDocsFromUpload(false);
         setOpenUploadSection(true);
         setClickedUploadPolicyDocs(true);
         if (quoteSummaryData.documents.eid_front && quoteSummaryData.documents.eid_back && isRetrieval) {
            stepSecondAccept(true);
         }

         scrollToDiv(); //to scroll to its section starting on clicking upload docs button
      }
   };

   const postOCRDocs = () => {
      const formData = new FormData();
      formData.append('quote_id', quoteID);
      formData.append('eid_front', emiratesID.emiratesIdFrontPage);
      formData.append('eid_back', emiratesID.emiratesIdBackPage);

      axios(OCRApi, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         data: formData,
      })
         .then(function (response) {
            if (response.status === 200) {
               setOcrReceivables(response.data.data);
            }
         })
         .catch(error => { });
   };

   const timeout = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
   };
   const delayer = async () => {
      await timeout(3000);
   };
   useEffect(() => {
      if (emiratesID.emiratesIdFrontPage && emiratesID.emiratesIdBackPage) {
         delayer();
         postOCRDocs();
         setOpenOCR(true);
      }
   }, [emiratesID]);

   const postUpdatedStartDate = () => {
      const formData = new FormData();
      formData.append('quote_id', quoteID);
      formData.append('start_date', quoteStartDate);
      axios(UpdateDateApi, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         data: formData,
      })
         .then(function (response) {
            if (response.status === 200) {
            }
         })
         .catch(error => { });
   };

   useEffect(() => { }, [quoteStartDate]);

   const getQuoteSummary = () => {
      axios(QuoteApi, {
         method: 'GET',
         params: {
            quote_id: quoteID,
         },
      })
         .then(response => {
            if (response.status === 200) {
               const Qdata = response.data.data;
               setQuoteSummaryData(Qdata);
               if (quoteSummaryData) {
                  setLoader(false);
               }
            }
         })
         .catch(error => {
            setQuoteError(error.response.data.message);
         });
   };
   const getQuoteToPrint = () => {
      axios(PrintQuoteApi, {
         method: 'GET',
         params: {
            quote_id: quoteID,
         },
      })
         .then(response => {
            if (response.status === 200) {
               const printdata = response.data.data;
               setQuoteDocSrc(printdata);
            }
         })
         .catch(error => {
            if (error.response.status === 401) {
               setQuoteDocError(error.response.data.message);
            }
         });
   };
   useEffect(() => {
      handleChangeOCR('emiratesIdFrontPage', '');
      handleChangeOCR('emiratesIdBackPage', '');
   }, [openUploadSection]);

   useEffect(() => {
      getQuoteSummary();
      getQuoteToPrint();
   }, [quoteID]);

   const submitMicroPassport = async () => {
      const formData = new FormData();
      formData.append('quote_id', quoteID);
      formData.append('microchip_number', passportMicroChip.microChip);
      formData.append('pet_file', passportMicroChip.passport);
      setIsContinueLoader(true);
      try {
         const response = await axios('/pet-details', {
            method: 'PUT',
            data: formData,
         });
         if (response) {
            setIsContinueLoader(false);
            setIsContinueDisabled(true);
            setIsMicrochipInvalid(false);
         }
      } catch (error) {
         setIsContinueLoader(false);
         setIsMicrochipInvalid(true);
         setErrMicrochip(error?.response?.data?.message || 'Please try Again');
      }
   };

   return (
      <div ref={sectionQuicksummary}>
         <div className="row">

            {loader ? (
               <div className="infoLoader" style={{ margin: '0 auto' }}>
                  <Loader statusTitle="Summary" />
               </div>
            ) : (
               <>
                  <div className="col-12">
                     <FormTitle title={`${quoteSummaryData.pet_name}'s Quick Summary`} center="true"></FormTitle>
                  </div>
                  <div className="col-12">
                     <div className="quoteWrap">
                        <div className="quoteHead">
                           <div className="headPrivate">
                              <p className="quoteNumber">
                                 Quote Number: <span>{quoteSummaryData.quote_number}</span>
                              </p>

                              <p className="quotePrint">
                                 <a href={quoteDocSrc} download="quote.pdf" target="_blank">
                                    <span>
                                       <img src="images/version2/printIcon.svg" />
                                    </span>
                                    Print Quote
                                 </a>
                              </p>
                           </div>
                           <div className="headDetails">

                              <p className="planDescription">
                                 Base Premium <span>AED {quoteSummaryData.total_premium?.toLocaleString()}</span>
                              </p>
                              <p className="planDescription planVAT">
                                 VAT AED {quoteSummaryData.vat_amount?.toLocaleString()}
                              </p>
                              {quoteSummaryData.previous_total &&
                                 <p className="planDescription">
                                    Total <span>AED {quoteSummaryData.previous_total?.toLocaleString()}</span>
                                 </p>
                              }
                              {quoteSummaryData.discount_value &&
                                 <p className="planDescription">
                                    Discount Amount <span>AED {quoteSummaryData.discount_value?.toLocaleString()}</span>
                                    <span> ({quoteSummaryData.discount_percent?.toLocaleString()}%) </span>
                                 </p>
                              }
                              <p className="planTotal">
                                 Final Amount AED
                                 <span> {quoteSummaryData.total_amount?.toLocaleString()}</span>
                              </p>
                           </div>
                        </div>
                        <div className="quoteBody">
                           <InputField
                              value={`${quoteSummaryData.pet_breed}, born ${quoteSummaryData.pet_dob
                                 .toString()
                                 .split('-')
                                 .reverse()
                                 .join('-')}`}
                              //    label="Name"
                              name="quotePetNameDob"
                              placeholder="Enter Pet Name and DOB"
                              type="text"
                              onChange={handleChange}
                              disabled={true}
                           />

                           <div className="form-group" style={{ position: 'relative' }}>
                              <span className="labelInside">Start Date: </span>
                              <DatePicker
                                 selected={startDate}
                                 onChange={date => {
                                    setStartDate(date);

                                    checkStartDateValid();
                                    // const policyStartDate = dateToDBFormat(date);
                                    // setQuoteValue(prev => ({
                                    //    ...prev,
                                    //    quoteStartDate: policyStartDate,
                                    // }));
                                 }}
                                 dateFormat="dd-MM-yyyy"
                                 minDate={new Date()}
                                 maxDate={new Date(new Date().setMonth(new Date().getMonth() + 1))}
                                 peekNextMonth
                                 showMonthDropdown
                                 showYearDropdown
                                 dropdownMode="select"
                                 // placeholderText="Enter Start Date"
                                 className="form-control calendarInput inputwithLabelInside"
                                 // value={quoteStartDate}
                                 name="quoteStartDate"
                                 autoComplete="off"
                                 onBlur={checkStartDateValid}
                                 onSelect={checkStartDateValid}
                                 onFocus={checkStartDateValid}
                                 onCalendarClose={checkStartDateValid}
                                 onCalendarOpen={checkStartDateValid}
                                 onWeekSelect={checkStartDateValid}
                                 onMonthChange={checkStartDateValid}
                                 onYearChange={checkStartDateValid}
                                 onDayMouseEnter={checkStartDateValid}
                                 onClickOutside={checkStartDateValid}
                                 customInput={
                                    <MaskedInput
                                       mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                       keepCharPositions={true}
                                       guide={true}
                                    />
                                 }
                              />
                           </div>
                           <div className="form-group">
                              {errorStartDate && <p className="errorMessage">{errorStartDate}</p>}
                           </div>

                           <InputField
                              value={`Annual Coverage: AED ${quoteSummaryData.annual_coverage?.toLocaleString()}`}
                              //    label="Name"
                              name="quoteCoverage"
                              placeholder="Enter Quote Coverage"
                              type="text"
                              onChange={handleChange}
                              disabled={true}
                           />
                           <BackAndNextButton
                              leftTitle={`${isRetrieval ? 'Re-Upload Documents' : 'Upload Documents'}`}
                              rightTitle="Request Help"
                              handleUploadPolicyDocs={handleUploadPolicyDocs}
                              handleRequestHelp={openRequestHelpModal}
                           />
                           {isRetrieval && !isConfirmed && (
                              <p className="optionalNote">
                                 Note: If you've uploaded your Emirates ID, you can proceed to Buy Policy.
                              </p>
                           )}
                           {isConfirmed && (
                              <p className="optionalNote" style={{ color: '#4ddf4d' }}>
                                 Successfully uploaded Emirates Id. Please click Buy Policy to proceed.
                              </p>
                           )}

                           <PopUp open={open} onClose={() => setOpen(false)}>
                              <RequestHelp />
                           </PopUp>
                        </div>
                     </div>
                  </div>
               </>
            )}
         </div>
         <div className="buyPolicyWrap" ref={sectionUploadEmiratesDocs} id="buyPolicyWrap">
            {!openUploadSection &&
               quoteSummaryData.documents?.eid_front &&
               quoteSummaryData.documents?.eid_back &&
               isRetrieval && (
                  <div className="row">
                     <div className="col-12">
                        <InputField
                           value={'Microchip Number: ' + quoteSummaryData?.microchip_number}
                           //    label="Name"
                           name="quoteCoverage"
                           placeholder="Enter Quote Coverage"
                           type="text"
                           onChange={handleChange}
                           disabled={true}
                        />
                     </div>
                     <div className="col-12">
                        <div className="uploadImg-Wrap" style={{ height: '212px' }}>
                           <img
                              src={quoteSummaryData?.documents?.pet_doc_file}
                              alt=""
                              width="100%"
                              height="100%"
                              style={{ borderRadius: '25px' }}
                           />
                        </div>
                     </div>
                     <div className="col-12 col-md-6">
                        <div className="uploadImg-Wrap" style={{ height: '212px' }}>
                           <img
                              src={quoteSummaryData.documents.eid_front}
                              alt=""
                              width="100%"
                              height="100%"
                              style={{ borderRadius: '25px' }}
                           />
                        </div>
                     </div>
                     <div className="col-12 col-md-6">
                        <div className="uploadImg-Wrap" style={{ height: '212px' }}>
                           <img
                              src={quoteSummaryData.documents.eid_back}
                              alt=""
                              width="100%"
                              height="100%"
                              style={{ borderRadius: '25px' }}
                           />
                        </div>
                     </div>
                  </div>
               )}
            {openUploadSection && (
               <form>
                  <div className="row">
                     <div className="col-12">
                        <FormTitle title="Additional Information" center="true"></FormTitle>
                     </div>

                     <div className="col-12">
                        <InputField
                           value={passportMicroChip.microChip}
                           name="microChip"
                           placeholder="Enter Microchip Number"
                           type="text"
                           onChange={event => handleChangeForMicroPassport(event.target.name, event.target.value)}
                           disabled={isContinueDisabled}
                        />
                     </div>
                     {isMicrochipInvalid && (
                        <p className="errorMessage" style={{ marginLeft: '15px' }}>
                           {errMicrochip}
                        </p>
                     )}

                     <div className="col-12">
                        <UploadDocs
                           uploadInputId="passport"
                           boxWidth={'212px'}
                           labelWeb="Upload Pet Passport Copy / Vaccination Card"
                           labelMob=""
                           checkUploadedFile={url => handleChangeForMicroPassport('passport', url)}
                        ></UploadDocs>
                     </div>

                     {!isContinueDisabled && (
                        <div className="col-12">
                           <div class="buttonWrap continueButton">
                              <button
                                 type="button"
                                 class="nextButton"
                                 onClick={submitMicroPassport}
                                 disabled={isContinueButtonDisabled}
                              >
                                 {isContinueLoader ? <Spin /> : 'Continue'}
                              </button>
                           </div>
                        </div>
                     )}

                     {isContinueDisabled && (
                        <Fragment>
                           <div className="col-12 col-md-6">
                              <UploadDocs
                                 uploadInputId="EmiratesIdFront"
                                 boxWidth={'212px'}
                                 labelWeb="Upload Emirates ID
                              (Front Page)"
                                 labelMob=""
                                 checkUploadedFile={url => handleChangeOCR('emiratesIdFrontPage', url)}
                              // clearDocs={clearDocsFromUpload}
                              // changeDocStatus={val => changeDocStatus(val)}
                              ></UploadDocs>
                           </div>
                           <div className="col-12 col-md-6">
                              <UploadDocs
                                 uploadInputId="EmiratesIdBack"
                                 boxWidth={'212px'}
                                 labelWeb="Upload Emirates ID
                           (Back Page)"
                                 labelMob=""
                                 checkUploadedFile={url => handleChangeOCR('emiratesIdBackPage', url)}
                              // clearDocs={clearDocsFromUpload}
                              // changeDocStatus={val => changeDocStatus(val)}
                              ></UploadDocs>
                           </div>
                        </Fragment>
                     )}
                     {/* <div className="col-12">
                     <UploadDocs
                        uploadInputId="VATCertificate"
                        boxWidth={"212px"}
                        labelWeb="Upload VAT Certificate"
                        labelMob=""></UploadDocs>
                  </div> */}
                  </div>
               </form>
            )}
            {openUploadSection && isRetrieval && (
               <div className="col-12 col-md-6" style={{ margin: '0 auto' }}>
                  <div className="buttonWrap">
                     <button
                        type="button"
                        className="backButton"
                        onClick={() => {
                           setOpenUploadSection(false);
                        }}
                     >
                        Cancel Upload
                     </button>
                  </div>
               </div>
            )}
            <PopUp
               open={openOCR}
               onClose={() => {
                  closeOCRModal();
                  // scrolltoMainDiv();
                  docUploadPanel();
                  setOcrReceivables('');
                  clearEmiratedIdDocs();
                  setIsConfirmed(false);
               }}
               clearDocs={clearDocsFromUpload}
            >
               <CapturedInfo
                  onCancel={() => {
                     setOcrReceivables('');
                     closeOCRModal();
                     // scrolltoMainDiv();
                  }}
                  clearDocs={clearDocsFromUpload}
                  closeDocPanel={docUploadPanel}
                  clearEmiratedIdDocs={clearEmiratedIdDocs}
                  stepSecondAccept={stepSecondAccept}
               />
            </PopUp>
         </div>
      </div>
   );
};

export default QuickQuote;
