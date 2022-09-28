import React, { useState, useEffect } from 'react';

const RadioImage = ({ typefromDB, getUserUpdatedType, option, getBreedOptions, alteredPredictedType }) => {
   const [selectedtype, setSelectedtype] = useState(typefromDB);
   useEffect(() => {
      setSelectedtype(typefromDB);
   }, [typefromDB]);

   const checkTypeFromDBAndUser = () => {
      if (typefromDB !== selectedtype) {
         alteredPredictedType(true);
         // console.log('Having Pet type change', typefromDB, selectedtype);
      } else {
         alteredPredictedType(false);
      }
   };

   useEffect(() => {
      checkTypeFromDBAndUser();
   }, [typefromDB, selectedtype]);

   return (
      <>
         <div className="optionWithImage">
            {option?.map((opt, index) => (
               <div
                  key={index}
                  className={`imageOption ${selectedtype === opt.id ? 'selectedBox' : ''}`}
                  onClick={e => {
                     setSelectedtype(opt.id);
                     getUserUpdatedType(opt.id);
                     getBreedOptions(opt.id);
                  }}
               >
                  {opt.name === 'Cat' ? (
                     <img src="images/version2/breedCat.svg" alt="" />
                  ) : (
                     <img src="images/version2/breedDog.svg" alt="" />
                  )}
                  <p>{opt.name}</p>
               </div>
            ))}
         </div>
      </>
   );
};

export default RadioImage;
