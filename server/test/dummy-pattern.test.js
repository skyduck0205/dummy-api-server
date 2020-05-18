const assert = require('assert');
const sinon = require('sinon');
const DummyPattern = require('../dummy-pattern');
const UrlPattern = require('url-pattern');

describe('DummyPattern', () => {
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

  describe('constructor', () => {
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
      const dp = new DummyPattern('');
      assert.equal(dp.url, '');
    });

    it('return empty string if path is not a string', () => {
      const dp = new DummyPattern(null);
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
      const dp = new DummyPattern(null);
      assert.equal(dp.query, '');
    });
  });

  describe('pathPattern getter', () => {
    it('replace url parameter with number', () => {
      const dp = new DummyPattern('/api/:param');
      assert.equal(dp.pathPattern, '/api/:0');
    });

    it('replace multiple url parameters with numbers', () => {
      const dp = new DummyPattern('/api/:param/page/:anotherParam');
      assert.equal(dp.pathPattern, '/api/:0/page/:1');
    });

    it('sort query parameters', () => {
      const dp = new DummyPattern('/api?page&orderBy&search');
      assert.equal(dp.pathPattern, '/api?orderBy&page&search');
    });

    it('replace url parameter and sort query parameters', () => {
      const dp = new DummyPattern('/api/:param/:anotherParam/:thirdParam?c=1&a&d&b=true');
      assert.equal(dp.pathPattern, '/api/:0/:1/:2?a&b=true&c=1&d');
    });

    it('return empty string if path is empty', () => {
      const dp = new DummyPattern('');
      assert.equal(dp.pathPattern, '');
    });
  });

  describe('parseUrlPattern', () => {
    it('set urlPattern with a UrlPattern instance', () => {
      const dp = new DummyPattern('/url');
      parseUrlStub.restore();
      dp.parseUrlPattern();
      assert(dp.urlPattern instanceof UrlPattern);
    });
  });

  describe('parseQueryPattern', () => {
    it('set queryPattern to key/value parsed by query string', () => {
      const dp = new DummyPattern('/url?page=1&orderBy=id');
      parseQueryStub.restore();
      dp.parseQueryPattern();
      assert.deepEqual(dp.queryPattern, {
        page: 1,
        orderBy: 'id'
      });
    });

    it('set queryPattern value to true if the query param value is not assigned', () => {
      const dp = new DummyPattern('/url?page=1&orderBy');
      parseQueryStub.restore();
      dp.parseQueryPattern();
      assert.deepEqual(dp.queryPattern, {
        page: 1,
        orderBy: true
      });
    });

    it('set queryPattern an empty object if no query string', () => {
      const dp = new DummyPattern('/url');
      parseQueryStub.restore();
      dp.parseQueryPattern();
      assert.deepEqual(dp.queryPattern, {});
    });
  });
});
