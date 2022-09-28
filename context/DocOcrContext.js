import React, { useState, createContext } from 'react';
export const DocOcrContext = createContext();
export const DocOcrProvider = props => {
   const [ocrReceivables, setOcrReceivables] = useState('');

   const [ocrError, setOcrError] = useState('');
   return (
      <>
         <DocOcrContext.Provider
            value={{
               OcrDatas: [ocrReceivables, setOcrReceivables],
               OcrErrors: [ocrError, setOcrError],
            }}
         >
            {props.children}
         </DocOcrContext.Provider>
      </>
   );
};
