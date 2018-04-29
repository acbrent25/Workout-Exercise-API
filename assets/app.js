jQuery(document).ready(function(){
    console.log('loaded');

    var queryURL = "https://raw.githubusercontent.com/acbrent25/Workout-Exercise-API/master/exercise.json"
    $.ajax({
      url: queryURL,
      method: "get"
    }).done(function(data) {
      // console.log(data);
      var parseData = JSON.parse(data);
      var muscleGroupSelect = $('select#muscleGroupSelect');
      var exerciseSelect = $('select#exerciseSelect');
      var setSelect = $('select#setSelect');
      var setSection = $('#setsSection');
      var setsRow = $('#setsRow');
      var weightsRow = $('#weightsRow');
      
      // Add muscle groups to select
      $.each(parseData, function(key, val){
        console.log('key: ' + key);
        var option = "<option data-exercise=" + key + ">" + key + "</option>";
        muscleGroupSelect.append(option);

      });

      // Muscle group select function
      $(muscleGroupSelect).change(function(){
        // Clear out any options
        exerciseSelect.empty();

        // get selected option value
        var optionVal = $(this).find(':selected').data('exercise');
        console.log('optionval: ' + optionVal);
        
        // Switch the exercise select based on muscle chosen muscle group
        if (optionVal == 'chest'){
          chest();
        } else if (optionVal == 'back'){
          back();
        } else if (optionVal == 'abs'){
          abs();
        } else if (optionVal == 'biceps'){
          biceps();
        } else if (optionVal == 'shoulders'){
          shoulders();
        }
      });

      $(setSelect).change(function(){
        setSection.empty();
        // get selected option value
        var setVal = $(this).find(':selected').val();
        console.log('setVal: ' + setVal);
        
        var i = 0;
        while (i < setVal) {
          // Add Inputs for each set
          var setInput = '<div class="col"><input class="form-control" type="text" placeholder="1"></div>';

          var weightInput = '<div class="col"><input class="form-control" type="text" placeholder="1"></div>';
          
          setsRow.append(setInput);
          weightsRow.append(weightInput);

          i++;
          
        }



      });

      

      ///////////////////////////////////
      //    Set up exercise function
      ///////////////////////////////////

      function chest() {
        // Chest
        $.each(parseData.chest, function(key, val){
          console.log(val.exercise);
          var exerciseOption = "<option data-exercise=" + val.exercise + ">" + val.exercise + "</option>";
          exerciseSelect.append(exerciseOption);
        });
      }

      function back() {
        // Back
        $.each(parseData.back, function(key, val){
          console.log(val.exercise);
          var exerciseOption = "<option data-exercise=" + val.exercise + ">" + val.exercise + "</option>";
          exerciseSelect.append(exerciseOption);
        });
      }
      
      function abs() {
        // abs
        $.each(parseData.abs, function(key, val){
          console.log(val.exercise);
          var exerciseOption = "<option data-exercise=" + val.exercise + ">" + val.exercise + "</option>";
          exerciseSelect.append(exerciseOption);
        });
      }

      function biceps() {
        // biceps
        $.each(parseData.biceps, function(key, val){
          console.log(val.exercise);
          var exerciseOption = "<option data-exercise=" + val.exercise + ">" + val.exercise + "</option>";
          exerciseSelect.append(exerciseOption);
        });
      }

      function shoulders() {
        // shoulders
        $.each(parseData.shoulders, function(key, val){
          console.log(val.exercise);
          var exerciseOption = "<option data-exercise=" + val.exercise + ">" + val.exercise + "</option>";
          exerciseSelect.append(exerciseOption);
        });
      }

      
      

      

      // exerciseResults(data.Search);
    });
    


});