module.exports = app => {
    const reviews = require("../controllers/reviews.controller.js");
  
    const {validateUser} = require('../validators/user.validator.js');
  
    var router = require("express").Router();
  
    // Create a new game
    router.post('/reviews/:gameId', reviews.create);
  
    // Retrieve all reviews
    router.get("/", reviews.findAll);
  
    // Retrieve all published Tutorials
    router.get("/reviews/:gameId", reviews.findReviewsByGameID);
  
    // Retrieve a single Tutorial with id
    router.get("/:id", reviews.findOne);
  
    // Update a Tutorial with id
    router.put("/:id", reviews.update);
  
    // Delete a Tutorial with id
    router.delete("/:id", reviews.delete);
  
    // Create a new Tutorial
    router.delete("/reviews", reviews.deleteAll);
  
    app.use("/api", router);
  };
  