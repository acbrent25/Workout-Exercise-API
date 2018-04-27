jQuery(document).ready(function(){
    console.log('loaded');



    var queryURL = "https://raw.githubusercontent.com/acbrent25/Workout-Exercise-API/master/exercise.json"
    $.ajax({
      url: queryURL,
      method: "get"
    }).done(function(data) {
      console.log(data);
      console.log(data["muscle group"]);
      // exerciseResults(data.Search);
    }).done(function() {
      console.log('do something here')
    });


});