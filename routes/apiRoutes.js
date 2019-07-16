var db = require("../models");
var axios = require('axios');

module.exports = function(app) {
  // Get all examples
  app.post('/database',function(req,res){
    console.log("in route /database");
    db.user_data.create({
      uname:req.body.userEmail,
      password:req.body.userPassword
    }).then(function(postData){
      res.json(postData);
    });
  });

  app.get("/", function(req, res) {
    res.render("register");
  });

  app.get("/api/examples", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/getweather",function(req, res) {
    var apiKey = "3157d00bf198cb3d5c714f82d8eac54f";
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?zip=98006,us&appid=" + apiKey
    console.log(queryUrl);
    axios.get(queryUrl).then(function(data) {
      console.log(data.data);
      console.log(queryUrl);
      res.json(data.data);
    }).catch(function(error){
      throw error;
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
