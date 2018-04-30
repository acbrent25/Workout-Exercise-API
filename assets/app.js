jQuery(document).ready(function(){
    console.log('loaded');

    var id = 0;

    // console.log(data);
    $('#selectRow').empty();

    $('body').on('click', 'i.fas.fa-plus-square', function(){
        id++
        addExercise(id);
    });



    function addExercise() {
      var queryURL = "https://raw.githubusercontent.com/acbrent25/Workout-Exercise-API/master/exercise.json"
      $.ajax({
        url: queryURL,
        method: "get"
      }).done(function(data) {

        console.log('id: ' + id);
      
      // Add Constructors
      muscleGroupConstructor();
      exerciseConstructor();
      setsConstructor();
      setSectionConstructor();

      // Row for each exercise group
      var constainerRow = $('<div/>',{
        'class' : 'row',
        'id'    : id + 'selectRow',
      }).appendTo('#appWell');
      
      // Set up variables
      var parseData = JSON.parse(data);
      var muscleGroupSelect = $('select#muscleGroupSelect');
      var exerciseSelect = $('select#exerciseSelect');
      var setSelect = $('select#setSelect');
      var setSection = $('#setSection');
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

      // Add Weight and Rep count for # of sets selected
      $(setSelect).change(function(){
        setsRow.empty();
        weightsRow.empty();
        // get selected option value
        var setVal = $(this).find(':selected').val();
        console.log('setVal: ' + setVal);
        
        var i = 0;
        while (i < setVal) {
          // Add Inputs for each set
          var setInput = '<div class="col"><input class="form-control" type="text" placeholder=""></div>';

          var weightInput = '<div class="col"><input class="form-control" type="text" placeholder=""></div>';
          
          setsRow.append(setInput);
          weightsRow.append(weightInput);

          i++;
          
        }
      });

      ///////////////////////////////////
      //    Set up exercise function
      //    Ads Exercises to Selects
      //    From JSON data
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

    // Muscle Group Constructor Function
    function muscleGroupConstructor() {
      
      var div = $('<div/>', {
        'class' : 'col'
      });
      var form = $('<form/>');
      div.append(form);
      var formGroup = $('<div/>', {
        'class': 'form-group'
      }).appendTo(form);
      var label = $('<label/>',{
        'for': 'muscleGroupSelect',
        text: 'Muscle Group'
      }).appendTo(formGroup);
      var select = $('<select/>', {
        'class' : 'form-control',
        'id' : 'muscleGroupSelect'
      }).appendTo(formGroup);
      var selectDefault = $('<option/>',{
        'value' : 0,
        text : 'Muscle Groups'
      }).appendTo(select);

      $('#' + id + 'selectRow').append(div);
    }

    // Exercise Constructor Function
    function exerciseConstructor() {
      
      var div = $('<div/>', {
        'class' : 'col'
      });
      var form = $('<form/>');
      div.append(form);
      var formGroup = $('<div/>', {
        'class' : 'form-group'
      }).appendTo(form);
      var label = $('<label/>',{
        'for'   : 'exerciseSelect',
        text: 'Exercise'
      }).appendTo(formGroup);
      var select = $('<select/>', {
        'class' : 'form-control',
        'id'    : 'exerciseSelect'
      }).appendTo(formGroup);
      var selectDefault = $('<option/>',{
        'value' : 0,
        text    : 'Exercises'
      }).appendTo(select);

      $('#appWellRow').append(div);
    }

    function setsConstructor() {
      var div = $('<div/>', {
        'class' : 'col'
      });
      var form = $('<form/>');
      div.append(form);
      var formGroup = $('<div/>', {
        'class' : 'form-group'
      }).appendTo(form);
      var label = $('<label for="setSelect"># Sets</label>');
      formGroup.append(label);
      var select = $('<select/>', {
        'class' : 'form-control',
        'id'    : 'setSelect'
      }).appendTo(formGroup);
      select.html('<option value="0">-</option>' + 
                  '<option value="4">4</option>' +
                  '<option value="5">5</option>' +
                  '<option value="7">7</option>');
    
      $('#appWellRow').append(div);
    }


    function setSectionConstructor() {
      var setDiv = $('<div/>',{
        'id' : 'setSection'
      });
      
      var setRowDiv = $('<div/>',{
        'class' : 'row',
        'id'    : 'setsRow'
      }).appendTo(setDiv);

      var weightRowDiv = $('<div/>',{
        'class' : 'row',
        'id'    : 'weightsRow'
      });
      $('#appWellRow').append(setDiv);

    }

    function plusBtnConstructor() {
      var div = $('<div/>',{
        'class' : 'col-12',
        'style' : 'font-size:1em; color:#434343'
      });
      var btn = $('<i/>', {
        'class' : 'fas fa-plus-square'
      }).appendTo(div);
      $('#appWellRow').append(div);
    }

    });// data.done

    } // addExercise

});