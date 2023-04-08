import mongoose from 'mongoose';

const mongoDbUri = process.env.MONGODB_URI;

mongoose.connect(mongoDbUri);

let db = mongoose.connection;

export default db;
