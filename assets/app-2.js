jQuery(document).ready(function(){
    console.log('loaded');

    
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

         // Set up Container Div and append to main container
         var exercise_row = $('<div/>', {
         'class' : 'row',
         'id' : exerciseId + '_exerciseWell'
         }).appendTo('#mainContainer');

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
           text: 'Exercise'
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