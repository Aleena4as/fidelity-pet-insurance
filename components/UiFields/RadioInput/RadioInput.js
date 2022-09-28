import React, { useState, useEffect } from 'react';
import InputField from '@/components/UiFields/InputField/InputField';
import { BasicInfoContext } from '@/context/BasicInfoContext';

// import "./styles.css";

const RadioInput = ({
   label,
   radioName,
   extraInput,
   name,
   value,
   extraInputPlaceholder,
   onChange,
   radioStatus,
   disabled,
   onBlur,
   checkdropDownsvalid,
   maxLength,
   statusValue
}) => {
   const [checkedstatus, setcheckedStatus] = useState(true);

   const getRadioStatus = event => {
      radioStatus(event.target.name, event.target.value);
      setcheckedStatus(event.target.value === 'yes' ? true : false);
      checkdropDownsvalid?.();
   };
   useEffect(() => {
      setcheckedStatus(statusValue === 'yes' ? true : false);
   }, []);

   return (
      <>
         <label>{label}</label>
         <div className="radio-btn-container">
            <div className="radio-btn">
               <input
                  id={radioName + 1}
                  type="radio"
                  value="yes"
                  name={radioName}
                  // defaultChecked
                  onClick={getRadioStatus}
                  onBlur={onBlur}
                  checked={checkedstatus ? true : false}
               />
               <label htmlFor={radioName + 1}>Yes</label>
            </div>
            <div className="radio-btn">
               <input
                  id={radioName + 2}
                  type="radio"
                  value="no"
                  name={radioName}
                  onClick={getRadioStatus}
                  onBlur={onBlur}
                  checked={!checkedstatus ? true : false}
               />
               <label htmlFor={radioName + 2}>No</label>
            </div>
         </div>
         {extraInput && checkedstatus && (
            <>
               <div className="inputArrow">
                  <img src="images/version2/inputArrow.svg" alt="" />
               </div>
               <InputField
                  value={value}
                  name={name}
                  placeholder={extraInputPlaceholder}
                  type="text"
                  onChange={onChange}
                  disabled={disabled}
                  onBlur={onBlur}
                  maxLength={maxLength}
               />
            </>
         )}
      </>
   );
};
export default RadioInput;
