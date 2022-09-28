import React, { useState } from 'react';

const SelectField = ({ option, title, name, value, onChange, onBlur }) => {
   // const [selectedOption, setSelectedOption] = useState([]);

   // function handleSelectChange(event) {
   //    setSelectedOption(event.target.value);
   // }

   // keep option 1 as selected by writing option[0].value in useState
   return (
      <div className="selectFields form-group">
         <select
            className="form-control"
            value={value}
            name={name}
            onChange={onChange}
            onBlur={onBlur}
            onKeyUp={onBlur}
            onClick={onBlur}
         >
            <option value="" disabled>
               {title}
            </option>

            {option
               ?.sort((a, b) => (a.name > b.name ? 1 : -1))
               ?.map((opt, index) => (
                  <option key={index} value={opt.id}>
                     {opt.name}
                  </option>
               ))}
         </select>
      </div>
   );
};
export default SelectField;
