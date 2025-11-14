import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../App';

const posts = [
  { id: '1', title: 'First', content: 'Hello', category: 'general' },
];

const server = setupServer(
  rest.get('/api/posts', (_req, res, ctx) => res(ctx.status(200), ctx.json(posts))),
  rest.post('/api/posts', async (req, res, ctx) => {
    const body = await req.json();
    if (!body.title) {
      return res(ctx.status(400), ctx.json({ error: 'Title required' }));
    }
    const newPost = { ...body, id: '2' };
    posts.push(newPost);
    return res(ctx.status(201), ctx.json(newPost));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App integration', () => {
  it('loads posts and creates a new one', async () => {
    render(<App />);

    await screen.findByText(/posts/i);

    fireEvent.change(screen.getByLabelText(/title/i), {
      target: { value: 'Integration' },
    });
    fireEvent.change(screen.getByLabelText(/content/i), {
      target: { value: 'Testing flows' },
    });
    fireEvent.change(screen.getByLabelText(/category/i), {
      target: { value: 'testing' },
    });

    fireEvent.click(screen.getByRole('button', { name: /create post/i }));

    await waitFor(() => expect(screen.getByText(/integration/i)).toBeInTheDocument());
  });

  it('handles server error states', async () => {
    server.use(
      rest.get('/api/posts', (_req, res, ctx) => res(ctx.status(500))),
    );

    render(<App />);

    await screen.findByRole('alert');
    expect(screen.getByRole('alert')).toHaveTextContent(/failed/i);
  });
});

