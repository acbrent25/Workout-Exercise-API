jQuery(document).ready(function(){
    console.log('loaded');



    var queryURL = "https://raw.githubusercontent.com/acbrent25/Workout-Exercise-API/master/exercise.json"
    $.ajax({
      url: queryURL,
      method: "get"
    }).done(function(data) {
      console.log(data);
      

      var obj = JSON.parse(data)

      for (key in data) {
        var muscleGroup = data[key];
        console.log(muscleGroup);
      }

      // exerciseResults(data.Search);
    });
    


});