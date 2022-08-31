import React from "react";
import "./Pagination.css";

export default function Pagination({
  currentPage,
  countriesPerPage,
  allCountries,
  pagination,
}) {
  const pageNumbers = [];

  for (let i = 0; i < Math.ceil(allCountries / countriesPerPage); i++) {
    pageNumbers.push(i + 1);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) =>
          currentPage === number ? (
            <li className="numbers" key={number}>
              <button className="abtn" onClick={() => pagination(number)}>
                {number}
              </button>
            </li>
          ) : (
            <li className="numbers" key={number}>
              <button className="abtn" onClick={() => pagination(number)}>
                {number}
              </button>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}

// {pageNumbers &&
//   pageNumbers.map((number) => (
//     <li className="numbers" key={number}>
//       <button className="abtn" onClick={() => pagination(number)}>
//         {number}
//       </button>
//     </li>
//   ))}
