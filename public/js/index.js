
$(document).ready(function () {

  if(window.location.pathname === "/") {
    
    //register logic 

    console.log("al;sjfl;adjsf");

    $("#registerForm").on("submit", function(event) {

      console.log("register submitted");

      event.preventDefault();
      
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

  } else if (window.location.pathname === "/main") {

    var dataToUse;

    $.ajax("/getweather", {type:"GET"}).then(function(data){
      console.log(data);
      console.log(data.weatherData.weather[0].main);

      dataToUse = data;
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
        $('#modalHeader').addClass('cloudy-modal');
        $("#weatherIcon").addClass("fas fa-cloud fa-5x");
      } else if (weather.toLowerCase() === "clear") { //sunny weather
        $('body').css("background-image", "url(../images/sunny/sunny" + randomNum + ".jpg)");
        $('#modalHeader').addClass('sunny-modal');
        $("#weatherIcon").addClass("fas fa-sun fa-5x");
      } else if (weather.toLowerCase() === "rain") {
        $('body').css("background-image", "url(../images/rainy/rainy" + randomNum + ".jpg)");
        $('#modalHeader').addClass('rainy-modal');
        $("#weatherIcon").addClass("fas fa-cloud-showers-heavy fa-5x");
      }

      $("#location").text(data.weatherData.name);
      $("#weather").text(weather);
      $("#temp").text(Math.floor(tempF) + String.fromCharCode(176)+"F");
    });
    
    //TODO:
    //Spotify API call
    $("#playlistButton").on("click", function(){
      console.log(dataToUse);
      var modal = $("#modalBody");

      for(var i = 0; i < dataToUse.songsToUse.length; i++) {
        var songDiv = $("<div>");
        songDiv.addClass("songDiv");
        songDiv.addClass('row');

        var songTitle = $("<p>");
        songTitle.addClass('col-6');

        var artist = $("<p>");
        artist.addClass('col-6');

        var line = $("<hr>");

        songTitle.text(dataToUse.songsToUse[i].track.name);
        artist.text(dataToUse.songsToUse[i].track.artists[0].name);

        songDiv.append(songTitle).append(artist).append(line);
        modal.append(songDiv);
      }
    });
  }

 
});
