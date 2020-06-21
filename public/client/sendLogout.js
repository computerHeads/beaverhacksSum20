const logoutURL = 'http://localhost:3000/business/logout';

function logOutClicked() {
  var req = new XMLHttpRequest();
  
  req.open('GET', logoutURL, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(null);
  window.location = "http://localhost:3000/";
}
