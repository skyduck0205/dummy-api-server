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
      .map((api) => new DummyPattern(api.normalizedPath))
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
    let matchedAPI;
    _.forEach(matchedPatterns, pattern => {
      // filter available API with same method and path
      matchedAPI = _.find(this.apis, {
        disabled: false,
        method,
        normalizedPath: pattern.path
      });
      // break lodash forEach if api found
      return !matchedAPI;
    })
    debug('matchedAPI:', matchedAPI && matchedAPI.path);
    return matchedAPI;
  }

  /**
   * Filter and sort the patterns by request path and query
   * @param {string} path - path from a request
   * @param {object} query - query parameters object from a request
   * @returns {Pattern[]} - matched patterns
   */
  getMatchedPatterns(path, query) {
    const matchedPatterns = _(this.patterns)
      .filter((pattern) => pattern.match(path, query)) // filter matched patterns
      .orderBy(
        ['urlParamsLength', 'strictQueryParamsLength', 'looseQueryParamsLength'],
        ['asc', 'desc', 'desc']
      )
      .value();
    debug('matchedPatterns:', _.map(matchedPatterns, 'path'));
    return matchedPatterns;
  }

  /**
   * Get current response
   * @param {string} method - request method
   * @param {string} path - request path
   * @param {object} query - request query key-value object
   * @returns {object} - Response object
   */
  getCurrentResponse(method, path, query) {
    const api = this.getMatchedAPI(method, path, query);
    if (!api) { return null; }
    const response =  _.find(api.responses, { id: api.currentResponseID }) || null;
    if (response) { response.delay = api.delay; }
    return response;
  }
}

module.exports = DummyRouter;
