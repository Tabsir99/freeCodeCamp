import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();



const connectDB = async () => {
  try {
    const client = new MongoClient(process.env.MONGODB);
    
    await client.connect();
    const db = client.db('freeCodeCamp_Projects');
    

    console.log('MongoDB connected...');

    return { db, client }
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};


export { connectDB };
