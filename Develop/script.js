
$(document).ready(function () {
  // display current date on header
  var date = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(date);

  // listener for click events on save button
  $('.saveBtn').on('click', function (){
    // retrieve textarea and hour-x
    var textDescr = $(this).siblings('.description').val();
    var time = $(this).parent().attr('id');

    // store the info into local storage
    localStorage.setItem(time, textDescr);

  });
  
  // needs function to compare and update time
  // applies past, present, future class to item
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

  // to retrive user input for local storate
  for (var i=9; i < 18; i++){
    $('#hour-' + i + ' .description').val(localStorage.getItem('hour-'+i));
  }

});
