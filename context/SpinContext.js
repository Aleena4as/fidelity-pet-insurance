import React, { useState, createContext } from 'react';
export const SpinContext = createContext();
export const SpinProvider = props => {
   const [spin, setSpin] = useState(false);

   // console.log('Spinner Status', spin);

   return (
      <>
         <SpinContext.Provider
            value={{
               spinstatus: [spin, setSpin],
            }}
         >
            {props.children}
         </SpinContext.Provider>
      </>
   );
};
