const baseURL = 'http://localhost:3000/business/logout';

function logOutClicked() {
  var req = new XMLHttpRequest();
  
  req.open('GET', baseURL, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(null);
}
