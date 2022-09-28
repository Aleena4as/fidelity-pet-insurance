import { useState, useEffect, useContext } from 'react';
import InputField from '@/components/UiFields/InputField/InputField';
import RadioInput from '@/components/UiFields/RadioInput/RadioInput';
import SelectField from '@/components/UiFields/SelectField/SelectField';
import ButtonSwitch from '@/components/ButtonSwitch/ButtonSwitch';
import ContentTitle from '@/components/Titles/ContentTitle/ContentTitle';
import UploadImage from '@/components/UploadImage/UploadImage';
import Card from '@/components/Card/Card';
import FormTitle from '@/components/Titles/FormTitle/FormTitle';
import UploadDocs from '@/components/UploadDocs/UploadDocs';
import CalendarInput from '@/components/UiFields/CalenderInput/CalendarInput';
import PetRecognition from '@/components/PetRecognition/PetRecognition';
import DatePicker from 'react-datepicker';
import AutoFilledInput from '@/components/UiFields/AutoFilledInput/AutoFilledInput';
import { dateToDBFormat } from '@/utils/functions';
import { LeadsContext } from '@/context/LeadsContext';
import MaskedInput from 'react-text-mask';
import { BasicInfoContext } from '@/context/BasicInfoContext';
import { DetectionContext } from '@/context/DetectionContext';
import { calculateWeekDiff } from '@/utils/functions';
import axios from '@/utils/request';
import QuickQuoteApi from '../../api/QuickQuoteApi';
import PromoCode from 'components/PromoCode/PromoCode';
import { FormFieldsContext } from '@/context/FormFieldsContext';

