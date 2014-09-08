$(document).ready(function() {

  $('#first-panel').on('click', function(){

    if($('#first-panel-span').is(":visible") ){
      $('#first-panel-span').toggleClass('glyphicon-chevron-down glyphicon-chevron-right');
    }

  });

  $('#second-panel').on('click', function(){

    if($('#second-panel-span').is(":visible") ){
      $('#second-panel-span').toggleClass('glyphicon-chevron-right glyphicon-chevron-down');
    }

  });

  $('#third-panel').on('click', function(){

    if($('#third-panel-span').is(":visible") ){
      $('#third-panel-span').toggleClass('glyphicon-chevron-right glyphicon-chevron-down');
    }

  });

});
