import React, { useState, createContext } from 'react';
export const DetectionContext = createContext();
export const DetectionProvider = props => {
   const [petUploaded, setPetUploaded] = useState(false);
   const [imageUrlLocal, setImageUrlLocal] = useState('');
   const [breedFinal, setBreedFinal] = useState('');
   const [typeFinal, setTypeFinal] = useState('');
   return (
      <>
         <DetectionContext.Provider
            value={{
               MLDetails: [petUploaded, setPetUploaded],
               localImage: [imageUrlLocal, setImageUrlLocal],
               finalML: [breedFinal, setBreedFinal, typeFinal, setTypeFinal],
            }}
         >
            {props.children}
         </DetectionContext.Provider>
      </>
   );
};
