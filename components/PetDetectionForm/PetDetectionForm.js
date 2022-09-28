import React, { useState, useEffect, useContext } from 'react';
import RadioImage from '@/components/UiFields/RadioImage/RadioImage';
import InputField from '@/components/UiFields/InputField/InputField';
import FormTitle from '@/components/Titles/FormTitle/FormTitle';
import SelectField from '@/components/UiFields/SelectField/SelectField';
import axios from '@/utils/request';
import Loader from '@/components/Loader/Loader';
import { BasicInfoContext } from '@/context/BasicInfoContext';
import { DetectionContext } from '@/context/DetectionContext';

const PetDetectionForm = ({
   displayImageSrc,
   getRecognitionInput,
   getUserUpdatedBreed,
   getUserUpdatedType,
   option,
   localFileUpload,
}) => {
   const [loader, setLoader] = useState(false);

   const detectionApi = '/pet-ml';
   const breedListApi = '/breed-list';

   // detection context begins here
   const { MLDetails, localImage, finalML } = useContext(DetectionContext);
   const [petUploaded, setPetUploaded] = MLDetails;
   const [imageUrlLocal, setImageUrlLocal] = localImage;
   // const [breedFinal, setBreedFinal, typeFinal, setTypeFinal] = finalML;
   // detection context ends here

   // context basic info of leads and pets begins here
   const { leadContents, petsContents, detectContents, listofDetectedBreed } = useContext(BasicInfoContext);
   const [petImage, petType, petBreed, detectPetInfo, setDetectPetInfo] = detectContents;
   const [detectedBreedsList, setDetectedBreedsList, storeBreedListToToggle, setStoreBreedListToToggle] =
      listofDetectedBreed;
   // context basic info of leads and pets ends here

   const [manualBreedOptions, setManualBreedOptions] = useState([]);
   const [errorBreedOptions, setErrorBreedOptions] = useState('');

   const [recognizingError, setRecognizingError] = useState('');
   const [petImgFromDB, setPetImgFromDB] = useState(petImage);
   const [petTypeFromDB, setPetTypeFromDB] = useState(petType);
   const [petBreedsFromDB, setPetBreedsFromDB] = useState(petBreed);

   const [breedFromUser, setBreedFromUser] = useState('');
   const [typeFromUser, setTypeFromUser] = useState('');

   const [breedBoxSelected, setBreedBoxSelected] = useState(0);
   const [invalidBreed, setInvalidBreed] = useState('');

   const [changeInPredictedType, setChangeInPredictedType] = useState(false);

   const checkBreedError = () => {
      setInvalidBreed('');
      if (!petBreed) {
         setInvalidBreed('Please select a breed');
      } else {
         setInvalidBreed('');
      }
   };

   const handleBreed = e => {
      setBreedFromUser(e.target.value); //when user chooses others option or manual option
      getUserUpdatedBreed(e.target.value);
   };
   const handleBreedOptionChange = breed => {
      setBreedFromUser(breed); //when choosen within the predicted option
      getUserUpdatedBreed(breed);
   };
   const handlebreedTypeByUser = type => {
      setTypeFromUser(type); //when user changes the pet type other than predicted
      // getUserUpdatedType(type);
   };

   useEffect(() => {
      if (changeInPredictedType) {
         setBreedFromUser(''); //clear manual option input when type is changed
         handleBreedOptionChange(''); //clear value of previously selected input
         setDetectedBreedsList('');
      } else {
         setDetectedBreedsList(storeBreedListToToggle);
         getRecognitionInput(petImgFromDB, petTypeFromDB, petBreedsFromDB); //selecting back the first breed when the use click back the predicted type again
      }
   }, [changeInPredictedType]);

   const postPetImage = displayImageSrc => {
      const formData = new FormData();
      formData.append('pet_image', displayImageSrc);

      axios({
         url: detectionApi,
         method: 'POST',
         data: formData,
      })
         .then(response => {
            if (response.status === 200) {
               setPetImgFromDB(response.data.data.pet_image_url);
               setPetTypeFromDB(response.data.data.pet_type);
               setPetBreedsFromDB(response.data.data.predict_pet_breed[0].id);
               setDetectedBreedsList([...response.data.data.predict_pet_breed]);
               setStoreBreedListToToggle([...response.data.data.predict_pet_breed]); //storing for toggling the list when the use change the type
               getBreedOptions(response.data.data.pet_type); //from Api for manual breeds entry
               if (!response.data.data) {
                  setRecognizingError('We are unable to detect your pet. Please re-upload another image to continue.');
               }
            }
         })
         .catch(error => {
            setRecognizingError('We are unable to detect your pet. Please re-upload another image to continue.');
         });
   };

   const timeout = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
   };
   const sceenLoader = async () => {
      setLoader(true);
      await timeout(6000);
      setLoader(false);
   };
   useEffect(() => {
      if (displayImageSrc) {
         postPetImage(displayImageSrc);
         sceenLoader();
      }
   }, [displayImageSrc]);

   useEffect(() => {
      setInvalidBreed('');

      if (petImgFromDB) {

         getRecognitionInput(petImgFromDB, petTypeFromDB, petBreedsFromDB);
      }
   }, [petImgFromDB, petTypeFromDB, petBreedsFromDB]);

   useEffect(() => {
      checkBreedError();
   }, [breedFromUser]);

   // get all breeds
   const getBreedOptions = speciesId => {
      axios(breedListApi, {
         method: 'GET',
         params: {
            species_id: speciesId,
         },
      })
         .then(response => {
            if (response.status === 200) {
               // console.log('capture details', response.data);
               setManualBreedOptions([...response.data.data]);
            }
         })
         .catch(error => {
            if (error.response.status === 401) {
               setErrorBreedOptions(error.response.data.message);
            }
         });
   };

   return (
      <>
         <div className="recognitionForm">
            <div className="row">
               <div className="col-12">
                  <FormTitle title="Image is recognizing"></FormTitle>
               </div>
            </div>
            {loader ? (
               <Loader statusTitle="Uploading" />
            ) : (
               <>
                  <div className="row">
                     <div className="col-12 col-md-6">
                        <div id="petBoxOverlay">
                           <img src="" alt="" />
                           <div className="detectedPetBox">
                              <img src={imageUrlLocal} alt="" />
                              <div className="reUpload" onClick={localFileUpload}>
                                 <p>Click to Re-Upload </p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  {recognizingError && (
                     <div className="row">
                        <div className="col-12">
                           <p className="errorMessage">{recognizingError}</p>
                        </div>
                     </div>
                  )}
                  {!recognizingError && (
                     <div className="row">
                        <div className="col-12">
                           <FormTitle title="Your pet’s breed is"></FormTitle>
                        </div>
                        <div className="col-12 col-md-6">
                           <label>Pet Type</label>
                           <RadioImage
                              typefromDB={petTypeFromDB}
                              breedTypeByUser={handlebreedTypeByUser}
                              getUserUpdatedType={getUserUpdatedType}
                              option={option}
                              getBreedOptions={getBreedOptions} //from Api for manual breeds entry
                              alteredPredictedType={stat => setChangeInPredictedType(stat)}
                           />
                        </div>
                        <div className="col-12 col-md-6">
                           <label>Pet Breed</label>

                           <div className="recievedOpts">
                              {detectedBreedsList &&
                                 detectedBreedsList?.map((breeds, index) => (
                                    <div
                                       key={index}
                                       className={`breedOpions custom ${breedBoxSelected === index ? 'active' : ''}`}
                                       onClick={e => {
                                          setBreedBoxSelected(index);
                                          // setBreedFromUser(''); //clear value in others
                                          handleBreedOptionChange(breeds.id);
                                       }}
                                    >
                                       <p>{breeds.desc}</p>
                                    </div>
                                 ))}

                              <div
                                 className={`breedOpions customBreed ${
                                    breedBoxSelected === 'others' ? 'customActive' : ''
                                 }`}
                                 onClick={e => {
                                    setBreedBoxSelected('others');
                                    // setBreedFromUser(''); //clear value in others input field
                                    // handleBreedOptionChange(''); //clear the breeds slected from the options to allow manual entry
                                 }}
                              >
                                 <SelectField
                                    title="Select Breed"
                                    option={manualBreedOptions}
                                    value={breedFromUser}
                                    name="breedFromUser"
                                    onChange={handleBreed}
                                    onBlur={checkBreedError}
                                 />

                                 <div
                                    className="breedCustomOverlay"
                                    style={{ display: `${breedBoxSelected === 'others' ? 'none' : 'block'}` }}
                                    onClick={() => {
                                       setBreedBoxSelected('others');
                                       setBreedFromUser(''); //clear value in others input field
                                       handleBreedOptionChange('');
                                       checkBreedError();
                                    }} //clear the breeds selected from the options to allow manual entry
                                 >
                                    <div className="overlaybg">
                                       <img src="images/version2/accordionPlus.svg" alt="" />
                                       <p className="otherOptions">Others</p>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           {invalidBreed && (
                              <p className="errorMessage breedError" style={{ marginLeft: '10px' }}>
                                 {invalidBreed}
                              </p>
                           )}
                        </div>
                     </div>
                  )}
               </>
            )}
         </div>
      </>
   );
};

export default PetDetectionForm;
