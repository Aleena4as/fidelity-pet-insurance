import { useState, useRef, useEffect, Fragment, useContext } from 'react';
import StepperHead from './StepperHead';
import StepperFooter from './StepperFooter';
import PropTypes from 'prop-types';
import axios from '@/utils/request';
import { LeadsContext } from '@/context/LeadsContext';
import { StepperContext } from '@/context/StepperContext';
import { GeneratedIDsContext } from '@/context/GeneratedIDsContext';
import { SpinContext } from '@/context/SpinContext';
import { TabIndexContext } from '@/context/TabIndexContext';
import { PlanContext } from '@/context/PlanContext';
import AlertPage from '../AlertPage/AlertPage';
import { PromoCodeContext } from '@/context/PromoCodeContext';

const Stepper = ({ isRightToLeftLanguage, isVertical, isInline, stepperContent, submitStepper, scrollToParentDiv }) => {
   const leadsApi = '/leads';
   const selectPlanApi = '/select-plan';

   // promocode context begins here
   const { promoCodeDetails } = useContext(PromoCodeContext);
   const [promoCode, setPromoCode, promoCodeMessage, setPromoCodeMessage, promoCodeStatus, setPromocodeStatus] = promoCodeDetails;
   //promocode context ends here

   // spinner context begins here
   const { spinstatus } = useContext(SpinContext);
   const [spin, setSpin] = spinstatus;
   // spinner context ends here

   // tabIndex context begnis here
   const { stepperTabIndex } = useContext(TabIndexContext);
   const [currentTabIndex, setCurrentTabIndex] = stepperTabIndex;
   // tabIndex context ends here

   // generatedID context begins here
   const { generatedLeadID, generatedQuoteID, generatedPlanID } = useContext(GeneratedIDsContext);
   const [leadID, setLeadID] = generatedLeadID;
   const [quoteID, setQuoteID] = generatedQuoteID;
   const [planID, setPlanID] = generatedPlanID;
   // generatedID context  ends here

   //stepper context begins here
   const { stepfirst, stepSecond, stepThird, stepFourth } = useContext(StepperContext);
   const [firstNextButtonStatus, setFirstNextButtonStatus] = stepfirst;
   const [secondNextButtonStatus, setSecondNextButtonStatus] = stepSecond;
   const [thirdNextButtonStatus, setThirdNextButtonStatus] = stepThird;
   const [fourthNextButtonStatus, setFourthButtonStatus] = stepFourth;
   //stepper context ends here

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

   const { speciesDetails } = useContext(PlanContext);
   const [speciesID, setSpeciesID] = speciesDetails;

   const [quoteReferral, setQuoteReferral] = useState(true);

   const delayer = async () => {
      await timeout(3000);
   };
   const sendFirstformData = () => {
      // console.log(' final ID values are', microStatus, preStatus, neuteredStatus);
      setLeadsError('');
      const formData = new FormData();
      formData.append('name', leadsInputValues.holderName);
      formData.append('mobile', leadsInputValues.holderMobile);
      formData.append('email', leadsInputValues.holderEmail);
      formData.append('emirate', leadsInputValues.holderEmirate);
      formData.append('dob', leadsInputValues.holderDob);
      formData.append('pet_image', petMLValues.petImage);
      formData.append('pet_breed', petMLValues.petBreed);
      formData.append('pet_type', petMLValues.petType);

      formData.append('pet_name', basicPetValues.petName);
      formData.append('pet_dob', basicPetValues.petDob);
      formData.append('gender', basicPetValues.petGender);
      formData.append('age', basicPetValues.petAge);
      formData.append('microchip_status', microStatus);
      if (basicPetValues.microchipped) {
         formData.append('microchip_number', basicPetValues.microchipped);
      }
      formData.append('pre_existing_status', preStatus);
      formData.append('pre_existing_text', basicPetValues.preExistingCondition);
      formData.append('pre_existing_docs', supportingFile);
      formData.append('neutered_status', neuteredStatus);
      if (promoCode) {
         formData.append('promo_code', promoCode);
      }
      axios({
         url: leadsApi,
         method: 'POST',
         data: formData,
      })
         .then(response => {
            if (response.status === 200) {
               setLeadID(response.data.temp_id);
               setSpeciesID(petMLValues.petType); //to update the plan table in context
               setSpin(false);
            }
            // console.log('done success');
         })
         .catch(error => {
            if (error.response) {
               // console.log('first stepp error reported', error.response.data.message);
               // setLeadsError(error.response.data.message && error.response.data.message);
               setLeadsError(error?.response?.data?.message);
               // setLeadsError('error reported');
               delayer();

               setSpin(false);
            }
         });
      return true;
   };

   const postSelectedPolicy = () => {
      const formData = new FormData();
      formData.append('lead_id', leadID);
      formData.append('plan_id', planID);

      axios(selectPlanApi, {
         method: 'PUT',
         headers: {
            'Content-Type': 'application/json',
         },
         data: formData,
      })
         .then(function (response) {
            if (response.status === 200) {
               setQuoteID(response.data.data.quote_id);
               setQuoteReferral(response.data.data.quick_quote);
               delayer();
               setSpin(false);
            }
         })
         .catch(error => {
            if (error.response.status === 400) {
               setQuoteID(error.response.data.data.quote_id);
               setQuoteReferral(error.response.data.data.quick_quote);
               delayer();
               setSpin(false);
            }
         });
   };

   // const [currentTabIndex, setCurrentTabIndex] = useState(0); //for normal flow from step 1 till end
   const isLastStep = currentTabIndex === stepperContent.length - 1,
      isPrevBtn = currentTabIndex !== 0;

   const navigateToStepHandler = index => {
      if (index !== currentTabIndex) {
         setCurrentTabIndex(index);
      }
   };
   const timeout = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
   };
   const checkFirstTab = async () => {
      const firstFormStatus = sendFirstformData(); //submit first form
      await timeout(3000);
      if (firstFormStatus && !leadsError) {
         setFirstNextButtonStatus(true);
         return true;
      }
      return false;
   };

   const checkSecondTab = async () => {
      const secondFormStatus = postSelectedPolicy(); //submit selected plan
      await timeout(3000);
      if (secondFormStatus && quoteID) {
         setSecondNextButtonStatus(true);
         return true;
      }
      return false;
   };
   const nextStepVisible = () => {
      setCurrentTabIndex(prev => {
         if (prev !== stepperContent.length - 1) {
            return prev + 1;
         }
      });
      scrollToParentDiv(); //to scroll to its section starting on clicking next button
   };

   const nextStepHandler = async () => {
      // console.log('current tab is ', currentTabIndex);
      let tabOne = '';
      let tabSecond = '';
      if (currentTabIndex === 0) {
         setSpin(true);
         await timeout(3000);

         tabOne = checkFirstTab();
      }
      // console.log('spinning for first tab');
      if (tabOne && !spin) {
         nextStepVisible();
      }

      if (currentTabIndex == 1) {
         setSpin(true);
         await timeout(3000);
         tabSecond = checkSecondTab();
      }
      // console.log('spinning for second tab');
      if (tabSecond && !spin) {
         nextStepVisible();
      }

      if (currentTabIndex == 2) {
         setSpin(true);
         await timeout(3000);
         nextStepVisible();
      }
   };

   const previousStepHandler = () => {
      setCurrentTabIndex(prev => prev - 1);
      scrollToParentDiv(); //to scroll to its section starting on clicking back button
   };

   const submitHandler = () => {
      submitStepper();
   };

   return (
      <div className="stepper-wrapper">
         <div style={{ display: isVertical ? 'flex' : 'block' }}>
            <StepperHead
               stepperContent={stepperContent}
               navigateToStepHandler={navigateToStepHandler}
               isVertical={isVertical}
               isInline={isInline}
               currentTabIndex={currentTabIndex}
               isRightToLeftLanguage={isRightToLeftLanguage}
            />
            <div className="stepper-body">
               {leadsError ? (
                  <>
                     <AlertPage
                        note={leadsError}
                        imgSrc="images/version2/cryingDog.png"
                        title="Sorry for Inconvenience!"
                        bg={true}
                        onload={() => {
                           // previousStepHandler();
                        }}
                     />
                  </>
               ) : !quoteReferral ? (
                  <>
                     <AlertPage
                        note={`Your Quote has been referred to our expert team for review. You will be notified soon after the review.  Your  Reference No :${quoteID}`}
                        imgSrc="images/version2/animations/referralStatus.gif"
                        bg={true}
                        onload={() => {
                           // previousStepHandler();
                        }}
                     />
                  </>
               ) : (
                  <>
                     {stepperContent?.map((el, i) => (
                        <Fragment key={i}>{i === currentTabIndex && el.content}</Fragment>
                     ))}
                  </>
               )}
            </div>
         </div>
         {!leadsError && quoteReferral && (
            <StepperFooter
               isPrevBtn={isPrevBtn}
               previousStepHandler={previousStepHandler}
               isLastStep={isLastStep}
               nextStepHandler={nextStepHandler}
               submitHandler={submitHandler}
               stepperContent={stepperContent}
               currentTabIndex={currentTabIndex}
            />
         )}
      </div>
   );
};

Stepper.propTypes = {
   stepperContent: PropTypes.arrayOf(
      PropTypes.shape({
         label: PropTypes.string.isRequired,
         content: PropTypes.node.isRequired,
         clicked: PropTypes.func,
         isWarning: PropTypes.bool,
         isError: PropTypes.bool,
         isComplete: PropTypes.bool,
         isLoading: PropTypes.bool,
      })
   ),
   submitStepper: PropTypes.func.isRequired,
   isInline: PropTypes.bool,
   isVertical: PropTypes.bool,
   isRightToLeftLanguage: PropTypes.bool,
};
export default Stepper;
