import { errorHandler } from '../../src/middleware/errorHandler.js';

describe('errorHandler', () => {
  it('returns standardized error response', () => {
    const err = new Error('Boom');
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    errorHandler(err, {}, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Boom' });
  });
});

