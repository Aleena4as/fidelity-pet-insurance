import React, { useState, createContext } from 'react';
export const StepperContext = createContext();
export const StepperProvider = props => {
   const [firstNextButtonStatus, setFirstNextButtonStatus] = useState(false);
   const [secondNextButtonStatus, setSecondNextButtonStatus] = useState(false);
   const [thirdNextButtonStatus, setThirdNextButtonStatus] = useState(false);
   const [fourthNextButtonStatus, setFourthButtonStatus] = useState(false);



   return (
      <>
         <StepperContext.Provider
            value={{
               stepfirst: [firstNextButtonStatus, setFirstNextButtonStatus],
               stepSecond: [secondNextButtonStatus, setSecondNextButtonStatus],
               stepThird: [thirdNextButtonStatus, setThirdNextButtonStatus],
               stepFourth: [fourthNextButtonStatus, setFourthButtonStatus],
            }}
         >
            {props.children}
         </StepperContext.Provider>
      </>
   );
};
