import React, { useState, createContext } from 'react';
export const LeadsContext = createContext();
export const LeadsProvider = props => {
   const [leadsInputValues, setLeadsInputValues] = useState('');
   const [petMLValues, setPetMLValues] = useState('');
   const [basicPetValues, setBasicPetValues] = useState('');
   const [optionStatus, setOptionStatus] = useState('');
   const [chipIdValues, setChipValues] = useState('');
   const [preConditionValues, setPreConditionValues] = useState('');
   const [neuteredValues, setNeuteredValues] = useState('');
   const [supportingFile, setSupportingFile] = useState('');
   const [microStatus, setMicroStatus] = useState('');
   const [preStatus, setPreStatus] = useState('');
   const [neuteredStatus, setNeuteredStatus] = useState('');
   const [leadsError, setLeadsError] = useState('');
  

   return (
      <>
         <LeadsContext.Provider
            value={{
               leadPost: [leadsInputValues, setLeadsInputValues],
               mLPost: [petMLValues, setPetMLValues],
               petBasicPost: [basicPetValues, setBasicPetValues],
               conditionOptions: [optionStatus, setOptionStatus],
               statusChip: [chipIdValues, setChipValues],
               statusPre: [preConditionValues, setPreConditionValues],
               statusNeutured: [neuteredValues, setNeuteredValues],
               supportPre: [supportingFile, setSupportingFile],
               status1: [microStatus, setMicroStatus],
               status2: [preStatus, setPreStatus],
               status3: [neuteredStatus, setNeuteredStatus],
               errorOnLead: [leadsError, setLeadsError],
            }}
         >
            {props.children}
         </LeadsContext.Provider>
      </>
   );
};
