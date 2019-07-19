var db = require("../models");
var axios = require('axios');
var Spotify = require('node-spotify-api');
var sequelize = require('sequelize');
require('dotenv').config();

var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET,
});

module.exports = function (app) {
  // Get all examples
  app.post('/database',function(req,res){
    db.user_data.findOne({where:{uname:req.query.userEmail}}).then(function(result){
      console.log(result);
      if(result!=null){
        res.send({"result": true})
      }
      else{
        db.user_data.create({
          uname:req.body.userEmail,
          password:req.body.userPassword
        }).then(function(postData){
          res.json(postData);
        });
      }
    })
    

  });
  //{where:{[sequelize.Op.and]:[{uname:req.query.userEmail},{password:req.body.userPassword}]}}
  app.get('/database',function(req,res){

    console.log("In  app.get('/database',function(req,res){");
    console.log(req.query.userEmail);
    db.user_data.findOne({where:{[sequelize.Op.and]:[{uname:req.query.userEmail},{password:req.query.userPassword}]}}).then(function(result){
      console.log(result==null);
      if(result!=null){
        res.send(200, {"result": true})
      }else{
        res.send({"result":false})
      }

    });


  });

  app.get('/database/:user', function(req, res){

    var username = req.params.user;

    db.user_data.findOne({where:{uname: username}}).then(function(result){
      res.json(result);
    });

  });

  app.put('/database', function (req, res) {
    db.user_data.update(
      {
        fav_genre:req.body.fav_genre,
        rainy_choices:req.body.rainy_choices,
        cloudy_choices:req.body.cloudy_choices,
        sunny_choices:req.body.sunny_choices,
        zipcode:req.body.zipcode

      },{
        where:{
          uname:req.body.uname
        }
      }
    ).then(function (userData) {
      res.json(userData);
    })
  })

  app.get("/", function (req, res) {
    res.render("register");

  });

  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  //TODO:
  //Make the API specific to user location
  app.get("/getweather", function (req, res) {
    var apiKey = "3157d00bf198cb3d5c714f82d8eac54f";
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?zip=98006,us&appid=" + apiKey
    //var dataObject = {};
    console.log(queryUrl);
    axios.get(queryUrl).then(function (data) {
      // console.log(data.data);
      // console.log(queryUrl);
      //res.json(data.data);
      //dataObject.weatherData = data.data;
      //console.log(dataObject);
      //var weather = dataObject.weatherData.weather[0].main;
      //console.log(weather);
      var weather = data.data.weather[0].main;

      //console.log(musicData);

      var dataObject = {
        weatherData: data.data,
        //spotifyData: musicData
      }

      spotifyCall(weather, dataObject, res);

      //dataObject.spotifyData = data;
      //console.log(dataObject.spotifyData);
      //console.log(dataObject.spotifyData);
      //console.log(dataObject.spotifyData);

      //res.json(dataObject);
      // axios.get(//spotify route)
    }).catch(function (error) {
      throw error;
    });

  });

  app.get("/getweather/:zipcode/:cloudy/:rainy/:sunny/:genre", function(req, res) {
    var apiKey = "3157d00bf198cb3d5c714f82d8eac54f";
    var zip = req.params.zipcode;

    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?zip=" + zip +  ",us&appid=" + apiKey
    axios.get(queryUrl).then(function(data) {
      // console.log(data.data);
      // console.log(queryUrl);
      //res.json(data.data);
      //dataObject.weatherData = data.data;
      //console.log(dataObject);
      //var weather = dataObject.weatherData.weather[0].main;
      //console.log(weather);
      var weather = data.data.weather[0].main;
      
      //console.log(musicData);

      var dataObject = {
        weatherData: data.data,
        //spotifyData: musicData
      }

      var sentiment = [];

      if(weather.toLowerCase() === "clouds" || weather.toLowerCase() === "haze" || weather.toLowerCase() === "fog") {
        //TODO: Change this to use User preference for cloudy weather
        var weatherParams = req.params.cloudy;
        console.log(weatherParams);
        sentiment = weatherParams.split(', ');
        console.log(sentiment);

      } else if (weather.toLowerCase() === "clear") { //sunny weather
        //TODO: Change this to user user preference for sunny weather
        var weatherParams = req.params.sunny;
        console.log(weatherParams);
        sentiment = weatherParams.split(', ');
        console.log(sentiment);

      } else if (weather.toLowerCase() === "rain") {
        //TODO: Change this to use user preference for rainy weather
        var weatherParams = req.params.rainy;
        console.log(weatherParams);
        sentiment = weatherParams.split(', ');
        console.log(sentiment);
      }
      
      var genreString = req.params.genre;
      var genreArray = genreString.split(',');
      spotifyCall(sentiment, genreArray, dataObject, res);

      //dataObject.spotifyData = data;
      //console.log(dataObject.spotifyData);
      //console.log(dataObject.spotifyData);
      //console.log(dataObject.spotifyData);

      //res.json(dataObject);
      // axios.get(//spotify route)
    }).catch(function(error){
      throw error;
    });
  });

  app.post('/songs',function(req,res){
    db.favoriteSongs.create({
      uname:req.body.uname,
      song:req.body.song,
      weather:req.body.weather,
      artist:req.body.artist,
      url:req.body.url
    }).then(function(postData){
      res.json(postData);
    });
  });

  app.delete('/songs',function(req,res){
    db.favoriteSongs.destroy({
      where:{
        uname:req.body.uname,
        song:req.body.song,
        weather:req.body.weather
      }
    }).then(function(postData){
      res.json(postData);
    });
  });

  app.get('/songs',function(req,res){
    console.log(req.body.weather);
      db.favoriteSongs.findAll({
        where:{
          uname:req.query.uname,
          weather:req.query.weather
        }
      }).then(function(postData){
        res.send(postData);
      });
    
    
  })

  //TODO:
  //Spotify API call
  app.get("/getsongs", function (req, res) {

  });
  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};


