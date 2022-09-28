import React from "react";

const FormTitle = ({ title, center }) => {
   return (
      <div className="formTitle">
         <p className={`${center ? "text-center" : ""}`}> {title}</p>
      </div>
   );
};

export default FormTitle;
