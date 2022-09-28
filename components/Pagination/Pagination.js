import React, { useState } from 'react';

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
   const [activePage, setActivePage] = useState(1);

   const pageNumbers = [];

   for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
   }

   return (
      <nav>
         <ul className="pagination">
            {pageNumbers.map(number => (
               <li key={number} className="page-item">
                  <a
                     onClick={() => {
                        paginate(number);
                        setActivePage(number);
                     }}
                     href="#faqs"
                     className={`page-link ${activePage === number ? 'isActive' : ''}`}
                  >
                     {number}
                  </a>
               </li>
            ))}
         </ul>
      </nav>
   );
};

export default Pagination;
