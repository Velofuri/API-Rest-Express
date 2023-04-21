import autores from '../models/Autor.js';

class AutoresController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    const id = req.params.id;
    try {
      const autoresResultado = await autores.findById(id);
      res.status(200).send(autoresResultado);
    } catch (erro) {
      next(erro);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const novoAutor = await autor.save();
      res.status(201).send(novoAutor.toJSON());
    } catch (erro) {
      next(erro);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndUpdate(id, { $set: req.body });

      if (autorResultado !== null) {
        res.status(200).send({ message: 'Autor atualizado com sucesso' });
      } else {
        next(new NaoEncontrado('Id do Autor não localizado.'));
      }
    } catch (erro) {
      next(erro);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;

      const autorResultado = await autores.findByIdAndDelete(id);

      if (autorResultado !== null) {
        res.status(200).send({ message: 'Autor removido com sucesso' });
      } else {
        next(new NaoEncontrado('Id do Autor não localizado.'));
      }
    } catch (erro) {
      next(erro);
    }
  };
}

export default AutoresController;
