import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import manipulador404 from './middlewares/manipulador404.js';
import manipuladorDeErros from './middlewares/manipuladorDeErros.js';

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso');
});

const app = express();
routes(app);

app.use(manipulador404, manipuladorDeErros)

// app.use(manipuladorDeErros)

export default app;
