// frontend/src/components/common/Pagination.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ pages, page, isAdmin = false, keyword = '' }) => {
  return (
    pages > 1 && (
      <nav className="flex justify-center mt-8" aria-label="Pagination">
        <ul className="flex items-center space-x-2">
          {[...Array(pages).keys()].map((x) => (
            <li key={x + 1}>
              <Link
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : `/page/${x + 1}`
                    : `/admin/productlist/${x + 1}`
                }
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md
                  ${x + 1 === page
                    ? 'bg-starnox-primary text-starnox-text-light shadow-md'
                    : 'bg-starnox-light text-starnox-text-dark border border-gray-300 hover:bg-starnox-light/70'
                  }
                  hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-starnox-primary focus:ring-offset-2
                  transition-all duration-200 ease-in-out
                `}
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    )
  );
};

export default Pagination;