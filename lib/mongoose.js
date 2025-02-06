import mongoose from 'mongoose';

const connectionToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MongoURL);
    console.log('Connected to MongoDB');
  } catch (e) {
    console.log(e);
  }
};

export default connectionToDatabase;
