import jwt from 'jsonwebtoken';

export function generateToken(user) {
  return jwt.sign({ id: user._id.toString() }, process.env.JWT_SECRET || 'dev-secret', {
    expiresIn: '1h',
  });
}

