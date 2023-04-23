import mongoose from 'mongoose';

/* 
Crie um arquivo .env com os dados: MONGODB_URI="STRING DE CONEXÃO DO MONGODB"
OU
Substitua process.env.MONGODB_URI pela string de conexão
*/

const mongoDbUri = process.env.MONGODB_URI;

mongoose.set('strictQuery', false);
mongoose.connect(mongoDbUri);

let db = mongoose.connection;

export default db;
