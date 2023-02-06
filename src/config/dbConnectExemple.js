import mongoose from 'mongoose';

mongoose.connect(
  'Dados do mongoDB'
);

let db = mongoose.connection;

export default db;
