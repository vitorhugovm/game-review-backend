const db = require("../models");
const Games = db.games;
const { body, validationResult } = require('express-validator');

exports.create = (req, res) => {
  const game = new Games({
    nome: req.body.nome,
    resumo: req.body.resumo,
    desenvolvedor: req.body.desenvolvedor,
    genero: req.body.genero,
    plataforma: req.body.plataforma,
    imagem: req.body.imagem,
    nota: req.body.nota
  });

  game
    .save(game)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Algum erro ocorreu ao criar o jogo."
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Games.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Games.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Games with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Games with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Games.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Games with id=${id}. Maybe Games was not found!`
        });
      } else res.send({ message: "Games was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Games with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Games.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Games with id=${id}. Maybe Games was not found!`
        });
      } else {
        res.send({
          message: "Games was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Games with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Games.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

exports.findGamesByPlatform = (req, res) => {
  Games.find({ plataforma: req.params.platform })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum problema ao buscar os jogos."
      });
    });
};

exports.searchGames = (req, res) => {
  Games.find({
      [req.params.searchType]: new RegExp(req.params.search, 'i'),
    }).then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ocorreu algum problema ao buscar os jogos."
      });
    });
}
