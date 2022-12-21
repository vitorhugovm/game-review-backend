module.exports = app => {
  const games = require("../controllers/games.controller.js");

  const {validateUser} = require('../validators/user.validator.js');

  var router = require("express").Router();

  // Create a new game
  //router.route('/').post(validateUser, games.create);
  router.post('/games', games.create);

  // Retrieve all games
  router.get("/", games.findAll);

  router.get("/search/:searchType/:search", games.searchGames)

  // Retrieve all published Tutorials
  router.get("/platforms/:platform", games.findGamesByPlatform);

  // Retrieve a single Tutorial with id
  router.get("/games/:id", games.findOne);

  // Update a Tutorial with id
  router.put("/:id", games.update);

  // Delete a Tutorial with id
  router.delete("/:id", games.delete);

  // Create a new Tutorial
  router.delete("/", games.deleteAll);

  app.use("/api", router);
};
