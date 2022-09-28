import React, { useState, createContext, useEffect } from 'react';
export const FormFieldsContext = createContext();
export const FormFieldsProvider = props => {

    const [baseFieldData, setBaseFieldData] = useState({
        emirateData: [],
        ageData: [],
        genderData: [],
        microChipData: [],
        preConditionData: [],
        neuteredData: [],
        speciesData: [],
    });
  
    return (
        <>
            <FormFieldsContext.Provider
                value={{
                    formFieldDetails: [baseFieldData, setBaseFieldData],
                }}
            >
                {props.children}
            </FormFieldsContext.Provider>
        </>
    );
};
