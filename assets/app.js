jQuery(document).ready(function(){
    console.log('loaded');



    var queryURL = "https://raw.githubusercontent.com/acbrent25/Workout-Exercise-API/master/exercise.json"
    $.ajax({
      url: queryURL,
      method: "get"
    }).done(function(data) {
      // console.log(data);
      var msg = ''
      var parseData = JSON.parse(data);
      $.each(parseData.chest, function(key, val){
        console.log(val.exercise);
      });

      

      // exerciseResults(data.Search);
    });
    


});