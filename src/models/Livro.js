import mongoose from 'mongoose';

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: { type: String, required: [true, 'O título do livro é obrigatório'] },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'autores',
    required: [true, 'O(a) autor(a) é obrigatório'],
  },
  editora: {
    type: String,
    required: [true, 'A editora é obrigatória'],
  },
  numeroPaginas: {
    type: Number,
    min: [3, 'Número de páginas deve estar entre 3 e 5000'],
    max: [5000, 'Número de páginas deve estar entre 3 e 5000'],
  },
});

const livros = mongoose.model('livros', livroSchema);

export default livros;
