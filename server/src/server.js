import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app.js';
import logger from './utils/logger.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const DATABASE_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-testing';

async function bootstrap() {
  try {
    await mongoose.connect(DATABASE_URI);
    logger.info('Connected to MongoDB');

    app.listen(PORT, () => {
      logger.info(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    if (error.message.includes('ECONNREFUSED')) {
      logger.error('\n⚠️  MongoDB connection refused. Options:');
      logger.error('1. Install and start MongoDB locally');
      logger.error('2. Use MongoDB Atlas (see server/SETUP.md)');
      logger.error('3. For testing, use: npm test (tests work without MongoDB)\n');
    }
    process.exit(1);
  }
}

bootstrap();

