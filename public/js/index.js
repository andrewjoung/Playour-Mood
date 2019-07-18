$(document).ready(function () {
  var username;
  
  
  if(window.location.pathname === "/") {
    
   
    $("#registerForm").on("submit", function(event) {

      console.log("register submitted");

      event.preventDefault();
      username=$("#userEmail").val();
      var newUser = {
        userEmail: $("#userEmail").val(),
        userPassword: $("#userPassword").val()
      };

      console.log($("#userEmail").val());
      console.log($("#userPassword").val());
      
      $.ajax("/database", {
        type: "POST",
        data: newUser
      }).then(function() {
        console.log("created new user");
      });
    });

    $('#signInButton').on('click',function(event){
      var newUser = {
        userEmail: $("#userEmail").val(),
        userPassword: $("#userPassword").val()
      };
      $.ajax("/database", {
        type: "GET",
        data: newUser
      }).then(function() {
        console.log("Checked");
      });

    })

    $("#saveSurvey").on("click", function(event) {

      console.log("survey submitted");

      event.preventDefault();

      var favGen=[];

      $.each($("#chk:checked"), function () {
        favGen.push($(this).val());
      });
      
      var newSurvey = {
        uname:username,
        fav_genre:favGen.join(','),
        rainy_choices:$('#rainyDayOptions option:selected').text(),
        cloudy_choices:$('#cloudyDayOptions option:selected').text(),
        sunny_choices:$('#sunnyDayOptions option:selected').text()
      };
      
      $.ajax("/database", {
        type: "PUT",
        data: newSurvey
      }).then(function() {
        console.log("created Survey");
      });
    });


  } else if (window.location.pathname === "/main") {

    $.ajax("/getweather", {type:"GET"}).then(function(data){
      console.log(data);
      console.log(data.weatherData.weather[0].main);
      //console.log(data.spotifyData.playlists);
      //console.log(data.spotifyData);
      //console.log(data.spotifyData);
      console.log(data.spotifyData);
      var weather = data.weatherData.weather[0].main;
      // var weather = "clear";
      var randomNum = Math.floor((Math.random() * 4) + 1);
      var tempK = data.weatherData.main.temp;
      var tempF = ((tempK - 273.15) * 9) / 5 + 32;
      console.log(tempF);
      console.log(window.location);
      if(weather.toLowerCase() === "clouds" || weather.toLowerCase() === "haze" || weather.toLowerCase() === "fog") {
        console.log("entering cloud if");
        $('body').css("background-image", "url(../images/cloudy/cloudy" + randomNum + ".jpg)");
        $("#weatherIcon").addClass("fas fa-cloud fa-5x");
      } else if (weather.toLowerCase() === "clear") { //sunny weather
        $('body').css("background-image", "url(../images/sunny/sunny" + randomNum + ".jpg)");
        $("#weatherIcon").addClass("fas fa-sun fa-5x");
      } else if (weather.toLowerCase() === "rain") {
        $('body').css("background-image", "url(../images/rainy/rainy" + randomNum + ".jpg)");
        $("#weatherIcon").addClass("fas fa-cloud-showers-heavy fa-5x");
      }

      $("#location").text(data.weatherData.name);
      $("#weather").text(weather);
      $("#temp").text(Math.floor(tempF) + String.fromCharCode(176)+"F");
    });
    
    //TODO:
    //Spotify API call
    $("#playlistButton").on("click", function(){
      
    });
  }

 
});
