import livros from '../models/Livro.js';
import autores from '../models/Autor.js';

class LivrosController {
  static listarLivros = async (req, res, next) => {
    try {
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();

    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findById(id).populate('autor', 'nome').exec();

      if (livroResultado !== null) {
        res.status(200).send(livroResultado);
      } else {
        next(new NaoEncontrado('Id do livro não localizado.'));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarLivros = async (req, res, next) => {
    try {
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id, { $set: req.body });

      if (livroResultado !== null) {
        res.status(200).send({ message: 'Livro atualizado com sucesso' });
      } else {
        next(new NaoEncontrado('Id do livro não localizado.'));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id);

      if (livroResultado !== null) {
        res.status(200).send({ message: 'Livro removido com sucesso' });
      } else {
        next(new NaoEncontrado('Id do livro não localizado.'));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query);

      if (busca !== null) {
        const livrosResultado = livros.find(busca).populate('autor');
        
        req.resultado = livrosResultado;
        
        next();
      } else {
        res.status(200).send([]);
      }
    } catch (erro) {
      next(erro);
    }
  };
}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  const regexTitulo = new RegExp(titulo, 'i'); // parametro 'i' desconsidera o case sensitive
  const regexEditora = new RegExp(editora, 'i'); // parametro 'i' desconsidera o case sensitive
  const regexAutor = new RegExp(nomeAutor, 'i'); // parametro 'i' desconsidera o case sensitive

  const busca = {};

  if (editora) busca.editora = regexEditora;
  if (titulo) busca.titulo = regexTitulo;

  if (minPaginas || maxPaginas) busca.numeroPaginas = {};

  //$gte é um operador do mongo que significa Maior ou Igual que
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas;
  //$lte é um operador do mongo que significa Menor ou Igual que
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas;

  if (nomeAutor) {
    const autor = await autores.findOne({ nome: regexAutor });

    if (autor !== null) {
      busca.autor = autor._id;
    } else {
      busca.autor = null;
    }
  }

  return busca;
}

export default LivrosController;
