import { useContext } from 'react';
import PropTypes from 'prop-types';
import { SpinContext } from '@/context/SpinContext';
import Spin from '@/components/Spin/Spin';

const StepperFooter = ({
   isPrevBtn,
   previousStepHandler,
   isLastStep,
   nextStepHandler,
   submitHandler,
   stepperContent,
   currentTabIndex,
}) => {
   // spinner context begins here
   const { spinstatus } = useContext(SpinContext);
   const [spin, setSpin] = spinstatus;
   // spinner context ends here
   const submitCurrentStep = async () => {
      await stepperContent[currentTabIndex].clicked();
      nextStepHandler();
   };

   return (
      <>
         {/* check is it the last step , if so then remove ignore the button footer(is the logic applied) */}
         {!isLastStep ? (
            <div
               className="stepper-footer"
               style={{ justifyContent: currentTabIndex === 2 ? 'flex-end' : isPrevBtn ? 'space-between' : 'flex-end' }}
            >
               {isPrevBtn && !(currentTabIndex === 2) && (
                  <button type="button" className="stepper-footer-btn btn-back" onClick={previousStepHandler}>
                     Back
                  </button>
               )}
               <button
                  type="button"
                  className={`stepper-footer-btn ${isLastStep ? 'success' : 'primary'}`}
                  onClick={
                     isLastStep
                        ? submitHandler
                        : stepperContent[currentTabIndex].clicked
                        ? submitCurrentStep
                        : nextStepHandler
                  }
                  disabled={
                     (isLastStep
                        ? stepperContent.some(el => !el.isComplete)
                        : !stepperContent[currentTabIndex].isComplete) || stepperContent[currentTabIndex].isLoading
                  }
               >
                  {spin ? <Spin /> : isLastStep ? 'Submit' : currentTabIndex === 2 ? 'Buy Policy' : 'Next'}
               </button>
            </div>
         ) : null}
      </>
   );
};

StepperFooter.propTypes = {
   isPrevBtn: PropTypes.bool,
   previousStepHandler: PropTypes.func.isRequired,
   isLastStep: PropTypes.bool,
   nextStepHandler: PropTypes.func.isRequired,
   submitHandler: PropTypes.func.isRequired,
   currentTabIndex: PropTypes.number.isRequired,
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
};
export default StepperFooter;
