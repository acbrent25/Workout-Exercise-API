jQuery(document).ready(function(){
    console.log('loaded');



      $.getJSON( "https://raw.githubusercontent.com/acbrent25/Workout-Exercise-API/master/exercise.json", function( data ) {
        
        var muscleGroup = (data["exercises"]["muscle group"]);
        console.log(muscleGroup);

        for (var i =0; i < muscleGroup.length; i++) {
            muscleGroupArr = [];
            var chest = muscleGroup[0]["Group Name"];
            console.log('chest: ' + chest);
            var back = muscleGroup[1]["Group Name"];
            console.log('back: ' + back);
            
        }
        


       


      });

});