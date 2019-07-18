
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
    var songObjectArray = [];
    var songIsPlaying = false;
    //var player = new Audio();
    var songAudio;

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
        var songObject = {};

        var songDiv = $("<div>");
        songDiv.addClass("songDiv");
        songDiv.addClass('row');

        var playButton = $("<i>");
        playButton.addClass('far fa-play-circle fa-lg');
        playButton.addClass('col-4');
        playButton.addClass('playbutton');

        var songTitle = $("<p>");
        songTitle.addClass('col-4');
        songTitle.addClass('songData');

        var artist = $("<p>");
        artist.addClass('col-4');
        artist.addClass('songData');

        var line = $("<hr>");

        // songObject.songTitle = dataToUse.songsToUse[i].track.name;
        // songObject.artistName = dataToUse.songsToUse[i].track.artists[0].name;
        // songObject.previewUrl = dataToUse.songsToUse[i].track.preview_url;

        // songObject.isPlaying = false;
        // songObject.isPaused = true;
        // songObjectArray.push(songObject);
        
        playButton.attr('data-title', dataToUse.songsToUse[i].track.name);
        playButton.attr('data-artist', dataToUse.songsToUse[i].track.artists[0].name);
        playButton.attr('data-url', dataToUse.songsToUse[i].track.preview_url);
        playButton.attr('data-isPlaying', "false");
        playButton.attr('data-isPaused', 'true');

        songTitle.text(dataToUse.songsToUse[i].track.name);
        artist.text(dataToUse.songsToUse[i].track.artists[0].name);

        songDiv.append(playButton).append(songTitle).append(artist).append(line);
        modal.append(songDiv);
      }

      $(".playbutton").on('click', function() {

        console.log("play button beting clicked");
        console.log($(this).attr('data-title'));
        //if no other songs are playing and the clicked song is paused
        if(!songIsPlaying && $(this).attr('data-isPaused') === 'true') {
          console.log("entering if statement");
          songAudio = new Audio();
          songAudio.src = $(this).attr('data-url');
          var playPromise = songAudio.play();
          if(playPromise !== undefined) {
            playPromise.then(() => {
              $(this).attr('data-isPlaying', "true");
              $(this).attr('data-isPaused', "false");
              songIsPlaying = true;
            }).catch(error => {
              throw error;
            });
          }
        } else if (songIsPlaying && $(this).attr('data-isPaused') === 'false' && $(this).attr('data-isPlaying') === 'true') {
          songAudio.pause();
          $(this).attr('data-isPaused', 'true');
          $(this).attr('data-isPlaying', 'false');
          songIsPlaying = false;
        }
      });

      console.log(songObjectArray);
    });

    //------------ end of if/else statement --------------- //
  }

 
});
