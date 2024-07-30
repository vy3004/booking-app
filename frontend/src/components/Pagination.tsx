type PaginationProps = {
  page: number;
  pages: number;
  onChangePage: (page: number) => void;
};

const Pagination = ({ page, pages, onChangePage }: PaginationProps) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    if (pages <= 5) {
      for (let i = 1; i <= pages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (page <= 3) {
        pageNumbers.push(1, 2, 3, "...", pages);
      } else if (page > pages - 3) {
        pageNumbers.push(1, "...", pages - 2, pages - 1, pages);
      } else {
        pageNumbers.push(1, "...", page - 1, page, page + 1, "...", pages);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex justify-center">
      <ul className="flex">
        <li
          className={`border rounded-l-lg px-3 py-2 cursor-pointer ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
          onClick={() => page > 1 && onChangePage(page - 1)}
        >
          Previous
        </li>
        {pageNumbers.map((number, index) => (
          <li
            key={index}
            className={`border px-3 py-2 cursor-pointer ${
              page === number
                ? "bg-blue-500 border-blue-500 text-white"
                : "hover:bg-gray-100"
            } ${number === "..." ? "cursor-not-allowed" : ""}`}
            onClick={() => number !== "..." && onChangePage(number as number)}
          >
            {number}
          </li>
        ))}
        <li
          className={`border rounded-r-lg px-3 py-2 cursor-pointer ${
            page === pages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          onClick={() => page < pages && onChangePage(page + 1)}
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
