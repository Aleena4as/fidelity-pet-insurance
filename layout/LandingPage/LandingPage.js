import React, { useEffect, useContext } from 'react';
import Header from '@/pages/Header/Header';
import About from '@/pages/About/About';
import GetQuote from '@/pages/GetQuote/GetQuote';
import Footer from '@/pages/Footer/Footer';
import Faqs from '@/pages/Faqs/Faqs';
import HowItWorks from '@/pages/HowItWorks/HowItWorks';
import Testimonials from '@/pages/Testimonials/Testimonials';
import Partners from '@/pages/Partners/Partners';

import { useRouter } from 'next/router';
import { QuoteOpenContext } from '@/context/QuoteOpenContext';

const LandingPage = () => {
   // openQuoteStatus context begins here
   const { openQuote } = useContext(QuoteOpenContext);
   const [quoteStatusOpen, setQuoteStatusOpen] = openQuote;
   // openQuoteStatus context ends here
   const router = useRouter();
   // to get into the get quote pop up begins here
   useEffect(() => {
      var path = router.query.path;
      if (path === 'getQuote') {
         setQuoteStatusOpen(true);
      }
   }, [router.query.path]);
   // to get into the get quote pop up begins here

   return (
      <div className="FidelityMain">
         <Header />
         <About />
         <HowItWorks />
         <GetQuote />
         <Partners />
         <Testimonials />
         <Faqs />
         <Footer />
      </div>
   );
};

export default LandingPage;
