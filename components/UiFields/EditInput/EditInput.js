import React, { useState } from 'react';

const EditInput = ({ value, label, name, placeholder, type, onChange, onKeyUp, maxlength, options }) => {
   const [inputBoxToEdit, setInputBoxToEdit] = useState('');
   const openEditInput = event => {
      setInputBoxToEdit('');
      setInputBoxToEdit(event.target.dataset.label);
   };

   return (
      <div className="selectFields form-group editInput">
         {<label>{label}</label>}
         {type === 'text' && (
            <input
               type={type}
               value={value}
               name={name}
               className="form-control"
               placeholder={placeholder}
               onChange={e => {
                  onChange(e);
                  onKeyUp(e);
               }}
               onBlur={e => setInputBoxToEdit('')}
               onKeyUp={e => {
                  onKeyUp(e);
                  setInputBoxToEdit('');
               }}
               maxlength={maxlength}
            />
         )}
         {type === 'select' && (
            <select
               className="selectFields form-control"
               value={value}
               name={name}
               onChange={e => {
                  onChange(e);
                  onKeyUp(e);
               }}
               onBlur={e => {
                  setInputBoxToEdit('');
                  onChange(e);
                  onKeyUp(e);
               }}
               onKeyUp={e => {
                  onKeyUp(e);
                  setInputBoxToEdit('');
               }}
               onClick={e => {
                  onKeyUp(e);
                  setInputBoxToEdit('');
               }}
            >
               <option value="" selected disabled>
                  {placeholder}
               </option>

               {options
                  ?.sort((a, b) => (a.name > b.name ? 1 : -1))
                  ?.map((opt, index) => (
                     <option key={index} value={opt.id}>
                        {opt.name}
                     </option>
                  ))}
            </select>
         )}
      </div>
   );
};

export default EditInput;
