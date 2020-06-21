const baseURL = 'http://localhost:3000/manager/:business_id';

function openNav() {
  document.getElementById('mySidenav').style.width = '250px';
}
function closeNav() {
  document.getElementById('mySidenav').style.width = '0';
}
function businessPage() {
  document.getElementById('managerPage').style.display = 'none';
  document.getElementById('businessPage').style.display = 'block';
}
function managerPage() {
  document.getElementById('managerPage').style.display = 'block';
  document.getElementById('businessPage').style.display = 'none';
}

function deleteCustomer(id, phone, email, name) {
  var req = new XMLHttpRequest();
  var businessId = document.getElementById('bzId').value;
  var payload = {};
  payload.id = id;
  payload.phone = phone;
  payload.email = email;
  payload.name = name;
  payload.businessId = businessId;
  req.open('DELETE', baseURL, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
  req.addEventListener('load', () => {
    if (req.response === 'true') {
      var customer = document.getElementById(id);
      customer.parentElement.removeChild(customer);
    }
  });
  event.preventDefault();
}

function markCustomer(id) {
  var req = new XMLHttpRequest();
  var businessId = document.getElementById('bzId').value;
  var payload = {};
  payload.id = id;
  payload.businessId = businessId;
  console.log(payload);
  req.open('PUT', baseURL, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
  req.addEventListener('load', () => {
    let curCustomer;
    if (req.response === 'true') {
      var customer = document.getElementById(id);
      curCustomer = customer;
      customer.parentElement.removeChild(customer);
    }
    curCustomer.className = 'curCust';
    var list = document.getElementById('currentList');
    list.appendChild(curCustomer);
  });
  event.preventDefault();
}
