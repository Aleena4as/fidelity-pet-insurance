import { useState, useRef, useEffect, Fragment } from 'react';
import Stepper from './Stepper';
import RequestQuote from '@/components/RequestQuote/RequestQuote';
import SelectPlan from '@/components/SelectPlan/SelectPlan';
import QuickQuote from '@/components/QuickQuote/QuickQuote';
import Payment from '@/components/Payment/Payment';

const ContentStepper = ({ scrollToParentDiv }) => {
   const [goNext, setGoNext] = useState(null);

   const stepZeroAccept = stepstatus => {
      // console.log(stepstatus);
      setGoNext(stepstatus);
      zeroTermsHandler(stepstatus);
   };

   const [acceptZeroTerms, setAcceptZeroTerms] = useState({
         checked: false,
         touched: false,
      }),
      [acceptFirstTerms, setAcceptFirstTerms] = useState({
         checked: false,
         touched: false,
      }),
      [acceptSecondTerms, setAcceptSecondTerms] = useState({
         checked: false,
         touched: false,
      }),
      [acceptThirdTerms, setAcceptThirdTerms] = useState({
         checked: false,
         touched: false,
      }),
      [isStepLoading, setIsStepLoading] = useState(false);

   const [isStepperSubmitted, setisStepperSubmitted] = useState(false);

   const zeroTermsHandler = status => {
      setAcceptZeroTerms(prev => ({ checked: status, touched: true }));
   };

   const firstTermsHandler = status => {
      setAcceptFirstTerms(prev => ({ checked: status ? status : !prev.checked, touched: true }));
   };

   const secondTermsHandler = status => {
      setAcceptSecondTerms(prev => ({ checked: status ? status : !prev.checked, touched: true }));
   };

   const thirdTermsHandler = status => {
      setAcceptThirdTerms(prev => ({ checked: status ? status : !prev.checked, touched: true }));
   };

   //for demo purposes only
   const timeout = ms => {
      return new Promise(resolve => setTimeout(resolve, ms));
   };

   const waitStepAsyncFunc = async () => {
      //it can be an API call
      setIsStepLoading(true);
      await timeout(3000);
      setIsStepLoading(false);
      // console.log('second step clicked');
   };

   const stepperContent = [
      {
         label: 'Request Quote',
         content: (
            <div>
               <RequestQuote stepZeroAccept={zeroTermsHandler} />
               <label>
                  {/* <input
							type="checkbox"
							checked={acceptZeroTerms.checked}
							onChange={zeroTermsHandler}
						/> */}
               </label>
            </div>
         ),
         isError: !acceptZeroTerms.checked && acceptZeroTerms.touched,
         isComplete: acceptZeroTerms.checked,
      },
      {
         label: 'Select Plan',
         content: (
            <div>
               <SelectPlan stepFirstAccept={firstTermsHandler} />
               <label>
                  {/* <input
							type="checkbox"
							checked={acceptFirstTerms.checked}
							onChange={firstTermsHandler}
						/>
						*/}
               </label>
            </div>
         ),
         isError: !acceptFirstTerms.checked && acceptFirstTerms.touched,
         isComplete: acceptFirstTerms.checked,
      },
      {
         label: 'Quick Quote',
         content: (
            <div>
               <QuickQuote stepSecondAccept={secondTermsHandler} />
               <label>
                  {/* <input
                     type="checkbox"
                     checked={acceptSecondTerms.checked}
                     onChange={secondTermsHandler}
                  />
                 */}
               </label>
            </div>
         ),

         isError: !acceptSecondTerms.checked && acceptSecondTerms.touched,
         isComplete: acceptSecondTerms.checked,
      },
      {
         label: 'Payment',
         content: (
            <div>
               <Payment stepThirdAccept={thirdTermsHandler} />
               <label>
                  {/* <input
                     type="checkbox"
                     checked={acceptThirdTerms.checked}
                     onChange={thirdTermsHandler}
                  />
                  Accept third */}
               </label>
            </div>
         ),
         clicked: () => waitStepAsyncFunc(),
         isLoading: isStepLoading,
         isError: !acceptThirdTerms.checked && acceptThirdTerms.touched,
         isComplete: acceptThirdTerms.checked,
      },
   ];

   const submitStepper = () => {
      // console.log('submitted');
      // setisStepperSubmitted(true)
      // if (isStepperSubmitted) {
      // 	return true;
      // }
      // onClick = setAcceptThirdTerms(true);
   };

   return (
      <div className="container fidelity-container">
         <Stepper stepperContent={stepperContent} submitStepper={submitStepper} scrollToParentDiv={scrollToParentDiv} />
      </div>
   );
};
export default ContentStepper;
