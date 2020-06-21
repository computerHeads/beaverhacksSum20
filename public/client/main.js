function setActive(id) {
  var current = document.getElementById(id);
  var navBar = document.getElementsByClassName('navbar-nav');
  var navList = Array.from(navBar[0].children);
  for (var i = 0; i < navList.length; i++) {
    if (navList[i].className === 'nav-item active') {
      navList[i].className = 'nav-item';
    }
  }
  current.className = 'nav-item active';
  event.preventDefault();
}
