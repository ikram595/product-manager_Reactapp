import React from "react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-4">
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page + 1}
          className={`px-4 py-2 mx-1 border rounded ${
            currentPage === page + 1
              ? "bg-cyan-500 text-white"
              : "bg-white text-black"
          }`}
          onClick={() => onPageChange(page + 1)}
        >
          {page + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
