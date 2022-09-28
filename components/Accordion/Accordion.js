import React, { useState } from 'react';
import { faqs } from '@/utils/data';
import Pagination from '@/components/Pagination/Pagination';
import AccordionItem from './AccordionItem';
import SectionTitle from '@/components/Titles/SectionTitle/SectionTitle';

const App = () => {
   const [questions, setQuestions] = useState(faqs);
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage, setPostsPerPage] = useState(4);

   // for pagination
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const currentPost = faqs.slice(indexOfFirstPost, indexOfLastPost);

   // Change page
   const paginate = pageNumber => setCurrentPage(pageNumber);

   return (
      <div className="accordionContainer">
         <div className="row">
            <div className="col-12 col-md-6  pt-150">
               <div className="contentWrap">
                  <SectionTitle title="Frequently Asked Questions" classes="d-md-none text-center questionBg" />
                  <img src="images/version2/AccordionSection.png" alt="" />
               </div>
            </div>
            <div className="col-12 col-md-6 contentCenter">
               <div className="info">
                  <SectionTitle title="Frequently Asked Questions" classes="d-none d-md-block questionBg" />
                  <div className="scrollFaqs d-none d-md-block">
                     {faqs?.map((faqs, index) => (
                        <AccordionItem key={index} {...faqs} />
                     ))}
                  </div>
                  <div className="d-md-none">
                     {currentPost?.map((faqs, index) => (
                        <AccordionItem key={index} {...faqs} />
                     ))}

                     <Pagination postsPerPage={postsPerPage} totalPosts={faqs.length} paginate={paginate} />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default App;
