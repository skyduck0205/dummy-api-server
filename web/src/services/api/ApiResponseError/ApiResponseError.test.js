import ApiResponseError from './ApiResponseError';

describe('ApiResponseError', () => {
  it('should set code, message, data', () => {
    const error = new ApiResponseError({
      code: 0,
      message: 'mock-message',
      data: 'mock-data',
    });
    expect(error.code).toBe(0);
    expect(error.message).toBe('mock-message');
    expect(error.data).toBe('mock-data');
  });

  it('should be an instance of Error', () => {
    const error = new ApiResponseError();
    expect(error).toBeInstanceOf(Error);
  });
});
