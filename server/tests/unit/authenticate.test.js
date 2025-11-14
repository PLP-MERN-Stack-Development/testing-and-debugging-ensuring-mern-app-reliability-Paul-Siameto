import jwt from 'jsonwebtoken';
import { authenticate } from '../../src/middleware/authenticate.js';

describe('authenticate middleware', () => {
  it('returns 401 when token missing', () => {
    const req = { headers: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    authenticate(req, res, () => {});

    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('calls next when token valid', () => {
    const token = jwt.sign({ id: '123' }, 'dev-secret');
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {};
    const next = jest.fn();

    process.env.JWT_SECRET = 'dev-secret';
    authenticate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toEqual({ id: '123' });
  });
});

