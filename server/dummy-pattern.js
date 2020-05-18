const debug = require('debug')('ds:pattern');
const _ = require('lodash');
const UrlPattern = require('url-pattern');

class DummyPattern {
  constructor(path) {
    this.path = path;
    this.urlPattern = null;
    this.queryPattern = {};

    this.parseUrlPattern();
    this.parseQueryPattern();
  }

  get url() {
    try {
      return this.path.split('?')[0] || '';
    } catch {
      return '';
    }
  }

  get query() {
    try {
      return this.path.split('?')[1] || '';
    } catch {
      return '';
    }
  }

  /**
   * Transfer a pattern from path by serializing the url parameters and
   * sorting the query params. The pathPattern in router should be unique.
   * @example
   * '/api/:param/:anotherParam?page&orderBy' will have a path pattern
   * '/api/:0/:1?orderBy&page'
   */
  get pathPattern() {
    let pathPattern = this.url;
    // replace url param names with number id
    const paramMatches = this.url.match(/\:[^\/]+/g);
    _.forEach(paramMatches, (m, i) => pathPattern = pathPattern.replace(m, `:${i}`));
    // sort query param names
    if (this.query) {
      const sortedQuery = this.query.split('&').sort().join('&');
      pathPattern = `${pathPattern}?${sortedQuery}`;
    }
    return pathPattern;
  }

  /**
   * Use url of API to create a UrlPattern instance
   */
  parseUrlPattern() {
    this.urlPattern = new UrlPattern(this.url);
  }

  /**
   * Parse the query pattern of API path. If the query params are without
   * value, their value in query pattern will be set to true.
   * @example
   * If a API path is '/user?search=John&page', its query pattern will be
   * {
   *   search: 'John',
   *   page: true
   * }
   */
  parseQueryPattern() {
    const queryPattern = {};
    if (this.query) {
      _.forEach(this.query.split('&'), (queryItem) => {
        const [key, value] = queryItem.split('=');
        queryPattern[key] = value || true;
      });
    }
    this.queryPattern = queryPattern;
    debug('parseQueryPattern:', this.path, this.queryPattern);
  }

  /**
   * Check path and query match with this pattern
   * @param {string} path - url path of request
   * @param {object} query - key-value query parameter of request
   * @returns {boolean} - result
   */
  match(path, query) {
    return (
      this.matchUrl(path) &&
      this.matchQuery(query)
    );
  }

  /**
   * Check if input url is matched with urlPattern
   * @param {object} query - key-value query parameter of request
   * @returns {boolean} result
   */
  matchUrl(path) {
    return this.urlPattern.match(path);
  }

  /**
   * Check if input query paramters are matched with queryPattern, determine if
   * query parameters contains equivalent property values with queryPattern
   * @param {string} path - url path of request
   * @returns {boolean} result
   */
  matchQuery(query) {
    return _.isMatchWith(
      query,  // object - The object to inspect.
      this.queryPattern,  // source - The object of property values to match.
      // customizer - There are two conditions that treat source value and object value as equivalent
      // 1. queryPattern property and query param property have the same value
      // 2. queryPattern property value is true and param property value is not empty
      (objVal, srcVal) => (objVal === srcVal || (srcVal === true && objVal))
    );
  }
}

module.exports = DummyPattern;