function spotifyCall(sentiment, genre, dataObject, res) {

  //var sentiment = [];
  // var searchQuery = "https://api.spotify.com/v1/search?q=hip-hop+"
  var genreNum = Math.floor(Math.random() * genre.length);
  var genreToUse = genre[genreNum];

  var searchQuery = "https://api.spotify.com/v1/search?q=" + genreToUse.toLowerCase() + "+"

  // if(weather.toLowerCase() === "clouds" || weather.toLowerCase() === "haze" || weather.toLowerCase() === "fog") {
  //   //TODO: Change this to use User preference for cloudy weather
  //   sentiment.push("sad");
  //   sentiment.push("calm");
  //   sentiment.push("mellow");
  // } else if (weather.toLowerCase() === "clear") { //sunny weather
  //   //TODO: Change this to user user preference for sunny weather
  //   sentiment.push("happy");
  //   sentiment.push("exciting");
  //   sentiment.push("uplifting");
  // } else if (weather.toLowerCase() === "rain") {
  //   //TODO: Change this to use user preference for rainy weather
  //   sentiment.push("sad");
  //   sentiment.push("calm");
  //   sentiment.push("mellow");
  // }

  var randomNum = Math.floor(Math.random() * sentiment.length);
  console.log(sentiment[randomNum]);
  var randomSentiment = sentiment[randomNum];
  searchQuery += randomSentiment.toLowerCase();
  //searchQuery += ("+" + sentiment[1]);
  searchQuery += "&type=playlist&limit=5"

  console.log(searchQuery);

  spotify.request(searchQuery).then(function (data) {
    //console.log(data.playlists.items[0]);
    //console.log(data.tracks.items[0]);
    //return data.playlists;
    dataObject.spotifyData = data.playlists;
    //console.log(dataObject);
    //console.log(dataObject.spotifyData);
    getSongs(data.playlists, dataObject, res);

    //res.json(dataObject);
  }).catch(function (error) {
    throw error;
  });
}

function getSongs(playlist, dataObject, res) {
  var songs = [];
  var counter = 0;
  console.log("getSongs:" + dataObject);
  // for(var i = 0; i < 10; i++) {
  //   var randomNum = Math.floor((Math.random() * 5));
  //   var playlistToUse = playlist.items[randomNum];
  //   spotify.request(playlistToUse.tracks.href).then(function(data) {
  //     var randomSongNum = Math.floor((Math.random() * data.items.length));
  //     var randomSong = data.items[randomSongNum];
  //     //songs.push(randomSong);
  //     //console.log(data.items[randomSongNum]);
  //     console.log(randomSong);
  //     songs.push(randomSong);
  //   }).catch(function(error) {
  //     throw error;
  //   });
  // }
  //var object = dataObject;
  recursiveSongFunction(playlist, songs, counter, dataObject, res);
  //console.log(songs);
}

function recursiveSongFunction(playlist, songsArray, count, dataObject, res) {
  //var counter = count++;
  //console.log(counter);
  if (count === 10) {
    //console.log(songsArray);
    dataObject.songsToUse = songsArray;
    //return songsArray;
    //res.json(dataObject);
    res.json(dataObject);
  } else {
    var randomNum = Math.floor((Math.random() * 5));
    var playlistToUse = playlist.items[randomNum];
    spotify.request(playlistToUse.tracks.href).then(function (data) {
      var randomSongNum = Math.floor((Math.random() * data.items.length));
      var randomSong = data.items[randomSongNum];
      //songs.push(randomSong);
      //console.log(data.items[randomSongNum]);
      //console.log(randomSong);
      songsArray.push(randomSong);
      var counter = count + 1;
      //console.log(counter);
      recursiveSongFunction(playlist, songsArray, counter, dataObject, res);
    }).catch(function (error) {
      throw error;
    });
  }
}

// async function returnSongsArray(songs) {
//   var promise = new Promise((res, rej) => {

//   });
// }

// function buildSearchQuery(sentimentArray, searchQuery) {
//   for(var i = 0; i < sentimentArray.length; i++) {

//   }
// }