const RequestQuote = ({ stepZeroAccept }) => {
   const [nextButtonvisible, setNextButtonvisible] = useState(false);
   const [isallInputs, setIsallInputs] = useState(false);

   const [formFields, setFormFields] = useState([]);

   // form fields value from API begins 
   const { formFieldDetails } = useContext(FormFieldsContext);
   const [baseFieldData, setBaseFieldData] = formFieldDetails;
   const { emirateData, ageData, genderData, microChipData, preConditionData, neuteredData, speciesData } =
      baseFieldData;
   // form fields value from API ends 

   const { MLDetails, localImage } = useContext(DetectionContext);
   const [petUploaded, setPetUploaded] = MLDetails;
   const [imageUrlLocal, setImageUrlLocal] = localImage;

   // context basic info of leads and pets begins here
   const { leadContents, petsContents, detectContents, birthDates, chipContents, conditionsDoc } =
      useContext(BasicInfoContext);
   const [supportingDoc, setSupportingDoc, handleSupportingDoc] = conditionsDoc;

   const [chipStatus, setChipStatus, handleChipStatus] = chipContents;
   const [petstartDate, setPetStartDate, startDate, setStartDate] = birthDates;
   const [holderName, holderDob, holderMobile, holderEmail, holderEmirate, leadInfo, setLeadInfo] = leadContents;

   const [
      petName,
      petDob,
      petGender,
      petAge,
      microchipped,
      preExistingCondition,
      neutered,
      basicPetInfo,
      setBasicPetInfo,
   ] = petsContents;
   const [petImage, petType, petBreed, detectPetInfo, setDetectPetInfo] = detectContents;
   // context basic info of leads and pets ends here

   // context for first page informations begins here

   const {
      leadPost,
      mLPost,
      petBasicPost,
      conditionOptions,
      statusChip,
      statusPre,
      statusNeutured,
      supportPre,
      status1,
      status2,
      status3,
      errorOnLead,
   } = useContext(LeadsContext);
   const [leadsInputValues, setLeadsInputValues] = leadPost;
   const [petMLValues, setPetMLValues] = mLPost;
   const [basicPetValues, setBasicPetValues] = petBasicPost;
   const [optionStatus, setOptionStatus] = conditionOptions;
   const [chipIdValues, setChipValues] = statusChip;
   const [preConditionValues, setPreConditionValues] = statusPre;
   const [neuteredValues, setNeuteredValues] = statusNeutured;
   const [supportingFile, setSupportingFile] = supportPre;
   const [microStatus, setMicroStatus] = status1;
   const [preStatus, setPreStatus] = status2;
   const [neuteredStatus, setNeuteredStatus] = status3;
   const [leadsError, setLeadsError] = errorOnLead;
   // context for first page informations ends here
   const verifyChipApi = '/verify-chip';
   // const uaeMobileReg = /^(?:00971|\+971|0)?(?:50|51|52|55|56|58|2|3|4|6|7|9)\d{7}$/;
   const uaeMobileReg = /^(?:0)(?:50|51|52|54|55|56|58|2|3|4|6|7|9)\d{7}$/; //format 05066936365
   const emailReg =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   const onlyNumbers = /^[0-9]*$/;
   const onlyAlphabets = /^[a-zA-Z ]*$/;
   const [ageToSort, setAgeToSort] = useState('0');



   // const [startDate, setStartDate] = useState('');
   // const [petstartDate, setPetStartDate] = useState('');

   const [errorInput, setErrorInput] = useState({
      invalidName: '',
      invalidHolderDob: '',
      invalidEmail: '',
      invalidMobile: '',
      invalidPetDob: '',
      invalidBreed: '',
      invalidMicroId: '',
      invalidPreCondition: '',
      invalidPetName: '',
      invalidPetAge: '',
      invalidPetGender: '',
      invalidHolderEmirate: '',
   });
   const {
      invalidName,
      invalidHolderDob,
      invalidEmail,
      invalidMobile,
      invalidPetDob,
      invalidBreed,
      invalidMicroId,
      invalidPreCondition,
      invalidPetName,
      invalidPetAge,
      invalidPetGender,
      invalidHolderEmirate,
   } = errorInput;

   const [petImageToDisplay, setPetImageToDisplay] = useState('');

   // const [leadInfo, setLeadInfo] = useState({
   //    holderName: '',
   //    holderDob: '',
   //    holderMobile: '',
   //    holderEmail: '',
   //    holderEmirate: '',
   // });
   // const { holderName, holderDob, holderMobile, holderEmail, holderEmirate } = leadInfo;

   // const [detectPetInfo, setDetectPetInfo] = useState({
   //    petImage: '',
   //    petType: '',
   //    petBreed: '',
   // });
   // const { petImage, petType, petBreed } = detectPetInfo;

   // const [basicPetInfo, setBasicPetInfo] = useState({
   //    petName: '',
   //    petDob: '',
   //    petGender: '',
   //    petAge: '',
   //    microchipped: '',
   //    preExistingCondition: '',
   //    neutered: '',
   // });
   // const { petName, petDob, petGender, petAge, microchipped, preExistingCondition, neutered } = basicPetInfo;

   useEffect(() => {

      (async () => {
         const [baseInfo, baseInfoError] = await fetchBaseData();

         setBaseFieldData({
            emirateData: baseInfo?.emirate,
            ageData: baseInfo?.pet_age,
            genderData: baseInfo?.pet_gender,
            microChipData: baseInfo?.microchip,
            preConditionData: baseInfo?.pre_existing_status,
            neuteredData: baseInfo?.neutered,
            speciesData: baseInfo?.species,
         });
         setChipValues(baseInfo?.microchip);
         setPreConditionValues(baseInfo?.pre_existing_status);
         setNeuteredValues(baseInfo?.neutered);
      })();
   }, []);

   const handleLeadsInfo = (e, type) => {
      const { name, value } = e.target;
      let newValue = value;
      if (type === 'holderDob') {
         if (value === 'yes') {
            newValue = formFields?.user_dob_options?.[0]?.id;
         } else {
            newValue = formFields?.user_dob_options?.[1]?.id;
         }
      }
      setLeadInfo(prev => ({
         ...prev,
         [name]: newValue,
      }));
   };

   const handleRecognisionInputs = (petImage, petType, petBreed) => {
      setDetectPetInfo({ ...detectPetInfo, petImage: petImage, petType: petType, petBreed: petBreed });
   };
   const handleUserUpdatedBreed = userBreed => {
      setDetectPetInfo({ ...detectPetInfo, petBreed: userBreed });
   };
   const handleUserUpdatedType = userType => {
      setDetectPetInfo({ ...detectPetInfo, petType: userType });
   };
   const handlePetBasicInfo = e => {
      const { name, value } = e.target;
      setBasicPetInfo(prev => ({
         ...prev,
         [name]: value,
      }));
   };

   useEffect(() => {
      fetchFormField();
   }, []);

   useEffect(() => {
      setLeadsInputValues(leadInfo);
      setPetMLValues(detectPetInfo);
      setBasicPetValues(basicPetInfo);
      // console.log('leads information', leadInfo);
      // console.log('pet detection information', detectPetInfo);
      // console.log('Basic pet information', basicPetInfo);
   }, [leadInfo, detectPetInfo, basicPetInfo]);

   //   pass value to input fields

   // store values from input
   const getSelectedvalues = valueReturned => { };

   const petDetectionStatus = url => {
      if (url) {
         setPetUploaded(true);
         setPetImageToDisplay(url);
         setImageUrlLocal(URL.createObjectURL(url));
      }
   };

   useEffect(() => {
      setSupportingFile(supportingDoc);
   }, [supportingDoc]);

   useEffect(() => {
      // console.log('chipDetail', chipStatus);
      if (chipStatus.microchipStatus === 'no') {
         setBasicPetInfo({ ...basicPetInfo, microchipped: '' });
         setErrorInput({
            ...errorInput,
            invalidMicroId: '',
         });
      }
      if (chipStatus.preconditionStatus === 'no') {
         setBasicPetInfo({ ...basicPetInfo, preExistingCondition: '' });
         setErrorInput({
            ...errorInput,
            invalidPreCondition: '',
         });
      }
      setOptionStatus(chipStatus);
   }, [chipStatus]);
   // chip status ends here

   const microchipDBCheck = () => {
      axios(verifyChipApi, {
         method: 'GET',
         params: {
            chip_id: microchipped,
         },
      })
         .then(response => {
            if (response.status === 200) {
               setErrorInput({
                  ...errorInput,
                  invalidMicroId: '',
               });
            }
         })
         .catch(error => {
            if (error.response.status === 400) {
               setErrorInput({
                  ...errorInput,
                  invalidMicroId: error.response.data.message,
               });
            }
         });
   };

   const checkNameValidation = () => {
      if (holderName.length > 100) {
         setErrorInput({
            ...errorInput,
            invalidName: 'Name must not exceed 100 charecters.',
         });
      } else if (!onlyAlphabets.test(holderName.toLowerCase())) {
         setErrorInput({
            ...errorInput,
            invalidName: 'Please enter alphabets only.',
         });
      } else if (!holderName) {
         setErrorInput({
            ...errorInput,
            invalidName: 'Please enter your Name.',
         });
      } else {
         setErrorInput({
            ...errorInput,
            invalidName: '',
         });
      }
   };
   const checkHolderDateValidation = () => {
      if (!holderDob) {
         setErrorInput({
            ...errorInput,
            invalidHolderDob: "Please enter holder's Date of Birth.",
         });
      } else {
         setErrorInput({
            ...errorInput,
            invalidHolderDob: '',
         });
      }
   };
   const checkPetDateValidation = () => {
      if (!petDob) {
         setErrorInput({
            ...errorInput,
            invalidPetDob: "Please enter your pet's date of birth.",
         });
      } else {
         setErrorInput({
            ...errorInput,
            invalidPetDob: '',
         });
      }
      findAge();
   };
   const checkMobileNumValidation = event => {
      if (holderMobile && !uaeMobileReg.test(holderMobile.toLowerCase())) {
         setErrorInput({
            ...errorInput,
            invalidMobile: 'Please enter mobile number in 05******** format.',
         });
      } else if (holderMobile && holderMobile.length > 10) {
         setErrorInput({
            ...errorInput,
            invalidMobile: 'Please enter a valid mobile number.',
         });
      } else if (!holderMobile) {
         setErrorInput({
            ...errorInput,
            invalidMobile: 'Please enter your mobile number.',
         });
      } else {
         setErrorInput({
            ...errorInput,
            invalidMobile: '',
         });
      }
   };
   const checkEmailValidation = () => {
      if (holderEmail && !emailReg.test(holderEmail.toLowerCase())) {
         setErrorInput({
            ...errorInput,
            invalidEmail: 'Please enter a valid email ID.',
         });
      } else if (!holderEmail) {
         setErrorInput({
            ...errorInput,
            invalidEmail: 'Please enter Email Id.',
         });
      } else {
         setErrorInput({
            ...errorInput,
            invalidEmail: '',
         });
      }
   };
   const checkPetNameValidation = () => {
      if (petName.length > 100) {
         setErrorInput({
            ...errorInput,
            invalidPetName: 'Pet name must not exceed 100 charecters.',
         });
      } else if (!onlyAlphabets.test(petName.toLowerCase())) {
         setErrorInput({
            ...errorInput,
            invalidPetName: 'Please enter alphabets only.',
         });
      } else if (!petName) {
         setErrorInput({
            ...errorInput,
            invalidPetName: "Please enter your pet's name.",
         });
      } else {
         setErrorInput({
            ...errorInput,
            invalidPetName: '',
         });
      }
   };
   const checkHolderEmirate = () => {
      if (holderEmirate === '') {
         setErrorInput({
            ...errorInput,
            invalidHolderEmirate: "Please enter your holder's emirate.",
         });
      } else if (holderEmirate) {
         setErrorInput({
            ...errorInput,
            invalidHolderEmirate: '',
         });
      }
   };
   const checkPetAge = () => {
      if (petAge === '') {
         setErrorInput({
            ...errorInput,
            invalidPetAge: "Please enter your Pet's age.",
         });
      } else if (petAge) {
         setErrorInput({
            ...errorInput,
            invalidPetAge: '',
         });
      }
   };

   const checkPetGender = () => {
      if (petGender === '') {
         setErrorInput({
            ...errorInput,
            invalidPetGender: "Please enter your pet's gender.",
         });
      } else if (petGender) {
         setErrorInput({
            ...errorInput,
            invalidPetGender: '',
         });
      }
   };

   const checkMicrochipValidation = () => {
      if (chipStatus.microchipStatus === 'no') {
         setErrorInput({
            ...errorInput,
            invalidMicroId: '',
         });
      } else if (chipStatus.microchipStatus === 'yes' && !microchipped) {
         setErrorInput({
            ...errorInput,
            invalidMicroId: 'Please enter microchip number.',
         });
      } else if (!onlyNumbers.test(microchipped.toLowerCase())) {
         setErrorInput({
            ...errorInput,
            invalidMicroId: 'Please enter numbers only.',
         });
      }
      // else if (chipStatus.microchipStatus === 'yes' && microchipped.length > 15) {
      //    setErrorInput({
      //       ...errorInput,
      //       invalidMicroId: 'Please enter a valid microchip number.',
      //    });
      // } else if (chipStatus.microchipStatus === 'yes' && microchipped.length < 9) {
      //    setErrorInput({
      //       ...errorInput,
      //       invalidMicroId: 'Please enter a valid microchip number.',
      //    });
      // } else if (chipStatus.microchipStatus === 'yes' && microchipped.length > 10 && microchipped.length < 15) {
      //    setErrorInput({
      //       ...errorInput,
      //       invalidMicroId: 'Please enter a valid microchip number.',
      //    });
      // } else if (chipStatus.microchipStatus === 'yes' && microchipped.length > 8) {
      //    microchipDBCheck();
      // }
      else {
         setErrorInput({
            ...errorInput,
            invalidMicroId: '',
         });
      }
      if (chipStatus.microchipStatus === 'yes' && microchipped.length) {
         microchipDBCheck();
      }
   };
   const checkPreConditionValidation = () => {
      if (chipStatus.preconditionStatus === 'yes' && !preExistingCondition) {
         setErrorInput({
            ...errorInput,
            invalidPreCondition: 'Please enter pets condition.',
         });
      } else if (preExistingCondition && preExistingCondition.length > 100) {
         setErrorInput({
            ...errorInput,
            invalidPreCondition: 'Pre condition should be less than 100 charecters.',
         });
      } else {
         setErrorInput({
            ...errorInput,
            invalidPreCondition: '',
         });
      }
   };

   const fetchBaseData = async () => {
      try {
         const response = await axios('/form-fields');
         if (response.status === 200) {
            return [response?.data?.data, null];
         }
      } catch (error) {
         if (error.response) {
            return [null, error?.response?.data?.message];
         }
      }
   };

   useEffect(() => {
      //    condition check for chip values

      if (optionStatus && chipIdValues && preConditionValues && neuteredValues) {
         if (optionStatus.microchipStatus === 'yes') {
            let chipTrueValue = chipIdValues?.filter(chip => chip.name === true);
            setMicroStatus(chipTrueValue[0].id);
         } else if (optionStatus.microchipStatus === 'no') {
            let chipTrueValue = chipIdValues?.filter(chip => chip.name === false);
            setMicroStatus(chipTrueValue[0].id);
         }
         if (optionStatus.preconditionStatus === 'yes') {
            let preTrueValue = preConditionValues?.filter(pre => pre.name === true);
            setPreStatus(preTrueValue[0].id);
         } else if (optionStatus.preconditionStatus === 'no') {
            let preTrueValue = preConditionValues?.filter(pre => pre.name === false);
            setPreStatus(preTrueValue[0].id);
         }

         if (optionStatus.neuteredStatus === 'yes') {
            let neuTrueValue = neuteredValues?.filter(neu => neu.name === true);
            setNeuteredStatus(neuTrueValue[0].id);
         } else if (optionStatus.neuteredStatus === 'no') {
            let neuTrueValue = neuteredValues?.filter(neu => neu.name === false);
            setNeuteredStatus(neuTrueValue[0].id);
         }
      }

      // console.log(' final ID values are', microStatus, preStatus, neuteredStatus);
   }, [chipIdValues, preConditionValues, neuteredValues, chipStatus, optionStatus, basicPetInfo]);

   // function to find the age of the pet
   const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

   const findAge = () => {
      const calculatedAge = getAge(petDob);

      if (calculatedAge < 1) {
         const calculatedAgeWeek = calculateWeekDiff(petDob);
         if (calculatedAgeWeek >= 8) {
            setAgeToSort(0);
         }
         if (calculatedAgeWeek <= 52) {
            setAgeToSort(0);
         }
         if (calculatedAgeWeek < 8) {
            setAgeToSort(-1);
         }
      } else {
         setAgeToSort(calculatedAge);
      }
   };
   useEffect(() => {
      findAge();
   }, [petDob]);

   const validatePetGender = () => {
      if (!petGender) {
         checkPetGender();
      }
   };

   useEffect(() => {
      if (invalidHolderEmirate || invalidPetAge || invalidPetGender) {
         setIsallInputs(true);
      } else {
         setIsallInputs(false);
      }
   }, [invalidHolderEmirate, invalidPetAge, invalidPetGender]);

   // for next step validation begins here

   useEffect(() => {
      // console.log('checking');
      if (
         !invalidName &&
         !invalidHolderDob &&
         !invalidEmail &&
         !invalidMobile &&
         !invalidPetDob &&
         !invalidBreed &&
         !invalidMicroId &&
         !invalidPreCondition &&
         !invalidPetName &&
         !invalidHolderEmirate &&
         !invalidPetAge &&
         !invalidPetGender &&
         holderName &&
         holderDob &&
         holderMobile &&
         holderEmail &&
         holderEmirate &&
         petType &&
         petBreed &&
         petName &&
         petDob &&
         petGender &&
         petAge
      ) {
         // enable the next button
         setIsallInputs(false);
         stepZeroAccept(true);
         if (chipStatus.preconditionStatus === 'yes' && !preExistingCondition) {
            setIsallInputs(true);
            stepZeroAccept(false);
         }
         // unComment when microchip input is required
         // else if (chipStatus.microchipStatus === 'yes' && !microchipped) {
         //    setIsallInputs(true);
         //    stepZeroAccept(false);
         // }
      } else if (
         !holderName &&
         !holderDob &&
         !holderMobile &&
         !holderEmail &&
         !holderEmirate &&
         !petType &&
         !petBreed &&
         !petName &&
         !petDob &&
         !petGender &&
         !petAge
      ) {
         // console.log('error inputs noooooooot cleared', errorInput);

         stepZeroAccept(false);
      } else {
         // console.log('undefined detailsss occured');
         stepZeroAccept(false);
      }
   }, [
      errorInput,
      preExistingCondition,
      microchipped,
      chipStatus.microchipStatus,
      chipStatus.preconditionStatus,
      invalidName,
      invalidHolderDob,
      invalidEmail,
      invalidMobile,
      invalidPetDob,
      invalidBreed,
      invalidMicroId,
      invalidPreCondition,
      invalidPetName,
      invalidHolderEmirate,
      invalidPetAge,
      invalidPetGender,
      holderName,
      holderDob,
      holderMobile,
      holderEmail,
      holderEmirate,
      petType,
      petBreed,
      petName,
      petDob,
      petGender,
      petAge,
   ]);
   // for next step validation ends here

   // for DOB of holder validation and changing date format to send to API begins
   const inputHolderDob = () => {
      if (startDate) {
         const holderDobCalender = dateToDBFormat(startDate);
         setLeadInfo(prevState => ({
            ...prevState,
            holderDob: holderDobCalender,
         }));
      } else {
         setLeadInfo(prevState => ({
            ...prevState,
            holderDob: '',
         }));
      }
      if (startDate) {
         setErrorInput({
            ...errorInput,
            invalidHolderDob: '',
         });
      }
   };

   // useEffect(() => {
   //    inputHolderDob();
   // }, [startDate]);
   // for DOB of holder validation and changing date format to send to API ends

   // for DOB of PET validation and changing date format to send to API begins
   const inputPetDob = () => {
      if (petstartDate) {
         const petDobCalender = dateToDBFormat(petstartDate);
         setBasicPetInfo(prevState => ({
            ...prevState,
            petDob: petDobCalender,
         }));
      } else {
         setBasicPetInfo(prevState => ({
            ...prevState,
            petDob: '',
         }));
      }
      if (petstartDate) {
         setErrorInput({
            ...errorInput,
            invalidPetDob: '',
         });
      }
   };

   useEffect(() => {
      inputPetDob();
   }, [petstartDate]);
   // for DOB of PET validation and changing date format to send to API ends
   useEffect(() => {
      if (petUploaded) {
         // checkNameValidation();
         // checkMobileNumValidation();
         // checkHolderDateValidation();
         // checkEmailValidation();
         checkHolderEmirate();
      }
   }, [petUploaded]);

   const fetchFormField = () => {
      const quoteformApi = '/form-fields';
      axios(quoteformApi, {
         method: 'GET',
      }).then(response => {
         if (response.status === 200) {
            setFormFields(response.data.data);
            setLeadInfo(prev => ({ ...prev, holderDob: response?.data?.data?.user_dob_options?.[0]?.id }));
         }
      });
   };

   return (
      <div className="row">
         <div className="col-12">
            <form autoComplete="off">
               <div className="holderInfoForm">
                  <div className="row">
                     <div className="col-12">
                        <FormTitle title="Policy Holder Information" />
                     </div>
                     <div className="col-12 col-md-6">
                        <InputField
                           value={holderName}
                           //    label="Name"
                           name="holderName"
                           placeholder="Enter Policy Holder Name"
                           type="text"
                           onChange={e => handleLeadsInfo(e)}
                           onBlur={checkNameValidation}
                        />
                        {invalidName && <p className="errorMessage">{invalidName}</p>}
                     </div>

                     <div className="col-12 col-md-6">
                        <InputField
                           value={holderMobile}
                           //    label="Mobile Number"
                           name="holderMobile"
                           placeholder="Mobile Number"
                           type="text"
                           onChange={e => handleLeadsInfo(e)}
                           onBlur={checkMobileNumValidation}
                           maxLength="10"
                        />
                        {invalidMobile && <p className="errorMessage">{invalidMobile}</p>}
                     </div>

                     <div className="col-12 col-md-6">
                        <InputField
                           value={holderEmail}
                           //    label="Mobile Number"
                           name="holderEmail"
                           placeholder="Email Address"
                           type="text"
                           onChange={e => handleLeadsInfo(e)}
                           onBlur={checkEmailValidation}
                        />
                        {invalidEmail && <p className="errorMessage">{invalidEmail}</p>}
                     </div>

                     <div className="col-12 col-md-6">
                        <SelectField
                           title="Select Emirate"
                           option={emirateData}
                           value={holderEmirate}
                           name="holderEmirate"
                           onChange={e => handleLeadsInfo(e)}
                           onBlur={checkHolderEmirate}
                        />
                        {invalidHolderEmirate && <p className="errorMessage">{invalidHolderEmirate}</p>}
                     </div>

                     <div className="col-12 col-md-6">
                        <div className="form-group m-auto">
                           <RadioInput
                              label="Are you 18 years or above?"
                              radioName="holderDob"
                              value={preExistingCondition}
                              extraInput={false}
                              onChange={handlePetBasicInfo}
                              radioStatus={(name, status) =>
                                 handleLeadsInfo({ target: { name, value: status } }, 'holderDob')
                              }
                              statusValue={'yes'}
                           />
                        </div>
                        {invalidHolderDob && <p className="errorMessage">{invalidHolderDob}</p>}
                     </div>
                  </div>
               </div>
               <div className="uploadPetsForm">
                  <div className="row">
                     {!petUploaded ? (
                        <>
                           <div className="col-12">
                              <FormTitle title="Upload or Snap a pet’s picture" />
                           </div>
                           <div className="col-12">
                              <UploadImage petDetectionStatus={url => petDetectionStatus(url)}></UploadImage>
                           </div>
                        </>
                     ) : (
                        <div className="col-12">
                           <PetRecognition
                              displayImageSrc={petImageToDisplay}
                              getRecognitionInput={(petImage, petType, petBreed) =>
                                 handleRecognisionInputs(petImage, petType, petBreed)
                              }
                              getUserUpdatedBreed={breedFromUser => handleUserUpdatedBreed(breedFromUser)}
                              getUserUpdatedType={typeFromUser => handleUserUpdatedType(typeFromUser)}
                              option={speciesData}
                              localFileUpload={petUploaded => setPetUploaded(!petUploaded)}
                           />
                        </div>
                     )}
                  </div>
               </div>
               {petType && petBreed && (
                  <div className="petsInfoForm">
                     <div className="row">
                        <div className="col-12">
                           <FormTitle title="Covered Pet Information"></FormTitle>
                        </div>
                        <div className="col-12 col-md-6">
                           <InputField
                              value={petName}
                              //    label="Date of Birth"
                              name="petName"
                              placeholder="Pet Name"
                              type="text"
                              onChange={handlePetBasicInfo}
                              onBlur={checkPetNameValidation}
                           />
                           {invalidPetName && <p className="errorMessage">{invalidPetName}</p>}
                        </div>
                        <div className="col-12 col-md-6">
                           <div className="form-group">
                              <DatePicker
                                 selected={petstartDate}
                                 onChange={date => {
                                    setPetStartDate(date);
                                    // const petDobCalender = dateToDBFormat(date);
                                    // setBasicPetInfo(prevState => ({
                                    //    ...prevState,
                                    //    petDob: petDobCalender,
                                    // }));
                                    checkPetDateValidation();
                                 }}
                                 dateFormat="dd-MM-yyyy"
                                 minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 20))}
                                 maxDate={new Date()}
                                 peekNextMonth
                                 showMonthDropdown
                                 showYearDropdown
                                 dropdownMode="select"
                                 placeholderText="Pet Date of Birth"
                                 className="form-control calendarInput"
                                 // value={petDob}
                                 name="petDob"
                                 onBlur={checkPetDateValidation}
                                 autoComplete="off"
                                 onBlur={checkPetDateValidation}
                                 onSelect={checkPetDateValidation}
                                 onFocus={checkPetDateValidation}
                                 onCalendarClose={checkPetDateValidation}
                                 onCalendarOpen={checkPetDateValidation}
                                 onWeekSelect={checkPetDateValidation}
                                 onMonthChange={checkPetDateValidation}
                                 onYearChange={checkPetDateValidation}
                                 onDayMouseEnter={checkPetDateValidation}
                                 customInput={
                                    <MaskedInput
                                       mask={[/\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                                       keepCharPositions={true}
                                       guide={true}
                                    />
                                 }
                              />
                           </div>
                           {invalidPetDob && <p className="errorMessage">{invalidPetDob}</p>}
                        </div>
                        <div className="col-12 col-md-6">
                           <SelectField
                              title="Select Gender"
                              option={genderData}
                              value={petGender}
                              name="petGender"
                              onChange={e => {
                                 handlePetBasicInfo(e);
                                 checkPetGender();
                              }}
                              onBlur={checkPetGender}
                           />
                           {invalidPetGender && <p className="errorMessage">{invalidPetGender}</p>}
                        </div>
                        <div className="col-12 col-md-6">
                           {/* <SelectField
                           title="Select Age"
                           option={ageData}
                           value={petAge}
                           name="petAge"
                           onChange={handlePetBasicInfo}
                        /> */}
                           <AutoFilledInput
                              value={petAge}
                              name="petAge"
                              options={ageData}
                              calculatedAge={ageToSort}
                              onChange={age => setBasicPetInfo({ ...basicPetInfo, petAge: age })}
                              disabled={true}
                           />

                           {invalidPetAge && <p className="errorMessage">{invalidPetAge}</p>}
                        </div>
                        <div className="col-12 col-md-6">
                           <RadioInput
                              label="Microchipped"
                              radioName="microchipStatus"
                              extraInput={false}
                              onChange={handlePetBasicInfo}
                              radioStatus={(name, status) => handleChipStatus(name, status)}
                              checkdropDownsvalid={e => validatePetGender(e)}
                              // name="microchipped"
                              // value={microchipped}
                              // extraInputPlaceholder="Microchip Number"
                              // datas={microChipData}
                              // onBlur={checkMicrochipValidation}
                              // maxLength="15"
                              statusValue={chipStatus.microchipStatus}
                           />
                           {invalidMicroId && <p className="errorMessage">{invalidMicroId}</p>}
                        </div>
                        <div className="col-12 col-md-6">
                           <RadioInput
                              label="Pre Existing Condition(s)"
                              radioName="preconditionStatus"
                              extraInput={true}
                              name="preExistingCondition"
                              value={preExistingCondition}
                              extraInputPlaceholder="Pre Existing Condition(s)"
                              onChange={handlePetBasicInfo}
                              radioStatus={(name, status) => handleChipStatus(name, status)}
                              onBlur={checkPreConditionValidation}
                              checkdropDownsvalid={() => validatePetGender()}
                              statusValue={chipStatus.preconditionStatus}

                           />
                           {invalidPreCondition && <p className="errorMessage">{invalidPreCondition}</p>}
                        </div>
                        <div className="col-12 col-md-6 order-12 order-md-1">
                           <RadioInput
                              label="Neutered"
                              radioName="neuteredStatus"
                              extraInput={false}
                              onChange={handlePetBasicInfo}
                              radioStatus={(name, status) => handleChipStatus(name, status)}
                              checkdropDownsvalid={() => validatePetGender()}
                              statusValue={chipStatus.neuteredStatus}

                           />
                        </div>
                        {chipStatus.preconditionStatus === 'yes' && (
                           <div className="col-12 col-md-6 order-1 order-md-12">
                              <UploadDocs
                                 uploadInputId="uploadSupportingDoc"
                                 boxWidth={'140px'}
                                 labelWeb="Upload / Drag and Drop supporting document"
                                 labelMob="Upload Supporting Document"
                                 checkUploadedFile={url => handleSupportingDoc(url)}
                              />
                           </div>
                        )}
                     </div>
                     <div className="row">
                        <div className="col-12">
                           <PromoCode />
                        </div>
                     </div>
                  </div>
               )}
               <div className="row">
                  <div className="col-12 text-center" style={{ paddingTop: '40px' }}>
                     {isallInputs && (
                        <p className="errorMessage text-center">
                           Note: Please provide all the required information to continue.
                        </p>
                     )}
                  </div>
               </div>

               {/* <button
               onClick={e => {
                  e.preventDefault();
                  stepZeroAccept(true);
               }}
            >
               Submit
            </button> */}
            </form>
         </div>
      </div>
   );
};

export default RequestQuote;
