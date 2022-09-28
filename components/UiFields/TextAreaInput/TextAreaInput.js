import React from 'react';

const TextAreaInput = ({ label, rows, placeholder, onChange, maxlength }) => {
   return (
      <div>
         <div className="form-group textareaCustom">
            {label && <label>{label}</label>}
            <textarea
               className="form-control"
               tabindex="-1"
               rows={rows}
               placeholder={placeholder}
               onChange={onChange}
               maxlength={maxlength}
            ></textarea>
         </div>
      </div>
   );
};

export default TextAreaInput;
