import express from 'express';
import LivrosController from '../controllers/livrosController.js';

const router = express.Router();

router
  .get('/livros', LivrosController.listarLivros)
  .get('/livros/busca', LivrosController.listarLivroPorEditora)
  .get('/livros/:id', LivrosController.listarLivroPorId)
  .post('/livros', LivrosController.cadastrarLivros)
  .put('/livros/:id', LivrosController.atualizarLivro)
  .delete('/livros/:id', LivrosController.excluirLivro)

export default router;
