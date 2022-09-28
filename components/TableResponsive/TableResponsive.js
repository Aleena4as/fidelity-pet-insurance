import { useState, useEffect, useContext } from 'react';
import axios from '@/utils/request';
import { plans } from '@/utils/data';
import Buttons from '@/components/UiFields/Buttons/Buttons';
import { GeneratedIDsContext } from '@/context/GeneratedIDsContext';
import { PlanContext } from '@/context/PlanContext';

export const TableResponsive = ({ stepFirstAccept }) => {
   // generatedID context begins here
   const { generatedLeadID, generatedQuoteID, generatedPlanID } = useContext(GeneratedIDsContext);
   const [leadID, setLeadID] = generatedLeadID;
   const [quoteID, setQuoteID] = generatedQuoteID;
   const [planID, setPlanID] = generatedPlanID;
   // generatedID context  ends here

   // planContext begins here
   const { PlanTable, tableError, updated, planTitles } = useContext(PlanContext);
   const [planData, setPlanData] = PlanTable;
   const [planError, setPlanError] = tableError;
   const [planUpdated, setPlanUpdated] = updated;
   const [planMainTitles, setPlanMainTitles, planSubTitles, setPlanSubTitles] = planTitles;
   // planContext ends here

   const [headerElement, setHeaderElement] = useState([]);
   const [headerSubElement, setHeaderSubElement] = useState([]);

   // const [headerElement, setHeaderElement] = useState(false);
   // const [headerSubElement, setHeaderSubElement] = useState(false);

   const [selectPlans, setSelectPlans] = useState('');
   const [activeButton, setActiveButton] = useState(0);

   const clickedButtonHandler = buttonId => {
      setActiveButton(buttonId);
      setPlanID(buttonId);
      stepFirstAccept(true);
   };

   const [tableData, setTableData] = useState('');

   useEffect(() => {
      if (planUpdated) {
         setSelectPlans('');
         planData.map(tdata => {
            setSelectPlans(prev => [
               ...prev,
               {
                  plan: tdata.plan_name,
                  id: tdata.plan_id,
                  planLimit: tdata.total_plan_limit?.toLocaleString(),
                  injury:
                     tdata.covers[0].data[0].cover_status === 'ENABLE' ? tdata.covers[0].data[0].cover_limit : 'N/A',
                  illness:
                     tdata.covers[0].data[1].cover_status === 'ENABLE' ? tdata.covers[0].data[1].cover_limit : 'N/A',
                  // cruciate:
                  //    tdata.covers[0].data[2].cover_status === 'ENABLE' ? tdata.covers[0].data[2].cover_limit : 'N/A',
                  // patellar:
                  //    tdata.covers[0].data[3].cover_status === 'ENABLE' ? tdata.covers[0].data[3].cover_limit : 'N/A',
                  // bone: tdata.covers[0].data[4].cover_status === 'ENABLE' ? tdata.covers[0].data[4].cover_limit : 'N/A',
                  // disc: tdata.covers[0].data[5].cover_status === 'ENABLE' ? tdata.covers[0].data[5].cover_limit : 'N/A',
                  // hip: tdata.covers[0].data[6].cover_status === 'ENABLE' ? tdata.covers[0].data[6].cover_limit : 'N/A',
                  // hyperthermia:
                  //    tdata.covers[0].data[7].cover_status === 'ENABLE' ? tdata.covers[0].data[7].cover_limit : 'N/A',
                  alternative:
                     tdata.covers[0].data[8].cover_status === 'ENABLE' ? tdata.covers[0].data[8].cover_limit : 'N/A',
                  death:
                     tdata.covers[1].data[0].cover_status === 'ENABLE' ? tdata.covers[1].data[0].cover_limit : 'N/A',
                  theft:
                     tdata.covers[2].data[0].cover_status === 'ENABLE' ? tdata.covers[2].data[0].cover_limit : 'N/A',
                  purchasevalue:
                     tdata.covers[2].data[1].cover_status === 'ENABLE' ? tdata.covers[2].data[1].cover_limit : 'N/A',
                  thirparty:
                     tdata.covers[3].data[0].cover_status === 'ENABLE' ? tdata.covers[3].data[0].cover_limit : 'N/A',
                  copayment: '20%',
                  waitingperiod: '1 month waiting period',
               },
            ]);
         });

         setHeaderElement(planMainTitles);
         setHeaderSubElement(planSubTitles);
      }
   }, [planUpdated]);

   useEffect(() => {
      setTableData(selectPlans);
   }, [selectPlans]);

   const renderHeader = () => {
      return headerElement?.map((key, index) => {
         return (
            <th key={index} className="titleMain">
               {key.toUpperCase()}
            </th>
         );
      });
   };
   const renderSubHeader = () => {
      return headerSubElement?.map((keys, index) => {
         return (
            <th key={index} className="titleSub">
               {keys.toUpperCase()}
            </th>
         );
      });
   };
   const renderStaticBody = () => {
      return (
         <tr className="d-none d-md-block">
            <td className="subTr"><strong>Aggregate Limit</strong></td>
            <td className="mainTr">Vet Expenses </td>
            <td className="subTr">Injury</td>
            <td className="subTr">Illness</td>
            {/* <td className="subTr">Cruciate ligament surgery</td>
            <td className="subTr">Patellar luxation surgery</td>
            <td className="subTr">Bone plating surgery</td>
            <td className="subTr">Disc prolapse</td>
            <td className="subTr">Hip replacement</td>
            <td className="subTr">Hyperthermia</td> */}
            <td className="subTr">Alternative Therapy</td>
            <td className="mainTr">Death due to injury and illness </td>
            <td className="subTr" style={{ borderBottom: '0' }}>
               Purchase Value of Pet or Market value up to 40% of the limit
            </td>
            <td className="mainTr">Theft / Straying </td>
            <td className="subTr">Advertising & rewards</td>
            <td className="subTr" style={{ borderBottom: '0' }}>
               Purchase Value of Pet or Market value up to 40% of the limit
            </td>
            <td className="mainTr">Third Party Liability</td>
            <td className="subTr" style={{ borderBottom: '0' }}>
               Third Party Liability
            </td>
            <td className="mainTr">Co-payment</td>
         </tr>
      );
   };
   const renderBody = () => {
      return (
         tableData &&
         tableData?.map(
            (
               {
                  id,
                  plan,
                  injury,
                  illness,
                  cruciate,
                  patellar,
                  bone,
                  disc,
                  hip,
                  hyperthermia,
                  alternative,
                  death,
                  theft,
                  purchasevalue,
                  thirparty,
                  copayment,
                  waitingperiod,
               },
               index
            ) => {
               return (
                  <tr key={id}>
                     <td className="d-md-none planTitleMob">{plan}</td>

                     <td data-label="Aggregate Limit">{index === 0 ? 'AED 5,000' : index === 1 ? 'AED 10,000' : 'AED 25,000'}</td>
                     <td data-label="Vet Expenses" className="mainTr"></td>

                     <td data-label="Injury">{injury}</td>
                     <td data-label="Illness">{illness}</td>
                     {/* <td data-label="Cruciate ligament surgery">{cruciate}</td>
                     <td data-label="Patellar luxation surgery">{patellar}</td>
                     <td data-label="Bone plating surgery">{bone}</td>
                     <td data-label="Disc prolapse">{disc}</td>
                     <td data-label="Hip replacement">{hip}</td>
                     <td data-label="Hyperthermia">{hyperthermia}</td> */}
                     <td data-label="Alternative Therapy">{alternative}</td>

                     <td
                        data-label="Death due to injury and illness	"
                        className="mainTr"
                        style={{ height: '45px' }}
                     ></td>

                     <td
                        data-label="Purchase Value of Pet or Market value up to 40% of the limit"
                        style={{ borderBottom: '0' }}
                     >
                        {death}
                     </td>

                     <td data-label="Theft / Straying" className="mainTr" style={{ height: '45px' }}></td>

                     <td data-label="Advertising & rewards">{theft}</td>
                     <td
                        data-label="Purchase Value of Pet or Market value up to 40% of the limit"
                        style={{ borderBottom: '0' }}
                     >
                        {purchasevalue}
                     </td>

                     <td data-label="Third Party Liability" className="mainTr" style={{ height: '48px' }}></td>

                     <td data-label="Third Party Liability" style={{ borderBottom: '0' }}>
                        {thirparty}
                     </td>
                     <td data-label="Co-payment" style={{ borderBottom: '0' }}>
                        {copayment}
                     </td>
                     <td className="waitingPeriod" style={{ borderBottom: '0' }}>
                        {waitingperiod}
                     </td>
                     <td style={{ height: '90px', paddingTop: '10px' }}>
                        <Buttons
                           type="button"
                           title="Select"
                           active={id === activeButton ? true : false}
                           isActive={() => clickedButtonHandler(id)}
                        />
                     </td>
                  </tr>
               );
            }
         )
      );
   };

   return (
      <div className="table-container">
         <table id="employee" className="responsive-table">
            <thead className="d-none d-md-block">
               <tr>{renderHeader()}</tr>
               {/* <tr>{renderSubHeader()}</tr> */}
            </thead>
            <tbody>
               {renderStaticBody()}
               {renderBody()}
            </tbody>
         </table>
      </div>
   );
};

export default TableResponsive;
