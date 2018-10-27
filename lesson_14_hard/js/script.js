$(document).ready(function() {
  let modalMargLeft = $('.modal').css('margin-left');
  /* modalMargLeft = +(modalMargLeft.slice(0,-1)); */

  $(document).on('click', function(event) {
    if(event.target.classList.contains('main_btna') || 
    event.target.classList.contains('contact')) {
      $('.overlay').animate(
      {
        opacity: 'toggle'
      }, 1000
      );
      $('.modal').animate(
        {
          opacity: 'toggle',
          marginLeft: 'toggle'
        }, 2500
      );
    }
  });

  $('.close').on('click', function() {
      $('.overlay').animate(
      {
        opacity: 'toggle'
      }, 1000
      );
      $('.modal').animate(
        {
          opacity: 'toggle',
          marginLeft: 'toggle'
        }, 500
      );
  });

  $('.back').on('click', function() {
    $('.overlay').animate(
    {
      opacity: 'toggle'
    }, 500
    );
    $('.thanks').animate(
      {
        opacity: 'toggle'
      }, 800
    );
});

  $('div.main_nav nav ul li:eq(1)').on('click', function() {
      $('.overlay').animate(
      {
        opacity: 'toggle'
      }, 1000
      );
      $('.modal').animate(
        {
          opacity: 'toggle',
          marginLeft: 'toggle'
        }, 2500
      );
  });
});
$('.form-inline').submit(function(event) {
  event.preventDefault();
  $.ajax({
    type: "POST",
    url: "../server.php",
    data: $(this).serialize()
  }).done(function() {
    $(this).find("input").val("");
    $("form").trigger("reset");
    $('.modal').animate(
      {
        opacity: 'toggle',
        marginLeft: 'toggle'
      }, 500
    );
    $('.thanks').animate(
      {
        opacity: 'toggle',
        marginTop: 'toggle'
      }, 1500
    );
  });
  return false;
});