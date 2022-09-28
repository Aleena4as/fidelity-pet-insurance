import { useState, useRef, useEffect, Fragment } from 'react';
// const { useState, useRef, useEffect, Fragment } = React;
import PropTypes from 'prop-types';

const Step = ({
   indicator,
   label,
   navigateToStepHandler,
   index,
   isActive,
   isComplete,
   isWarning,
   isError,
   isRightToLeftLanguage,
}) => {
   let classes = [''];

   if (isActive) {
      classes.push('is-active');
   }
   if (isComplete) {
      classes.push('is-complete');
   }
   if (isWarning) {
      classes.push('is-warning');
   }
   if (isError) {
      classes.push('is-error');
   }
   if (isRightToLeftLanguage) {
      classes.push('rightToLeft');
   }

   return (
      <div className={`stepper-step ${classes.join(' ')}`}>
         <div className="stepper-indicator">
            <span
               className="stepper-indicator-info"
               // onClick={isComplete || isError ? () => navigateToStepHandler(index) : null}
            >
               {isComplete ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                     <path
                        d="M2.18823 9.52471C0.553267 11.0662 -0.443279 6.69079 0.195134 5.36725C0.646693 4.41742 1.36296 4.57313 1.65881 5.80324C1.76781 6.2548 1.64324 7.00221 2.18823 7.01778L6.67268 2.72017C10.0672 -0.534172 12.6208 -0.549743 10.3474 1.00736C8.35435 2.37761 6.26784 4.8534 2.18823 9.50914V9.52471Z"
                        fill="white"
                     />
                  </svg>
               ) : (
                     null
                  // indicator // shows step number
               )}
            </span>
         </div>
         <div className="stepper-label">{label}</div>
      </div>
   );
};

Step.propTypes = {
   indicator: PropTypes.oneOfType([PropTypes.node, PropTypes.number]),
   label: PropTypes.string.isRequired,
   navigateToStepHandler: PropTypes.func.isRequired,
   index: PropTypes.number.isRequired,
   isActive: PropTypes.bool,
   isComplete: PropTypes.bool,
   isError: PropTypes.bool,
   isWarning: PropTypes.bool,
   isRightToLeftLanguage: PropTypes.bool,
};

export default Step;
