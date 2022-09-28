import React, { useState, createContext } from 'react';
export const GeneratedIDsContext = createContext();
export const GeneratedIDsProvider = props => {
   const [leadID, setLeadID] = useState('');
   const [quoteID, setQuoteID] = useState('');
   const [planID, setPlanID] = useState('');
   return (
      <>
         <GeneratedIDsContext.Provider
            value={{
               generatedLeadID: [leadID, setLeadID],
               generatedQuoteID: [quoteID, setQuoteID],
               generatedPlanID: [planID, setPlanID],
            }}
         >
            {props.children}
         </GeneratedIDsContext.Provider>
      </>
   );
};
