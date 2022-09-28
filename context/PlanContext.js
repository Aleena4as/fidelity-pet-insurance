import React, { useState, useEffect, createContext } from 'react';
import axios from '@/utils/request';

export const PlanContext = createContext();
export const PlanProvider = props => {
   const planApi = '/plans';
   const [speciesID, setSpeciesID] = useState('');
   const [planData, setPlanData] = useState('');
 

   const [planError, setPlanError] = useState('');
   const [planUpdated, setPlanUpdated] = useState(false);
   const [planMainTitles, setPlanMainTitles] = useState('');
   const [planSubTitles, setPlanSubTitles] = useState('');

   //    console.log('plan details logged', planData);

   const getPlanTable = () => {
      axios(planApi, {
         method: 'GET',
         params: {
            species_id: speciesID,
         },
      })
         .then(response => {
            if (response.status === 200) {
               setPlanData([...response.data.data]);
               const tdata1 = response.data.data[0];
               const tdata2 = response.data.data[1];
               const tdata3 = response.data.data[2];

              
               setPlanMainTitles(['Pet Insurance', tdata1.plan_name, tdata2.plan_name, tdata3.plan_name]);
               setPlanSubTitles([
                  'Summary',
                  'AED ' + tdata1.total_plan_limit?.toLocaleString(),
                  'AED ' + tdata2.total_plan_limit?.toLocaleString(),
                  'AED ' + tdata3.total_plan_limit?.toLocaleString(),
               ]);
               setPlanUpdated(true);

               
            }
         })
         .catch(error => {
            if (error.response) {
               setPlanError(error.response.data.message);
            }
         });
   };

   useEffect(() => {
      if (planData) {
      }
   }, [planData]);
   useEffect(() => {
   }, [planMainTitles, planSubTitles]);

   useEffect(() => {
      if (speciesID) {
         getPlanTable();
      }
   }, [speciesID]);

   return (
      <>
         <PlanContext.Provider
            value={{
               PlanTable: [planData, setPlanData],
               tableError: [planError, setPlanError],
               speciesDetails: [speciesID, setSpeciesID],
               updated: [planUpdated, setPlanUpdated],
               planTitles: [planMainTitles, setPlanMainTitles, planSubTitles, setPlanSubTitles],
            }}
         >
            {props.children}
         </PlanContext.Provider>
      </>
   );
};
