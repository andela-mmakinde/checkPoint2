/**
 * Get the pagination data
 *
 * @export
 * @param {Number} count
 * @param {Number} limit
 * @param {Number} offset
 * @returns {Object} pagination data
 */
export default function paginate(count, limit, offset) {
  const currentPage = Math.floor(offset / limit) + 1;
  const pageCount = Math.ceil(count / limit);
  const pageSize = (count - offset) > limit ? limit : (count - offset);

  return {
    total: count,
    pageCount,
    currentPage,
    pageSize,
  };
}
