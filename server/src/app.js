import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'express-async-errors';
import postsRouter from './routes/posts.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import logger from './utils/logger.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(
  morgan('dev', {
    stream: {
      write: (message) => logger.http(message.trim()),
    },
  }),
);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/posts', postsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;

