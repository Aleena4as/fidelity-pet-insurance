import React, { useState, createContext } from 'react';
export const EmiratesIdContext = createContext();

export const EmiratedIdProvider = props => {
   const [emiratesID, setEmiratesID] = useState({
      emiratesIdFrontPage: '',
      emiratesIdBackPage: '',
   });

   const [isConfirmed, setIsConfirmed] = useState(false);
   const [clearDocsFromUpload, setClearDocsFromUpload] = useState(false);


   const handleChange = (emiratesID, url) => {
      setEmiratesID(prev => ({
         ...prev,
         [emiratesID]: url,
      }));
   };

   return (
      <>
         <EmiratesIdContext.Provider
            value={{
               emiratesID,
               handleChange,
               isConfirmed,
               setIsConfirmed,
               clearDocsFromUpload,
               setClearDocsFromUpload,
            }}
         >
            {props.children}
         </EmiratesIdContext.Provider>
      </>
   );
};
