// change link to active
$(document).ready(function () {
  // get current URL path and assign 'active' class
  var pathname = window.location.pathname;
  $('.navbar-nav > li > a[href="' + 'http://localhost:3000' + pathname + '"]')
    .parent()
    .addClass('active');
});
