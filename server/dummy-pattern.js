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

  parseUrlPattern() {
    this.urlPattern = new UrlPattern(this.url);
  }

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
}

module.exports = DummyPattern;
