const assert = require('assert');
const sinon = require('sinon');
const _ = require('lodash');
const DummyRouter = require('../dummy-router');
const DummyPattern = require('../dummy-pattern');

describe('DummyRouter', () => {
  describe('constructor', () => {
    let updatePatternsStub;

    beforeEach(() => {
      updatePatternsStub = sinon.stub(DummyRouter.prototype, 'updatePatterns');
    });

    afterEach(() => {
      updatePatternsStub.restore();
    });

    it('init attributes and call updatePatterns', () => {
      const apis = [{}];
      const dp = new DummyRouter(apis);
      assert.equal(dp.apis, apis);
      assert.deepEqual(dp.patterns, []);
      assert(updatePatternsStub.called);
    });
  });

  describe('updatePattern', () => {
    let updatePatternsStub;

    beforeEach(() => {
      updatePatternsStub = sinon.stub(DummyRouter.prototype, 'updatePatterns');
    });

    afterEach(() => {
      updatePatternsStub.restore();
    });

    it('pattern items are instances of DummyPattern', () => {
      const apis = [
        { path: '/api/0', normalizedPath: '/api/0' },
        { path: '/api/1', normalizedPath: '/api/1' }
      ];
      const dp = new DummyRouter(apis);
      updatePatternsStub.restore();
      dp.updatePatterns();
      assert(_.every(dp.patterns, p => p instanceof DummyPattern));
    });

    it('should remove duplicated paths', () => {
      const apis = [
        { path: '/api/0', normalizedPath: '/api/0' },
        { path: '/api/0', normalizedPath: '/api/0' },
        { path: '/api/1', normalizedPath: '/api/1' }
      ];
      const dp = new DummyRouter(apis);
      updatePatternsStub.restore();
      dp.updatePatterns();
      assert(dp.patterns.length === 2);
      assert.equal(dp.patterns[0].path, '/api/0');
      assert.equal(dp.patterns[1].path, '/api/1');
    });
  });

  describe('getMatchedPatterns', () => {
    let matchStub;

    beforeEach(() => {
      matchStub = sinon.stub(DummyPattern.prototype, 'match');
    });

    afterEach(() => {
      matchStub.restore();
    });

    describe('filter matched patterns', () => {
      it('get all matched patterns', () => {
        const apis = [
          { path: '/api/0', normalizedPath: '/api/0' },
          { path: '/api/1', normalizedPath: '/api/1' },
          { path: '/api/2', normalizedPath: '/api/2' }
        ];
        const dp = new DummyRouter(apis);
        matchStub.returns(true);
        const matched = dp.getMatchedPatterns('', {});
        assert(matched.length === 3);
        assert.equal(matched[0].path, '/api/0');
        assert.equal(matched[1].path, '/api/1');
        assert.equal(matched[2].path, '/api/2');
      });

      it('drop patterns which DummyPattern.match return false', () => {
        const apis = [
          { path: '/api/0', normalizedPath: '/api/0' },
          { path: '/api/1', normalizedPath: '/api/1' },
          { path: '/api/2', normalizedPath: '/api/2' }
        ];
        const dp = new DummyRouter(apis);
        matchStub
          .onFirstCall().returns(false)
          .onSecondCall().returns(false)
          .onThirdCall().returns(true);
        const matched = dp.getMatchedPatterns('', {});
        assert(matched.length === 1);
        assert.equal(matched[0].path, '/api/2');
      });
    });

    describe('order patterns', () => {
      beforeEach(() => {
        matchStub.returns(true);
      });

      it('first order by urlParamsLength(asc)', () => {
        const mockPatterns = [
          { urlParamsLength: 2, strictQueryParamsLength: 0, looseQueryParamsLength: 10, match: () => true },
          { urlParamsLength: 3, strictQueryParamsLength: 10, looseQueryParamsLength: 0, match: () => true },
          { urlParamsLength: 1, strictQueryParamsLength: 0, looseQueryParamsLength: 20, match: () => true },
        ];
        const dp = new DummyRouter([]);
        dp.patterns = mockPatterns;
        const matched = dp.getMatchedPatterns('', {});
        assert.deepEqual(_.map(matched, 'urlParamsLength'), [1, 2, 3]);
      });

      it('second order by strictQueryParamsLength(desc)', () => {
        const mockPatterns = [
          { urlParamsLength: 0, strictQueryParamsLength: 2, looseQueryParamsLength: 20, match: () => true },
          { urlParamsLength: 0, strictQueryParamsLength: 3, looseQueryParamsLength: 0, match: () => true },
          { urlParamsLength: 0, strictQueryParamsLength: 1, looseQueryParamsLength: 10, match: () => true },
        ];
        const dp = new DummyRouter([]);
        dp.patterns = mockPatterns;
        const matched = dp.getMatchedPatterns('', {});
        assert.deepEqual(_.map(matched, 'strictQueryParamsLength'), [3, 2, 1]);
      });

      it('third order by looseQueryParamsLength(desc)', () => {
        const mockPatterns = [
          { urlParamsLength: 0, strictQueryParamsLength: 0, looseQueryParamsLength: 2, match: () => true },
          { urlParamsLength: 0, strictQueryParamsLength: 0, looseQueryParamsLength: 3, match: () => true },
          { urlParamsLength: 0, strictQueryParamsLength: 0, looseQueryParamsLength: 1, match: () => true },
        ];
        const dp = new DummyRouter([]);
        dp.patterns = mockPatterns;
        const matched = dp.getMatchedPatterns('', {});
        assert.deepEqual(_.map(matched, 'looseQueryParamsLength'), [3, 2, 1]);
      });
    });
  });

  describe('getMatchedAPI', () => {
    let matchPatternStub;

    beforeEach(() => {
      matchPatternStub = sinon.stub(DummyRouter.prototype, 'getMatchedPatterns')
        .returns([
          { path: '/api/0' },
          { path: '/api/1' },
          { path: '/api/2' }
        ]);
    });

    afterEach(() => {
      matchPatternStub.restore();
    });

    it('filter disabled API', () => {
      const apis = [
        { method: 'GET', path: '/api/0', disabled: true },
        { method: 'GET', path: '/api/1', disabled: true },
        { method: 'GET', path: '/api/2', disabled: false }
      ];
      const dp = new DummyRouter(apis);
      const api = dp.getMatchedAPI('GET', '', {});
      assert.equal(api, apis[2]);
    });

    it('filter APIs with method', () => {
      const apis = [
        { method: 'GET', path: '/api/0', disabled: true },
        { method: 'POST', path: '/api/1', disabled: false },
        { method: 'GET', path: '/api/2', disabled: false }
      ];
      const dp = new DummyRouter(apis);
      const api = dp.getMatchedAPI('GET', '', {});
      assert.equal(api, apis[2]);
    });

    it('filter APIs by intersection of patterns paths and apis paths', () => {
      const apis = [
        { method: 'GET', path: '/api/20', disabled: false },
        { method: 'GET', path: '/api/1', disabled: false },
        { method: 'GET', path: '/api/30', disabled: false }
      ];
      const dp = new DummyRouter(apis);
      const api = dp.getMatchedAPI('GET', '', {});
      assert.equal(api, apis[1]);
    });

    it('filter APIs by intersection of patterns paths and apis paths with order of matched api', () => {
      const apis = [
        { method: 'GET', path: '/api/20', disabled: false },
        { method: 'GET', path: '/api/2', disabled: false },
        { method: 'GET', path: '/api/1', disabled: false },
        { method: 'GET', path: '/api/30', disabled: false }
      ];
      const dp = new DummyRouter(apis);
      const api = dp.getMatchedAPI('GET', '', {});
      assert.equal(api, apis[2]);
    });

    it('return first matched API', () => {
      const apis = [
        { method: 'GET', path: '/api/0', disabled: false },
        { method: 'GET', path: '/api/1', disabled: false },
        { method: 'GET', path: '/api/2', disabled: false }
      ];
      const dp = new DummyRouter(apis);
      const api = dp.getMatchedAPI('GET', '', {});
      assert.equal(api, apis[0]);
    });
  });

  describe('getCurrentResponse', () => {
    let matchAPIStub;

    beforeEach(() => {
      matchAPIStub = sinon.stub(DummyRouter.prototype, 'getMatchedAPI');
    });

    afterEach(() => {
      matchAPIStub.restore();
    });

    it('return null if no api found', () => {
      matchAPIStub.returns(null);
      const dp = new DummyRouter();
      const api = dp.getCurrentResponse('GET', '', {});
      assert(matchAPIStub.calledOnceWith('GET', '', {}));
      assert.equal(api, null);
    });

    it('return api response by current response id', () => {
      matchAPIStub
        .returns({
          currentResponseID: 'id-1',
          responses: [
            { id: 'id-0' },
            { id: 'id-1' }
          ]
        });
      const dp = new DummyRouter();
      const api = dp.getCurrentResponse('GET', '', {});
      assert.deepEqual(api, { id: 'id-1' });
    });

    it('return null if response id not found', () => {
      matchAPIStub
        .returns({
          currentResponseID: 'id-3',
          responses: [
            { id: 'id-0' },
            { id: 'id-1' }
          ]
        });
      const dp = new DummyRouter();
      const api = dp.getCurrentResponse('GET', '', {});
      assert.equal(api, null);
    });
  });
});
