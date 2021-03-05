import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import "./Pagination.scss";

const Pagination = (props) => {
  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  // // ;
  // // ;
  // // ;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  props.show(pagesCount);

  return (
    <nav>
      <ul className="pagination">
        <li className="page-item">
          <span
            id="pagelink"
            className="page-link"
            onClick={() => {
              const page = currentPage - 1;
              if (page > 0) {
                onPageChange(page);
              }
            }}
          >
            Previous
          </span>
        </li>
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <span
              id="pagelink"
              className="page-link"
              onClick={() => onPageChange(page)}
            >
              {page}
            </span>
          </li>
        ))}
        <li className="page-item">
          <span
            id="pagelink"
            className="page-link"
            onClick={() => {
              const page = currentPage + 1;
              if (page <= pages.length) {
                onPageChange(page);
              }
            }}
          >
            Next
          </span>
        </li>
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
