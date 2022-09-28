const InputField = ({ value, label, name, placeholder, type, onChange, disabled, onBlur, maxLength }) => (
   <div className="form-group">
      {label && <label>{label}</label>}
      <input
         type={type}
         value={value}
         name={name}
         className="form-control"
         placeholder={placeholder}
         onChange={onChange}
         onBlur={onBlur}
         onKeyUp={onBlur}
         disabled={disabled ? true : false}
         autoComplete="off"
         maxLength={maxLength}
      />
   </div>
);

export default InputField;
