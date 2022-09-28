import React, { useState, createContext } from 'react';
export const BasicInfoContext = createContext();
export const BasicInfoProvider = props => {
   const [leadInfo, setLeadInfo] = useState({
      holderName: '',
      holderDob: 'yes',
      holderMobile: '',
      holderEmail: '',
      holderEmirate: '',
   });
   const { holderName, holderDob, holderMobile, holderEmail, holderEmirate } = leadInfo;

   const [basicPetInfo, setBasicPetInfo] = useState({
      petName: '',
      petDob: '',
      petGender: '',
      petAge: '',
      microchipped: '',
      preExistingCondition: '',
      neutered: '',
   });
   const { petName, petDob, petGender, petAge, microchipped, preExistingCondition, neutered } = basicPetInfo;

   const [detectPetInfo, setDetectPetInfo] = useState({
      petImage: '',
      petType: '',
      petBreed: '',
   });
   const { petImage, petType, petBreed } = detectPetInfo;

   const [startDate, setStartDate] = useState('');
   const [petstartDate, setPetStartDate] = useState('');

   const [chipStatus, setChipStatus] = useState({
      microchipStatus: 'yes',
      preconditionStatus: 'yes',
      neuteredStatus: 'yes',
   });
   const handleChipStatus = (name, status) => {
      // console.log(name, status);
      setChipStatus(prev => ({
         ...prev,
         [name]: status,
      }));
   };

   // console.log(leadInfo, '==holderDob');
   // console.log(detectPetInfo, '==detectPetInfo');
   // console.log(chipStatus, '==chipStatus');

   const [checkedstatus, setcheckedStatus] = useState(true);
   const [supportingDoc, setSupportingDoc] = useState('');
   const handleSupportingDoc = url => {
      setSupportingDoc(url);
   };

   const [detectedBreedsList, setDetectedBreedsList] = useState([]);
   const [storeBreedListToToggle, setStoreBreedListToToggle] = useState([]);

   return (
      <>
         <BasicInfoContext.Provider
            value={{
               leadContents: [holderName, holderDob, holderMobile, holderEmail, holderEmirate, leadInfo, setLeadInfo],
               petsContents: [
                  petName,
                  petDob,
                  petGender,
                  petAge,
                  microchipped,
                  preExistingCondition,
                  neutered,
                  basicPetInfo,
                  setBasicPetInfo,
               ],
               detectContents: [petImage, petType, petBreed, detectPetInfo, setDetectPetInfo],
               birthDates: [petstartDate, setPetStartDate, startDate, setStartDate],
               chipContents: [chipStatus, setChipStatus, handleChipStatus],
               radioStatusContents: [checkedstatus, setcheckedStatus],
               conditionsDoc: [supportingDoc, setSupportingDoc, handleSupportingDoc],
               listofDetectedBreed: [
                  detectedBreedsList,
                  setDetectedBreedsList,
                  storeBreedListToToggle,
                  setStoreBreedListToToggle,
               ],
            }}
         >
            {props.children}
         </BasicInfoContext.Provider>
      </>
   );
};
