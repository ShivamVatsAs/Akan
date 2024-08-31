/*
 * This website is from HackerZhou (http://love.hackerzhou.me)
 */

// variables
var windowWidth = $(window).width();
var windowHeight = $(window).height();

$(window).resize(function() {
  var newWidth = $(window).width();
  var newHeight = $(window).height();
  if (newWidth != windowWidth && newHeight != windowHeight) {
    location.replace(location);
  }
});

(function($) {
  $.fn.typewriter = function() {
    this.each(function() {
      var element = $(this);
      var text = element.html();
      var progress = 0;
      element.html('');
      var timer = setInterval(function() {
        var currentChar = text.substr(progress, 1);
        if (currentChar == '<') { // checks for html tags
          progress = text.indexOf('>', progress) + 1;
        } else {
          progress++;
        }
        element.html(text.substring(0, progress) + (progress % 2 ? '_' : '')); // adds typing effect
        if (progress >= text.length) {
          clearInterval(timer);
        }
      }, 75);
    });
    return this;
  };
})(jQuery);

function timeElapse(date) {
  var seconds = (+ new Date() - date.getTime()) / 1000;
  var days = Math.floor(seconds / (3600 * 24));
  seconds = seconds % (3600 * 24);
  var hours = Math.floor(seconds / 3600);
  if (hours < 10) {
    hours = "0" + hours;
  }
  seconds = seconds % 3600;
  var minutes = Math.floor(seconds / 60);
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  seconds = Math.floor(seconds % 60);
  seconds = (seconds + "").replace(/\.\d*/, "");
  var result = "In this sweet chapter of life, we've shared <span class=\"digit\">" + days  + "</span> days, <span class=\"digit\">" + hours + "</span> hours, <span class=\"digit\">" + minutes + "</span> minutes, and <span class=\"digit\">" + seconds + "</span> seconds";
  $("#clock").html(result);
}
