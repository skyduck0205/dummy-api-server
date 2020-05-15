const debug = require('debug')('ds:router');
const _ = require('lodash');
const DummyPattern = require('./dummy-pattern');

class DummyRouter {
  constructor(apis) {
    this.apis = apis;
    this.patterns = [];
    this.updatePatterns();
  }

  updatePatterns() {
    this.patterns = _(this.apis)
      .uniqBy('pathPattern')
      .map((api) => {
        debug('add pattern:', api.path);
        return {
          path: api.path,
          pattern: new DummyPattern(api.path)
        };
      })
      .value();
  }
}

module.exports = DummyRouter;
