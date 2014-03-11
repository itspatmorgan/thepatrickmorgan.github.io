$(document).ready(function(){
  // Set up Foundation Orbit // 
  $(document).foundation(
    'orbit', {
       animation: 'slide',
       timer_speed: 1000,
       pause_on_hover: true,
       animation_speed: 1000,
       navigation_arrows: true,
       bullets: true,
       slide_number: false,
       timer: false,
    }
  );

  // Smooth Scrolling from nav bar links //
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});