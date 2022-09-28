import { useState } from "react";
import DatePicker from "react-datepicker";

const CalendarInput = ({ value, label, name, placeholder, type, onChange }) => {
   const [startDate, setStartDate] = useState("");

   return (
      <div className="form-group">
         {label && <label>{label}</label>}
         {/* <input
         type={type}
         value={value}
         name={name}
         className="form-control calendarInput"
         placeholder={placeholder}
         onChange={onChange}
      /> */}
         <DatePicker
            selected={startDate}
            onChange={(date) => {
               setStartDate(date);
               onChange();
            }}
            dateFormat="yyyy/MM/dd"
            maxDate={new Date()}
            showYearDropdown
            scrollableMonthYearDropdown
            placeholderText={placeholder}
            className=" form-control calendarInput"
            type={type}
            value={value}
            name={name}
            onChange={onChange}
         />
      </div>
   );
};

export default CalendarInput;
