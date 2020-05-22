const assert = require('assert');
const sinon = require('sinon');
const DummyPattern = require('../dummy-pattern');
const UrlPattern = require('url-pattern');

describe('DummyPattern', () => {
  describe('constructor', () => {
    let parseUrlStub;
    let parseQueryStub;

    beforeEach(() => {
      parseUrlStub = sinon.stub(DummyPattern.prototype, 'parseUrlPattern');
      parseQueryStub = sinon.stub(DummyPattern.prototype, 'parseQueryPattern');
    });

    afterEach(() => {
      parseUrlStub.restore();
      parseQueryStub.restore();
    });

    it('init attributes and call parseUrlPattern, parseQueryPattern', () => {
      const dp = new DummyPattern('/user');
      assert.equal(dp.path, '/user');
      assert.equal(dp.urlPattern, null);
      assert.deepEqual(dp.queryPattern, {});
      assert(parseUrlStub.called);
      assert(parseQueryStub.called);
    });
  });

  describe('url getter', () => {
    it('return path before "?"', () => {
      const dp = new DummyPattern('/user?page=1');
      assert.equal(dp.url, '/user');
    });

    it('return origin path if no query string', () => {
      const dp = new DummyPattern('/user');
      assert.equal(dp.url, '/user');
    });

    it('return empty string if path is empty', () => {
      const dp = new DummyPattern('/url');
      dp.path = '';
      assert.equal(dp.url, '');
    });

    it('return empty string if path is not a string', () => {
      const dp = new DummyPattern('/url');
      dp.path = 123;
      assert.equal(dp.url, '');
    });
  });

  describe('query getter', () => {
    it('return query string after "?"', () => {
      const dp = new DummyPattern('/user?page=1');
      assert.equal(dp.query, 'page=1');
    });

    it('return empty string if no query string', () => {
      const dp = new DummyPattern('/user');
      assert.equal(dp.query, '');
    });

    it('return empty string if path is not a string', () => {
      const dp = new DummyPattern('/url');
      dp.path = 123;
      assert.equal(dp.query, '');
    });
  });

  describe('normalizedPath getter', () => {
    it('replace url parameter with number', () => {
      const dp = new DummyPattern('/api/:param');
      assert.equal(dp.normalizedPath, '/api/:0');
    });

    it('replace multiple url parameters with numbers', () => {
      const dp = new DummyPattern('/api/:param/page/:anotherParam');
      assert.equal(dp.normalizedPath, '/api/:0/page/:1');
    });

    it('sort query parameters', () => {
      const dp = new DummyPattern('/api?page&orderBy&search');
      assert.equal(dp.normalizedPath, '/api?orderBy&page&search');
    });

    it('replace url parameter and sort query parameters', () => {
      const dp = new DummyPattern('/api/:param/:anotherParam/:thirdParam?c=1&a&d&b=true');
      assert.equal(dp.normalizedPath, '/api/:0/:1/:2?a&b=true&c=1&d');
    });

    it('return empty string if path is empty', () => {
      const dp = new DummyPattern('/url');
      dp.path = '';
      assert.equal(dp.normalizedPath, '');
    });
  });

  describe('urlParamsLength getter', () => {
    it('return url parameter length of url', () => {
      const dp = new DummyPattern('/api/:0/:1');
      assert.equal(dp.urlParamsLength, 2);
    });

    it('return url parameter length of url with query string', () => {
      const dp = new DummyPattern('/api/:0/:1?q0&q1');
      assert.equal(dp.urlParamsLength, 2);
    });

    it('return 0 if no url parameter', () => {
      const dp = new DummyPattern('/api');
      assert.equal(dp.urlParamsLength, 0);
    });
  });

  describe('strictQueryParamsLength getter', () => {
    it('return strict query parameter length of url', () => {
      const dp = new DummyPattern('/api/:0/:1?q0=1&q1&q2');
      assert.equal(dp.strictQueryParamsLength, 1);
    });

    it('return 0 if no strict query parameter', () => {
      const dp = new DummyPattern('/api?q0&q1');
      assert.equal(dp.strictQueryParamsLength, 0);
    });

    it('return 0 if no query string', () => {
      const dp = new DummyPattern('/api');
      assert.equal(dp.strictQueryParamsLength, 0);
    });
  });

  describe('looseQueryParamsLength getter', () => {
    it('return loose query parameter length of url', () => {
      const dp = new DummyPattern('/api/:0/:1?q0=1&q1&q2');
      assert.equal(dp.looseQueryParamsLength, 2);
    });

    it('return 0 if no loose query parameter', () => {
      const dp = new DummyPattern('/api?q0=1&q1=1');
      assert.equal(dp.looseQueryParamsLength, 0);
    });

    it('return 0 if no query string', () => {
      const dp = new DummyPattern('/api');
      assert.equal(dp.looseQueryParamsLength, 0);
    });
  });

  describe('parseUrlPattern', () => {
    it('set urlPattern with a UrlPattern instance', () => {
      const dp = new DummyPattern('/url');
      dp.urlPattern = {};
      dp.parseUrlPattern();
      assert(dp.urlPattern instanceof UrlPattern);
    });
  });

  describe('parseQueryPattern', () => {
    it('set queryPattern to key/value parsed by query string', () => {
      const dp = new DummyPattern('/url?page=1&orderBy=id');
      dp.queryPattern = {};
      dp.parseQueryPattern();
      assert.deepEqual(dp.queryPattern, {
        page: 1,
        orderBy: 'id'
      });
    });

    it('set queryPattern value to true if the query param value is not assigned', () => {
      const dp = new DummyPattern('/url?page=1&orderBy');
      dp.queryPattern = {};
      dp.parseQueryPattern();
      assert.deepEqual(dp.queryPattern, {
        page: 1,
        orderBy: true
      });
    });

    it('set queryPattern an empty object if no query string', () => {
      const dp = new DummyPattern('/url');
      dp.queryPattern = {};
      dp.parseQueryPattern();
      assert.deepEqual(dp.queryPattern, {});
    });
  });

  describe('match', () => {
    it('call mathcUrl and matchQuery with path and query parameter', () => {
      const dp = new DummyPattern('/url?page=1&orderBy=id');
      const matchUrlSpy = sinon.spy(dp, 'matchUrl');
      const matchQuery = sinon.spy(dp, 'matchQuery');
      const path = '/url';
      const query = { page: 1 };
      dp.match(path, query);
      assert(matchUrlSpy.calledOnceWith(path));
      assert(matchQuery.calledOnceWith(query));
    });

    it('return true if url and query both matches', () => {
      const dp = new DummyPattern('/url?page=1&orderBy=id');
      sinon.stub(dp, 'matchUrl').returns(true);
      sinon.stub(dp, 'matchQuery').returns(true);
      assert(dp.match('', {}));
    });

    it('return false if url not matches', () => {
      const dp = new DummyPattern('/url?page=1&orderBy=id');
      sinon.stub(dp, 'matchUrl').returns(false);
      sinon.stub(dp, 'matchQuery').returns(true);
      assert(!dp.match('', {}));
    });

    it('return false if query not matches', () => {
      const dp = new DummyPattern('/url?page=1&orderBy=id');
      sinon.stub(dp, 'matchUrl').returns(true);
      sinon.stub(dp, 'matchQuery').returns(false);
      assert(!dp.match('', {}));
    });

    it('return false if url and query both not matches', () => {
      const dp = new DummyPattern('/url?page=1&orderBy=id');
      sinon.stub(dp, 'matchUrl').returns(false);
      sinon.stub(dp, 'matchQuery').returns(false);
      assert(!dp.match('', {}));
    });
  });

  describe('matchUrl', () => {
    it('call urlPattern.match with path parameter', () => {
      const dp = new DummyPattern('/url?page=1&orderBy=id');
      const spy = sinon.spy(dp.urlPattern, 'match');
      const path = '/url';
      dp.matchUrl(path);
      assert(spy.calledOnceWith(path));
    });

    it('return result of urlPattern.match', () => {
      const dp = new DummyPattern('/url?page=1&orderBy=id');
      sinon.stub(dp.urlPattern, 'match')
        .onFirstCall().returns(true)
        .onSecondCall().returns(false);
      assert(dp.matchUrl(''));
      assert(!dp.matchUrl(''));
    });

    it('return true if url equals urlPattern', () => {
      const dp = new DummyPattern('/url');
      assert(dp.matchUrl('/url'));
    });

    it('return true if url part matches urlPattern', () => {
      const dp = new DummyPattern('/url?page=1&orderBy=id');
      assert(dp.matchUrl('/url'));
    });

    it('return true if url matches urlPattern with url params', () => {
      const dp = new DummyPattern('/url/:id?page=1&orderBy=id');
      assert(dp.matchUrl('/url/10'));
    });

    it('return false if url matches urlPattern', () => {
      const dp = new DummyPattern('/url?page=1&orderBy=id');
      assert(!dp.matchUrl('/notMatchesUrl'));
    });
  });

  describe('matchQuery', () => {
    it('return true if query object equals queryPattern', () => {
      const dp = new DummyPattern('/url?page=1');
      assert(dp.matchQuery({ page: '1' }));
    });

    it('return true if query object is a superset of queryPattern', () => {
      const dp = new DummyPattern('/url?page=1');
      assert(dp.matchQuery({ page: '1', orderBy: 'id' }));
    });

    it('return true if query object matches queryPattern without assigned value', () => {
      const dp = new DummyPattern('/url?page');
      assert(dp.matchQuery({ page: '1' }));
    });

    it('return false if query object lacks url params', () => {
      const dp = new DummyPattern('/url?page');
      assert(!dp.matchQuery({}));
    });

    it('return false if query object with different value', () => {
      const dp = new DummyPattern('/url?page=1');
      assert(!dp.matchQuery({ page: '2' }));
    });
  });
});
