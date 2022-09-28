import React, { useState, useEffect } from 'react';

const AutoFilledInput = ({ value, name, options, calculatedAge, onChange, disabled }) => {
   const [ageCorresponding, setAgeCorresponding] = useState([]);
   const [ageDefault, setAgeDefault] = useState(true);

   useEffect(() => {
      
      if (!isNaN(calculatedAge)) {
         setAgeDefault(false);

         if (calculatedAge === 0) {
            let getAgeOption = options?.filter(opt => opt.name === 'Between 8 weeks to 1 year');
            setAgeCorresponding(getAgeOption);
         } else if (calculatedAge > 10) {
            let getAgeOption = options?.filter(opt => opt.age === 11);
            setAgeCorresponding(getAgeOption);
         } else {
            let getAgeOption = options?.filter(opt => opt.age === calculatedAge);
            setAgeCorresponding(getAgeOption);
         }
         if (calculatedAge === -1) {
            let getAgeOption = options?.filter(opt => opt.name === 'Less than 8 weeks');
            setAgeCorresponding(getAgeOption);
         }

      }
      if (isNaN(calculatedAge)) {
         setAgeDefault(true);
      }

      onChange(ageCorresponding[0]?.id);
   }, [calculatedAge, ageDefault]);

   useEffect(() => {
      onChange(ageCorresponding[0]?.id);
   }, [ageCorresponding]);

   return (
      <div className=" form-group">
         <select className="form-control" value={value} name={name} disabled={disabled}>
            {!ageDefault ? (
               ageCorresponding?.map((opt, index) => (
                  <option key={index} value={opt.id}>
                     {opt.name}
                  </option>
               ))
            ) : (
               <option value="" selected disabled>
                  Pet Age
               </option>
            )}
         </select>
      </div>
   );
};

export default AutoFilledInput;
