import React, { useState, createContext } from 'react';
export const QuoteOpenContext = createContext();
export const QuoteOpenProvider = props => {
   const [quoteStatusOpen, setQuoteStatusOpen] = useState(false);
   return (
      <>
         <QuoteOpenContext.Provider
            value={{
               openQuote: [quoteStatusOpen, setQuoteStatusOpen],
            }}
         >
            {props.children}
         </QuoteOpenContext.Provider>
      </>
   );
};
