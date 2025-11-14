import { createPost } from '../../src/controllers/postController.js';
import Post from '../../src/models/Post.js';

jest.mock('../../src/models/Post.js');

describe('postController', () => {
  describe('createPost', () => {
    it('validates required fields', async () => {
      const req = { body: {}, user: { id: '123' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await createPost(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('creates post when payload valid', async () => {
      const post = { id: '1', title: 'Hello' };
      Post.create.mockResolvedValue(post);

      const req = {
        body: { title: 'Hello', content: 'World', category: 'general' },
        user: { id: 'user1' },
      };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

      await createPost(req, res);

      expect(Post.create).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(post);
    });
  });
});

