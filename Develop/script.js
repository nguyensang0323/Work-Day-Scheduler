// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(document).ready(function () {
  // display current date on header
  var date = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(date);
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // listener for click events on save button
  $('.saveBtn').on('click', function (){
    // retrieve textarea and hour-x
    var textDescr = $(this).siblings('.description').val();
    var time = $(this).parent().attr('id');

    // store the info into local storage
    localStorage.setItem(time, textDescr);

  });
  
  // needs function to compare and update time
  function updateHour () {
    var currentTime = dayjs().hour();

    $('.time-block').each(function(){
      var blockHour = parseInt($(this).attr('id').split('-')[1]);

      if (blockHour < currentTime) {
        $(this).removeClass('present')
        $(this).removeClass('future')
        $(this).addClass('past')
      } else if (blockHour === currentTime){
        $(this).removeClass('past')
        $(this).removeClass('future')
        $(this).addClass('present')
      } else {
        $(this).removeClass('past')
        $(this).removeClass('present')
        $(this).addClass('future')
      }
    })

  };

  updateHour();

  setInterval(updateHour, 10000);
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  for (var i=9; i < 18; i++){
    $('#hour-' + i + ' .description').val(localStorage.getItem('hour-'+i));
  }
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
