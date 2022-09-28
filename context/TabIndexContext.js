import React, { useState, createContext } from 'react';
export const TabIndexContext = createContext();
export const TabIndexProvider = props => {
   const [currentTabIndex, setCurrentTabIndex] = useState(0);

   // console.log('firstNextButtonStatus', firstNextButtonStatus);

   return (
      <>
         <TabIndexContext.Provider
            value={{
               stepperTabIndex: [currentTabIndex, setCurrentTabIndex],
            }}
         >
            {props.children}
         </TabIndexContext.Provider>
      </>
   );
};
