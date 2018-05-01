jQuery(document).ready(function(){
    console.log('loaded');

    // Get a reference to the database service
    var database = firebase.database();

    
    // Pull Exercise Data
    var queryURL = "https://raw.githubusercontent.com/acbrent25/Workout-Exercise-API/master/exercise.json"
      $.ajax({
        url: queryURL,
        method: "get"
      }).done(function(data) {

         // Pares JSON
         var parseData = JSON.parse(data);
         console.log(parseData);
         // Plus button to add exercise
         var addExerciseBtn = $('.fa-plus-square');
         var exerciseId = 0;
         
         $('body').on('click', '.addExercise', function(e){
            e.preventDefault();
            console.log('clicked');

            // increment exercise ID
            exerciseId++;
            // Run the create exercise function
            createExercise(exerciseId, parseData);
         
            // Add muscle groups to select
            $.each(parseData, function(key, val){
               console.log('key: ' + key);
               var option = "<option data-exercise=" + key + ">" + key + "</option>";
               $('select#' + exerciseId + '_mg_select').append(option);
            });

         })

         
   
      });// data.done

      function createExercise(exerciseId, parseData){

         console.log(exerciseId);

         var exercise_wrapper = $('<div/>', {
           'class' : 'exercise_wrapper'
         }).appendTo('#mainContainer');

         // Set up Container Div and append to main container
         var exercise_row = $('<div/>', {
         'class' : 'row',
         'id' : exerciseId + '_exerciseWell'
         }).appendTo(exercise_wrapper);

         //----------------------------------------------
         //   SET UP MUSCLE GROUP SELECT
         //----------------------------------------------
         
          var mg_col = $('<div/>',{
            'class' : 'col',
             'id' : exerciseId + '_mg_col'
          }).appendTo(exercise_row);

          // Set up form with id and append to new div
          var mg_form = $('<form/>', {
             'id': exerciseId + '_mg_form'
          }).appendTo('#' + exerciseId + '_mg_col');

          // Set up form group
          var mg_formGroup = $('<div/>', {
            'class': 'form-group'
          }).appendTo('#' + exerciseId + '_mg_form');

          // Set up form group label
          var mg_label = $('<label/>',{
            'for': exerciseId + '_mg_select',
            text: 'Muscle Group'
          }).appendTo(mg_formGroup);

          // Set up select
          var mg_select = $('<select/>', {
            'class' : 'form-control',
            'id' : exerciseId + '_mg_select'
          }).appendTo(mg_formGroup);

          // Set up default select option
          var mg_select_default = $('<option/>',{
            'value' : 0,
            text : 'Muscle Groups'
          }).appendTo(mg_select);

         // Muscle group select function
         // Add the appropriate excercise to exercise select based on muscle group choice
         $('#' + exerciseId + '_mg_select').on('change', function(){
            // Clear out any options
            // $('#' + exerciseId + '_mg_select').empty();
   
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


         //----------------------------------------------
         //   SET UP Exercise SELECT
         //----------------------------------------------

         var ex_col = $('<div/>',{
            'class' : 'col',
            'id' : exerciseId + '_ex_col'
         }).appendTo(exercise_row);

         // Set up form with id and append to new div
         var ex_form = $('<form/>', {
            'id': exerciseId + '_ex_form'
         }).appendTo('#' + exerciseId + '_ex_col');

         // Set up form group
         var ex_formGroup = $('<div/>', {
           'class': 'form-group'
         }).appendTo('#' + exerciseId + '_ex_form');

         // Set up form group label
         var ex_label = $('<label/>',{
           'for': exerciseId + '_ex_select',
           text: 'Exercise'
         }).appendTo(ex_formGroup);

         // Set up select
         var ex_select = $('<select/>', {
           'class' : 'form-control',
           'id' : exerciseId + '_ex_select'
         }).appendTo(ex_formGroup);


         //----------------------------------------------
         //   SET UP # of Sets SELECT
         //---------------------------------------------- 

         var sets_col = $('<div/>', {
            'class' : 'col',
            'id' : exerciseId + '_sets_col'
         }).appendTo(exercise_row);

         // Set up form with id and append to new div
         var sets_form = $('<form/>', {
            'id': exerciseId + '_sets_form'
         }).appendTo('#' + exerciseId + '_sets_col');

         // Set up form group
         var sets_formGroup = $('<div/>', {
           'class': 'form-group'
         }).appendTo('#' + exerciseId + '_sets_form');

         // Set up form group label
         var sets_label = $('<label/>',{
           'for': exerciseId + '_sets_select',
           text: '# of Sets'
         }).appendTo(sets_formGroup);

         // Set up select
         var sets_select = $('<select/>', {
           'class' : 'form-control',
           'id' : exerciseId + '_sets_select'
         }).appendTo(sets_formGroup);
         sets_select.html('<option value="0">-</option>' + 
         '<option value="4">4</option>' +
         '<option value="5">5</option>' +
         '<option value="7">7</option>');

        
         
         // Add Weight and Rep count for # of sets selected
        $('#' + exerciseId + '_sets_select').on('change', function(e){
          e.preventDefault();

          // Remove existing inputs
          $('#' + exerciseId + '_reps_row').empty();
          $('#' + exerciseId + '_reps_label').empty();
          $('#' + exerciseId + '_weight_row').empty();
          $('#' + exerciseId + '_weight_label').empty();

          // Setup Rep Count Row
          var reps_row = $('<div/>', {
            'class' : 'row reps_row',
            'id' : exerciseId + '_reps_row'
          }).insertAfter("#" + exerciseId + '_exerciseWell');

          // Add Rep Label
          var reps_label = $('<p/>',{
            'class': 'reps_label',
            'id': exerciseId + '_reps_label',
            text: '# Reps'
          }).insertBefore(reps_row);

          // Setup Weight Count Row
          var weight_row = $('<div/>', {
            'class' : 'row weight_row',
            'id' : exerciseId + '_weight_row'
          }).insertAfter("#" + exerciseId + '_reps_row');

          // Add Weight Label
          var weight_label = $('<p/>', {
            'class': 'weight_label',
            'id': exerciseId + '_weight_label',
            text: 'Weight'
          }).insertBefore(weight_row);

          // get selected option value for loop
          var setVal = $(this).find(':selected').val();
          console.log('setVal: ' + setVal);
          
          // Run loop and place number of inputs from select
          var i = 0;
          while (i < setVal) {

            // Add Inputs for each rep
            var reps_input_col = $('<div/>', {
              'class': 'col reps_input_col',
              'id': exerciseId + 'reps_input_col'
            }).appendTo(reps_row);

            var reps_input = $('<input/>',{
              'class': 'form-control',
              'type' : 'text',
              'placeholder' : 'R'
            }).appendTo(reps_input_col);

            // Add Inputs for each weigth
            var weight_input_col = $('<div/>', {
              'class': 'col weight_input_col',
              'id': exerciseId + 'weight_input_col'
            }).appendTo(weight_row);

            var weight_input = $('<input/>',{
              'class': 'form-control weight_input',
              'type' : 'text',
              'placeholder' : 'W'
            }).appendTo(weight_input_col);

            i++;
            
          }
        
        });



         //---------------------------------------------------------
         //   SET UP EXERCISE SELECT FUNCTION FOR MUSCLE GROUPS
         // Append to exercise select
         //----------------------------------------------------------


          function chest() {
            // Chest
            $.each(parseData.chest, function(key, val){
              console.log(val.exercise);
              var exerciseOption = "<option data-exercise=" + val.exercise + ">" + val.exercise + "</option>";
              $('#' + exerciseId + '_ex_select').append(exerciseOption);
            });
          }
    
          function back() {
            // Back
            $.each(parseData.back, function(key, val){
              console.log(val.exercise);
              var exerciseOption = "<option data-exercise=" + val.exercise + ">" + val.exercise + "</option>";
              $('#' + exerciseId + '_ex_select').append(exerciseOption);
            });
          }
          
          function abs() {
            // abs
            $.each(parseData.abs, function(key, val){
              console.log(val.exercise);
              var exerciseOption = "<option data-exercise=" + val.exercise + ">" + val.exercise + "</option>";
              $('#' + exerciseId + '_ex_select').append(exerciseOption);
            });
          }
    
          function biceps() {
            // biceps
            $.each(parseData.biceps, function(key, val){
              console.log(val.exercise);
              var exerciseOption = "<option data-exercise=" + val.exercise + ">" + val.exercise + "</option>";
              $('#' + exerciseId + '_ex_select').append(exerciseOption);
            });
          }
    
          function shoulders() {
            // shoulders
            $.each(parseData.shoulders, function(key, val){
              console.log(val.exercise);
              var exerciseOption = "<option data-exercise=" + val.exercise + ">" + val.exercise + "</option>";
              $('#' + exerciseId + '_ex_select').append(exerciseOption);
            });
          }
    




      }// createExercise

});