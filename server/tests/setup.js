import mongoose from 'mongoose';

afterAll(async () => {
  if (mongoose.connection.readyState) {
    await mongoose.disconnect();
  }
});

