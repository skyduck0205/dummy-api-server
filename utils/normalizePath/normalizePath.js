/**
 * Transfer a pattern from path by serializing the url parameters and
 * sorting the query params. The normalizedPath in router should be unique.
 * @example
 * '/api/:param/:anotherParam?page&orderBy' will have a path pattern
 * '/api/:0/:1?orderBy&page'
 */
function normalizePath(path) {
  const url = path.split('?')[0] || '';
  const query = path.split('?')[1] || '';
  let normalizedPath = url;
  // replace url param names with number id
  const matchedParams = url.match(/\:[^\/]+/g) || [];
  matchedParams.forEach((m, i) => normalizedPath = normalizedPath.replace(m, `:${i}`));
  // sort query param names
  if (query) {
    const sortedQuery = query.split('&').sort().join('&');
    normalizedPath = `${normalizedPath}?${sortedQuery}`;
  }
  return normalizedPath;
}

module.exports = normalizePath;