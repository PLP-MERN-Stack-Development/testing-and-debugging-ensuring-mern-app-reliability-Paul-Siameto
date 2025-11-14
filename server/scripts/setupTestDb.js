import mongoose from 'mongoose';

const uri = process.env.TEST_MONGODB_URI || 'mongodb://127.0.0.1:27017/mern-testing-test';

async function setup() {
  await mongoose.connect(uri);
  await mongoose.connection.dropDatabase();
  await mongoose.disconnect();
  console.log(`Test database ready at ${uri}`);
}

setup().catch((error) => {
  console.error('Failed to setup test database', error);
  process.exit(1);
});

