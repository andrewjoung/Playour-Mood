var db = require("../models");
var axios = require('axios');

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("register");
  });
  
  app.get("/main", function(req, res) {
    res.render("index");
  });

  app.get("/gsurvey", function(req, res){
    res.render("survey");
  });
  
  app.get("/survey", function(req, res) {
    res.render("survey");
  });
  
  app.get("/alreadyUser", function(req, res) {
    res.render("alreadyUser");
  });
  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

  
};
