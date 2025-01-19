import { jwtDecode } from "jwt-decode";

// decode jwt token
export const decodeDataJwt = (token) => {
  try {
    return jwtDecode(token);
  } catch (err) {
    console.error("Error decoding token:", err);
    return null;
  }
};

// calculate pagination data and provide pagination utilities
export const usePagination = (data, currentPage, itemsPerPage) => {
  // calculate index
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexofFirstItem = indexOfLastItem - itemsPerPage;

  // get current items for the page
  const currentItems = data.slice(indexofFirstItem, indexOfLastItem);

  // calculate total page
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // generate page numbers array
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // calculate display info
  const showingFrom = data.length === 0 ? 0 : indexofFirstItem + 1;
  const showingTo = Math.min(indexOfLastItem, data.length);
  const totalItems = data.length;

  return {
    currentItems,
    totalPages,
    pageNumbers,
    showingFrom,
    showingTo,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

// generate pagination navigation info
export const getPaginationRange = (currentPage, totalPages, maxVisible = 5) => {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  let start = currentPage - Math.floor(maxVisible / 2);
  start = Math.max(start, 1);
  start = Math.min(start, totalPages - maxVisible + 1);

  return Array.from({ length: maxVisible }, (_, i) => start + i);
};
