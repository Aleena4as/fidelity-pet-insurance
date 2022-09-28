import React, { useState, useEffect } from 'react';
// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
const AccordionItem = ({ title, info, li }) => {
   const [expanded, setExpanded] = useState(false);

   return (
      <div className={`question ${expanded ? 'expandedQuestion' : ''} `}>
         <header onClick={() => setExpanded(!expanded)}>
            <p className="question-title">{title}</p>
            <button className="accordionBtn" onClick={() => setExpanded(!expanded)}>
               {expanded ? (
                  <img src="images/version2/accordionMinus.svg" />
               ) : (
                  <img src="images/version2/accordionPlus.svg" />
               )}
            </button>
         </header>
         {expanded && (
            <>
               {info.split('\n').map((val, key) => (
                  <p className="answer">{val}</p>
               ))}
               {li && (
                  <ul>
                     {li.split('|').map((val, key) => (
                        <li key={key} className="answer">
                           <strong>*</strong>
                           {val}
                        </li>
                     ))}
                  </ul>
               )}
            </>
         )}
      </div>
   );
};

export default AccordionItem;
