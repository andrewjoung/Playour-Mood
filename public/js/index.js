// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);

$(document).ready(function(){

  if(window.location.pathname === "/") {
    
    //register logic 

  } else if (window.location.pathname === "/main") {

    $.ajax("/getweather", {type:"GET"}).then(function(data){
      console.log(data);
      console.log(data.weather[0].main);

      var weather = data.weather[0].main;
      // var weather = "clear";
      var randomNum = Math.floor((Math.random() * 4) + 1);
      var tempK = data.main.temp;
      var tempF = ((tempK - 273.15) * 9) / 5 + 32;
      console.log(tempF);
      console.log(window.location);
      if(weather.toLowerCase() === "clouds" || weather.toLowerCase() === "haze" || weather.toLowerCase() === "fog") {
        console.log("entering cloud if");
        $('body').css("background-image", "url(../images/cloudy/cloudy" + randomNum + ".jpg)");
        $("#weatherIcon").addClass("fas fa-cloud fa-5x");
      } else if (weather.toLowerCase() === "clear") { //sunny weather
        $('body').css("background-image", "url(../images/sunny/sunny" + randomNum + ".jpg)");
      } else if (weather.toLowerCase() === "rain") {
        $('body').css("background-image", "url(../images/rainy/rainy" + randomNum + ".jpg)");
      }

      $("#location").text(data.name);
      $("#weather").text(weather);
      $("#temp").text(Math.floor(tempF) + String.fromCharCode(176)+"F");
    });
    
    //TODO:
    //Spotify API call
    $("#playlistButton").on("click", function(){
      
    });
  }

});