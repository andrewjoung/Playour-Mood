//TODO:
//side nav 
var username;

$(document).ready(function () {
  
  var username;
  var userPassword;
  var fav_songs=[];
  
  
  if(window.location.pathname === "/") {
    
   
    

    $('#signIn').on("click",function(event){

      event.preventDefault();
      
      console.log("In sign In");
     
      var newUser = {
        userEmail: $("#userEmail").val(),
        userPassword: $("#userPassword").val()
      };
     // console.log(newUser.userEmail);
     // console.log($("#userPassword").val());
    
      $.ajax("/database?userEmail=" + newUser.userEmail+"?userPassword="+newUser.userPassword, {
        method: "GET",
        data: newUser
      }).then(function(data) {
        //console.log(data);
        console.log("created new user");
        if(data.result){
          username=newUser.userEmail;
          userPassword=newUser.userPassword;
          localStorage.clear();
          localStorage.setItem("username", username);
          window.location.href = "/main"
        }
        else{
          window.location.href = "/404"
        }
        //window.location.href = "http://localhost:9800/main";
       
      });
    });


    $("#registerButton").on("click", function(event) {

      console.log("register submitted");

      event.preventDefault();
      localStorage.setItem('username',$("#userEmail").val());
      username=$("#userEmail").val();
      var newUser = {
        userEmail: $("#userEmail").val(),
        userPassword: $("#userPassword").val()
      };

      console.log($("#userEmail").val());
      console.log($("#userPassword").val());
      
      $.ajax("/database?userEmail=" + newUser.userEmail, {
        type: "POST",
        data: newUser
      }).then(function(data) {
        if(data.result){
          window.location.href="/alreadyUser"
        }else{
          localStorage.clear();
          localStorage.setItem("username", username);
          window.location.href="/survey";
        }
      });
    });

  } else if (window.location.pathname === "/survey") {
    
    $("#saveSurvey").on("click", function(event) {

      console.log("survey submitted");

      event.preventDefault();

      var favGen=[];

      $.each($("#chk:checked"), function () {
        favGen.push($(this).val());
      });
      
      var newSurvey = {
        uname:localStorage.getItem('username'),
        fav_genre:favGen.join(','),
        rainy_choices:$('#rainyDayOptions option:selected').text(),
        cloudy_choices:$('#cloudyDayOptions option:selected').text(),
        sunny_choices:$('#sunnyDayOptions option:selected').text(),
        zipcode:$('#zip').val()
      };
      
      $.ajax("/database", {
        type: "PUT",
        data: newSurvey
      }).then(function(data) {
        console.log("created Survey");
        window.location.href = "/main"
      });
    });

  } else if (window.location.pathname === "/main") {

    var dataToUse;
    var songObjectArray = [];
    var songIsPlaying = false;
    //var player = new Audio();
    var songAudio;
    var favSongs=[];

    console.log(localStorage.getItem("username"));
    var specificUser = localStorage.getItem("username");

    $.ajax("/database/" + specificUser, {type:"GET"}).then(function(data){
      //console.log("User data" + data);
      console.log(data);
      var ajaxURL = "/getweather/" + data.zipcode + "/" + data.cloudy_choices + "/" + data.rainy_choices + "/" + data.sunny_choices + "/" + data.fav_genre;
      $.ajax(ajaxURL , {type:"GET"}).then(function(data){
        console.log(data);
        console.log(data.weatherData.weather[0].main);
        localStorage.setItem('weather',data.weatherData.weather[0].main);
  
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
    });

    /* Set the width of the side navigation to 250px and the left margin of the page content to 250px and add a black background color to body */
    function openNav() {
      //$("#mySidenav").style.width = "250px";
      $("#mySidenav").css('width', '250px');
      //document.getElementById("main").style.marginLeft = "250px";
      $('#mainContent').css('margin-right', '250px');
      //$('body').style.backgroundColor = "rgba(0,0,0,0.4)";
      $('body').css('background-color', 'rgba(0,0,0,0.4)');
    }

    /* Set the width of the side navigation to 0 and the left margin of the page content to 0, and the background color of body to white */
    function closeNav() {
      //$("#mySidenav").style.width = "0";
      $("#mySidenav").css('width', '0');
      //document.getElementById("main").style.marginLeft = "0";
      $('#mainContent').css('margin-right', '0');
      //$('body').style.backgroundColor = "white";
      $('body').css('background-color', 'white');
    }

    $("#userIcon").on('click', function() {
      
      openNav();
      console.log("icon clicked");
    });

    $('.closebtn').on('click', function() {
        closeNav();
    });

    $('#cloudy').on('click',function(){
      console.log('you clicked on cloudy');
      var userSongs = {
        uname: localStorage.getItem('username'),
        weather:'Clouds'
      };
      $.ajax("/songs?uname="+localStorage.getItem('username')+"?weather="+userSongs.weather, {
        type: "GET",
        data: userSongs
      }).then(function(data) {
        console.log(data);
        $("#weatherModalLabel").text("Your Cloudy Playlist");
        $('#weatherModalHeader').attr('class','modal-header cloudy-modal');
        displaySavedSongs(data);
        closeNav();
      });
    });

    $('#rainy').on('click',function(){
      console.log('you clicked on Rainy');
      var userSongs = {
        uname: localStorage.getItem('username'),
        weather:'Rain'
      };
      $.ajax("/songs?uname="+localStorage.getItem('username')+"?weather="+userSongs.weather, {
        type: "GET",
        data: userSongs
      }).then(function(data) {
        console.log(data);
        $("#weatherModalLabel").text("Your Rainy Playlist");
        $('#weatherModalHeader').attr('class','modal-header rainy-modal');
        displaySavedSongs(data);
        closeNav();
      });
    });

    $('#sunny').on('click',function(){
      console.log('you clicked on sunny');
      var userSongs = {
        uname: localStorage.getItem('username'),
        weather:'Clear'
      };
      $.ajax("/songs?uname="+localStorage.getItem('username')+"?weather="+userSongs.weather, {
        type: "GET",
        data: userSongs
      }).then(function(data) {
        console.log(data);
        $("#weatherModalLabel").text("Your Sunny Playlist");
        $('#weatherModalHeader').attr('class','modal-header sunny-modal');
        displaySavedSongs(data);
        closeNav();
      });
    });

    function displaySavedSongs(data) {
      $("#weatherModalBodyContent").empty();
      for(var i = 0; i < data.length; i++) {
        var songDiv = $("<div>");
        songDiv.addClass("songDiv");
        songDiv.addClass('row');
  
        var playButton = $("<i>");
        playButton.addClass('far fa-play-circle fa-lg');
        playButton.addClass('col-2');
        playButton.addClass('playbutton');
  
        var songTitle = $("<p>");
        songTitle.addClass('col-4');
        songTitle.addClass('songTitle');
  
        var artist = $("<p>");
        artist.addClass('col-4');
        artist.addClass('songData');
  
        var line = $("<hr>");

        songTitle.text(data[i].song);
        artist.text(data[i].artist);

        playButton.attr('data-url', data[i].url);

        songDiv.append(playButton).append(songTitle).append(artist).append(line);
        $("#weatherModalBodyContent").append(songDiv);
      }
    }
    
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
        playButton.addClass('col-2');
        playButton.addClass('playbutton');

        var likeButton = $("<i>");
        likeButton.addClass('fa fa-heart-o');
        likeButton.addClass('col-2');
        likeButton.addClass('likebutton');
        likeButton.attr('song-name',dataToUse.songsToUse[i].track.name);
        likeButton.attr('state-of-button','not');
        likeButton.attr('artist',dataToUse.songsToUse[i].track.artists[0].name);
        likeButton.attr('url',dataToUse.songsToUse[i].track.preview_url);
  

        var songTitle = $("<p>");
        songTitle.addClass('col-4');
        songTitle.addClass('songTitle');

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

        songDiv.append(playButton).append(likeButton).append(songTitle).append(artist).append(line);
        modal.append(songDiv);
      }

      function toggleHeart(x){
        x.toggleClass('fa-heart fa-heart-o');
      }

      $(".likebutton").each(function(index){
        
        $(this).on('click',function(){
         if($(this).attr('state-of-button')=='not'){
           
           console.log("if($(this).attr('state-of-button')==='not')");
           $(this).toggleClass('fa-heart fa-heart-o');
           $(this).attr('state-of-button','yes');
            if(localStorage.getItem('weather').toLocaleLowerCase()==='haze'||localStorage.getItem('weather').toLocaleLowerCase()==='clouds'||localStorage.getItem('weather').toLocaleLowerCase()==='fog'){
              var userSongs = {
                uname: localStorage.getItem('username'),
                song:$(this).attr('song-name'),
                weather:"Clouds",
                artist: $(this).attr('artist'),
                url:$(this).attr('url')
              };
              $.ajax("/songs", {
                type: "POST",
                data: userSongs
              }).then(function(data) {
                console.log("Entered to database");
                // if(data.result){
                //   window.location.href="http://localhost:9800/alreadyUser"
                // }else{
                //   window.location.href="http://localhost:9800/survey"
                // }
              });
            }else{
              var userSongs = {
                uname: localStorage.getItem('username'),
                song:$(this).attr('song-name'),
                weather:localStorage.getItem('weather'),
                artist: $(this).attr('artist'),
                url:$(this).attr('url')
              };
              $.ajax("/songs", {
                type: "POST",
                data: userSongs
              }).then(function(data) {
                console.log("Entered to database");
                // if(data.result){
                //   window.location.href="http://localhost:9800/alreadyUser"
                // }else{
                //   window.location.href="http://localhost:9800/survey"
                // }
              });

            }

            
         }else if($(this).attr('state-of-button')=='yes'){
          console.log("else");
          $(this).toggleClass('fas fa-heart-o');
          $(this).attr('state-of-button','not');

          var userSongs = {
            uname: localStorage.getItem('username'),
            song:$(this).attr('song-name'),
            weather:localStorage.getItem('weather')
          };
          $.ajax("/songs", {
            type: "DELETE",
            data: userSongs
          }).then(function(data) {
            console.log("Deleted to database");
            // if(data.result){
            //   window.location.href="http://localhost:9800/alreadyUser"
            // }else{
            //   window.location.href="http://localhost:9800/survey"
            // }
          });

         }

        });
        
      });
     

      //TODO: 
      //When a song is playing and you click on the other song, pause the currently playing song and play the new song
      //Whnen a song is done playing change it back to playable and then allow for another song to be able to play
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
              $(this).attr("class", "far fa-pause-circle fa-lg col-2 playbutton");
            }).catch(error => {
              throw error;
            });
          }
        } else if (songIsPlaying && $(this).attr('data-isPaused') === 'false' && $(this).attr('data-isPlaying') === 'true') {
          songAudio.pause();
          $(this).attr('data-isPaused', 'true');
          $(this).attr('data-isPlaying', 'false');
          songIsPlaying = false;
          $(this).attr("class", "far fa-play-circle fa-lg col-2 playbutton");
        }
      });

      console.log(songObjectArray);
    });






    //------------ end of if/else statement --------------- //
  }else if(window.location.pathname === "/alreadyUser"){

    $('#signIn').on("click",function(event){
      console.log("In sign In");
     
      var newUser = {
        userEmail: $("#userEmail").val(),
        userPassword: $("#userPassword").val()
      };
     // console.log(newUser.userEmail);
     // console.log($("#userPassword").val());
    
      $.ajax("/database?userEmail=" + newUser.userEmail+"?userPassword="+newUser.userPassword, {
        method: "GET",
        data: newUser
      }).then(function(data) {
        //console.log(data);
        console.log("created new user");
        if(data.result){
          username=newUser.userEmail;
          userPassword=newUser.userPassword;
          window.location.href = "/main"
        }
        else{
          window.location.href = "/404"
        }
        //window.location.href = "http://localhost:9800/main";
       
      });
    });
  }

 
});
