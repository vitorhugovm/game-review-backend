const db = require("../models");
const Reviews = db.reviews;
const Games = db.games;
const { body, validationResult } = require('express-validator');

exports.create = (req, res) => {
    const review = new Reviews({
        autor: req.body.autor,
        review: req.body.review,
        nota: req.body.nota,
        gameId: req.params.gameId
    });

    review
        .save(review)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Algum erro ocorreu ao criar a review."
            });
        });
};

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

    Reviews.find(condition)
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

    Reviews.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Reviews with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Reviews with id=" + id });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Reviews.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Reviews with id=${id}. Maybe Reviews was not found!`
                });
            } else res.send({ message: "Reviews was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Reviews with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Reviews.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Reviews with id=${id}. Maybe Reviews was not found!`
                });
            } else {
                res.send({
                    message: "Reviews was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Reviews with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Reviews.deleteMany({})
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

exports.findReviewsByGameID = (req, res) => {
    Reviews.find({ gameId: req.params.gameId })
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
