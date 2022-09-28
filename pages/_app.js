import React from 'react';
import Head from 'next/head';
import '../styles/styles.scss';
import { EmiratedIdProvider } from '@/context/EmiratesIdContext';
import { LeadsProvider } from '@/context/LeadsContext';
import { StepperProvider } from '@/context/StepperContext';
import { PlanProvider } from '@/context/PlanContext';
import { GeneratedIDsProvider } from '@/context/GeneratedIDsContext';
import { QuoteSummaryProvider } from '@/context/QuoteSummaryContext';
// import { FaqProvider } from '@/context/FaqContext';
import { DocOcrProvider } from '@/context/DocOcrContext';
import { SpinProvider } from '@/context/SpinContext';
import { TabIndexProvider } from '@/context/TabIndexContext';
import { BasicInfoProvider } from '@/context/BasicInfoContext';
import { RetrieveQuoteProvider } from '@/context/RetrieveQuoteContext';
import { PaymentProvider } from '@/context/PaymentContext';
import { PayLaterProvider } from '@/context/PayLaterContext';
import { DetectionProvider } from '@/context/DetectionContext';
import { QuoteOpenProvider } from '@/context/QuoteOpenContext';
import { PromoCodeProvider } from '@/context/PromoCodeContext';
import { FormFieldsProvider } from '@/context/FormFieldsContext';

function MyApp({ Component, pageProps }) {
   return (
      <>
         <Head>
            <meta charSet="UTF-8" />
            <meta name="description" content="Fidelity Pets Insurance in UAE" />
            <meta name="keywords" content="Insurance for pets, Pets insurance in UAE, Insurance for animals, MyBuddy Pet Insurance, Dog Insurance, Cat Insurance, Insurance for Dogs, Insurance for Cats" />
            <meta name="author" content="Fidelity Pets Insurance" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Fidelity United Pet Insurance</title>
         </Head>
         {/* <FaqProvider> */}

         <SpinProvider>
            <PayLaterProvider>
               <QuoteOpenProvider>
                  <TabIndexProvider>
                     <FormFieldsProvider>
                        <StepperProvider>
                           <PlanProvider>
                              <DetectionProvider>
                                 <PromoCodeProvider>
                                    <BasicInfoProvider>
                                       <LeadsProvider>
                                          <GeneratedIDsProvider>
                                             <RetrieveQuoteProvider>
                                                {/* <QuoteSummaryProvider> */}
                                                <EmiratedIdProvider>
                                                   <DocOcrProvider>
                                                      <PaymentProvider>
                                                         <Component {...pageProps} />
                                                      </PaymentProvider>
                                                   </DocOcrProvider>
                                                </EmiratedIdProvider>
                                                {/* </QuoteSummaryProvider> */}
                                             </RetrieveQuoteProvider>
                                          </GeneratedIDsProvider>
                                       </LeadsProvider>
                                    </BasicInfoProvider>
                                 </PromoCodeProvider>
                              </DetectionProvider>
                           </PlanProvider>
                        </StepperProvider>
                     </FormFieldsProvider>
                  </TabIndexProvider>
               </QuoteOpenProvider>
            </PayLaterProvider>
         </SpinProvider>
         {/* </FaqProvider> */}
      </>
   );
}

export default MyApp;
