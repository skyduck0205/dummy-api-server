const debug = require('debug')('ds:router');
const _ = require('lodash');
const DummyPattern = require('./dummy-pattern');

class DummyRouter {
  constructor(apis) {
    this.apis = apis;
    this.patterns = [];

    this.updatePatterns();
  }

  /**
   * Update the list of uniq patterns
   */
  updatePatterns() {
    this.patterns = _(this.apis)
      .uniqBy('normalizedPath')
      .map((api) => new DummyPattern(api.path))
      .value();
    debug('updatePatterns:', _.map(this.patterns, 'path'));
  }

  /**
   * Find matched API by request method, path and query
   * @param {string} method - request method
   * @param {string} path - request path
   * @param {object} query - request query key-value object
   * @returns {object} - API object
   */
  getMatchedAPI(method, path, query) {
    const matchedPatterns = this.getMatchedPatterns(path, query);
    const matchedAPIs = _(this.apis)
      .filter({ disabled: false, method }) // filter available API with same method
      .intersectionBy(matchedPatterns, 'path') // filter by matched patterns
      .value();
    debug('matchedAPIs:', _.map(matchedAPIs, 'path'));
    return matchedAPIs[0];
  }

  /**
   * Filter and sort the patterns by request path and query
   * @param {string} path - path from a request
   * @param {object} query - query parameters object from a request
   * @returns {Pattern[]} - matched patterns
   */
  getMatchedPatterns(path, query) {
    return _(this.patterns)
      .filter((pattern) => pattern.match(path, query)) // filter matched patterns
      .orderBy(
        ['urlParamsLength', 'strictQueryParamsLength', 'looseQueryParamsLength'],
        ['asc', 'desc', 'desc']
      )
      .value();
  }
}

module.exports = DummyRouter;
