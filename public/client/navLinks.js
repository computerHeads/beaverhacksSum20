function logOutClicked() {
  var req = new XMLHttpRequest();

  req.open('GET','http://localhost:3000/business/logout', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(null);
  window.location = "http://localhost:3000/";;
}

 
  

function goToHome(businessId) {
  var req = new XMLHttpRequest();
  var payload = {};
  payload.biz = {};
  payload.biz._id = businessId;
  payload.logout = true;
  req.open('POST', 'http://localhost:3000/home', true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
}

// function logOutClicked() {
//   var req = new XMLHttpRequest();
//   console.log('test');
//   req.open('GET', 'http://localhost:3000/business/logout', true);
//   req.setRequestHeader('Content-Type', 'application/json');
//   req.send(null);
// }
