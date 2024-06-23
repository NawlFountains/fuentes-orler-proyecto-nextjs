import { Product } from "./definitions";

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
export const isValidId = (uuid : string) => {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidPattern.test(uuid);
};

export function formatTimestamp(timestamp: string) {
  const date = new Date(timestamp);

    // Extract the hours, minutes, day, month, and year
    const hours = date.getHours().toString().padStart(2, '0');  // Ensure two digits
    const minutes = date.getMinutes().toString().padStart(2, '0');  // Ensure two digits
    const seconds = date.getSeconds().toString().padStart(2, '0');  // Ensure two digits
    const day = date.getDate().toString().padStart(2, '0');  // Ensure two digits
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Ensure two digits
    const year = date.getFullYear();

    // Return the formatted string
    return `${hours}:${minutes}:${seconds}, ${day}/${month}/${year}`;
}



