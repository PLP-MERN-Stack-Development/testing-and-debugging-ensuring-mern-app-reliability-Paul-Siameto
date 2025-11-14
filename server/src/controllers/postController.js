import slugify from 'slugify';
import Post from '../models/Post.js';

export async function createPost(req, res) {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const post = await Post.create({
    title,
    content,
    category,
    slug: slugify(`${title}-${Date.now()}`),
    author: req.user.id,
  });

  return res.status(201).json(post);
}

export async function getPosts(req, res) {
  const { category, page = 1, limit = 10 } = req.query;
  const query = {};
  if (category) {
    query.category = category;
  }

  const posts = await Post.find(query)
    .skip((page - 1) * limit)
    .limit(Number(limit))
    .sort({ createdAt: -1 });

  res.json(posts);
}

export async function getPostById(req, res) {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
}

export async function updatePost(req, res) {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  ['title', 'content', 'category'].forEach((field) => {
    if (req.body[field]) {
      post[field] = req.body[field];
    }
  });

  await post.save();
  res.json(post);
}

export async function deletePost(req, res) {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }

  if (post.author.toString() !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized' });
  }

  await post.deleteOne();
  res.json({ message: 'Post deleted' });
}

