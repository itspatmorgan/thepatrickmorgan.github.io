$(document).ready(function(){
  
  var elements = {
    carousel: $('.js-carousel'),
    selectors: $(".js-carousel-control")
  };

  var go_to_settings = {
    infinite: false,
    slidesToShow: 1,
    speed: 500,
    arrows: false,
    fade: true,
    swipe: false,
    adaptiveHeight: true
  };

  elements.carousel.slick(go_to_settings);

  var updateActiveSelector = function ($clicked_selector) {
    // Remove all active toggles
    elements.selectors.removeClass('active');
    // Update the clicked toggle to active
    $clicked_selector.addClass("active");
  };

  var setToggleEvents = function() {
    // Loop through toggle elements in elements.toggles array
    elements.selectors.each(function (index) {
      // On click of a toggle,
      $(this).on('click', function () {
        // Update the active toggle
        updateActiveSelector($(this));
        // Go to the related index slide in the Slick Carousel
        elements.carousel.slick('slickGoTo', index);
      });
    });
  };

  setToggleEvents();

  console.log("loaded");
});
