var PM = {} || PM;

PM.CarouselSetup = (function () {

  var elements = {
    carousel: $('.js-carousel'),
    selectors: $(".js-carousel-control"),
    prev_arrow: $('.js-carousel--prev'),
    next_arrow: $('.js-carousel--next')
  };

  var default_settings = {
    dots: false,
    arrows: true,
    prevArrow: elements.prev_arrow,
    nextArrow: elements.next_arrow,
    infinite: true,
    adaptiveHeight: true,
    speed: 300,
    slidesToShow: 1
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

  var runSlick = function () {
    elements.carousel.slick(default_settings);
  };

  var runSlickGoTo = function () {
    elements.carousel.slick(go_to_settings);
  };

  var init = function () {
    if (elements.carousel) {

      if (elements.carousel.data("carousel-type") === "go-to") {
        runSlickGoTo();
      } else {
        runSlick();
      }
    }
  };

  return {
    init: init,
    elements: elements
  };
} ());

PM.GoToCarousel = (function () {
  var elements = PM.CarouselSetup.elements;

  var updateActiveSelector = function ($clicked_selector) {
    // Remove all active selectors
    elements.selectors.removeClass('active');
    // Update the clicked selector to active
    $clicked_selector.addClass('active');
  };

  var setSelectorEvents = function() {
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

  var init = function() {
    setSelectorEvents();
  };

  return {
    init: init
  };
} ());

$(function () {
  PM.CarouselSetup.init();
  PM.GoToCarousel.init();
});
