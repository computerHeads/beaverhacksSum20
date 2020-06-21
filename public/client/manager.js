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
    const { current, wait, tally } = JSON.parse(req.response);
    var customer = document.getElementById(id);
    let curCustomer = customer;
    customer.parentElement.removeChild(customer);

    curCustomer.className = 'curCust';
    var arr = curCustomer.children; // remove the right side btns
    curCustomer.removeChild(arr[2]);
    curCustomer.removeChild(arr[2]);

    var list = document.getElementById('currentList');
    list.appendChild(curCustomer);
    document.getElementById('cur').value = current; // append the customer numbers
    document.getElementById('wait').value = wait;
    document.getElementById('tally').value = tally;
  });
  event.preventDefault();
}
