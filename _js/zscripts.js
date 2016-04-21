var PM = {} || PM;

PM.Carousel = (function () {

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

PM.CarouselNav = (function () {
  var elements = PM.Carousel.elements;

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

PM.Drawer = (function () {

  var constants = {
    toggle_element: '.js-toggle',
    container: '.js-toggle-container',
    content: '.js-toggle-collapsible',
    open_class: 'active',
    should_animate: true,
    duration: 200,
    easing: 'swing'
  };

  var openDrawer = function($context) {

    if(constants.should_animate){

      var $content = $context.find(constants.content);
      var $toggle = $context.find(constants.toggle_element);
      
      $content.slideDown({
        'duration': constants.duration,
        'easing': constants.easing
      });

      $context.addClass(constants.open_class);
      $toggle.addClass(constants.open_class); 

      return;
    }
    
    $context.toggleClass(constants.open_class); 
    $(constants.toggle_element).addClass(constants.open_class);   
  };

  var closeDrawer = function($context) {

    if(constants.should_animate){

      var $content = $context.find(constants.content);
      var $toggle = $context.find(constants.toggle_element);

      $content.slideUp({
        'duration': constants.duration,
        'easing': constants.easing
      });

      $context.removeClass(constants.open_class);
      $toggle.removeClass(constants.open_class);

      return;
    }
    
    $context.toggleClass(constants.open_class);  
    $(constants.toggle_element).toggleClass(constants.open_class);  
  };

  var init = function() {

    // Set 'on click' event listener for .js-toggle that expands and collapses content
    $(constants.toggle_element).on('click', function(e) {
      e.preventDefault();

      var $targetContext = $(this).closest($(constants.container));

      if ($targetContext.hasClass(constants.open_class)) {
        closeDrawer($targetContext);
        return;
      }

      openDrawer($targetContext);
    });
  };

  return {
    init: init,
    constants: constants,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer
  };
} ());

$(function () {
  PM.Carousel.init();
  PM.CarouselNav.init();
});
