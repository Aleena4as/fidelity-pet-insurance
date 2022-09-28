import React, { useRef, useState, useEffect, useContext } from 'react';
import Card from '@/components/Card/Card';
import ContentStepper from '@/components/ContentStepper/ContentStepper';
import MainTitle from '@/components/Titles/MainTitle/MainTitle';
import { PayLaterContext } from '@/context/PayLaterContext';
import { TabIndexContext } from '@/context/TabIndexContext';
import { GeneratedIDsContext } from '@/context/GeneratedIDsContext';
import { useRouter } from 'next/router';

const GetQuote = () => {
   const router = useRouter();
   // console.log(router.query.id, '====router');

   const sectionGetaQuote = useRef();
   const handleBackClick = () => {
      window.scrollTo(0, sectionGetaQuote.current.offsetTop - 100);
      // console.log('scrolling working');
   };

   // tabIndex context begnis here
   const { stepperTabIndex } = useContext(TabIndexContext);
   const [currentTabIndex, setCurrentTabIndex] = stepperTabIndex;
   // tabIndex context ends here

   // generatedID context begins here
   const { generatedLeadID, generatedQuoteID, generatedPlanID } = useContext(GeneratedIDsContext);
   const [quoteID, setQuoteID] = generatedQuoteID;
   // generatedID context  ends here

   // payLater context begnis here
   const { payLaterinvoiceDetails } = useContext(PayLaterContext);
   const [payLaterinvoiceID, setPayLaterinvoiceID] = payLaterinvoiceDetails;
   // payLater context ends here

   useEffect(() => {
      var id = router.query.id;
      if (id) {
         var idArr = id.split(':');
      }


      if (router.query.id) {
         setCurrentTabIndex(3);
         setPayLaterinvoiceID(idArr[0]);
         setQuoteID(idArr[1]);
         handleBackClick();
      }
   }, [router.query.id]);

   return (
      <section id="getQuote" ref={sectionGetaQuote}>
         <MainTitle title="Get a Quote" addon="center" img="images/version2/splash/getQuoteSplash.svg" />
         <Card>
            <ContentStepper scrollToParentDiv={handleBackClick}></ContentStepper>
         </Card>
      </section>
   );
};

export default GetQuote;
