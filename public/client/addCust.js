const baseURL = 'http://localhost:3000/addCustomer/:business_id';

function sendForm() {
  var req = new XMLHttpRequest();
  var form = document.getElementsByTagName('form')[0];
  const payload = {
    name: form.elements.name.value,
    phone: form.elements.phone.value,
    email: form.elements.email.value,
    businessId: form.elements.id.value,
  };
  req.open('POST', baseURL, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
  req.addEventListener('load', () => {
    var response = JSON.parse(req.response);
    var submitBtn = document.getElementById('submitBtn');
    submitBtn.value = 'Edit reservation';
    submitBtn.setAttribute('onclick', `editCustomer('${response.customerId}')`);

    var cancel = document.createElement('button');
    cancel.innerHTML = 'Cancel reservation';
    cancel.setAttribute('onclick', `cancel('${response.customerId}')`);
    document.getElementById('cancel').appendChild(cancel); // add to document
  });
  event.preventDefault();
}

// edit a reservation
function editCustomer(customerId) {
  var req = new XMLHttpRequest();
  var form = document.getElementsByTagName('form')[0];
  const payload = {
    name: form.elements.name.value,
    phone: form.elements.phone.value,
    email: form.elements.email.value,
    businessId: form.elements.id.value,
    customerId: customerId,
  };
  req.open('PUT', baseURL, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
  req.addEventListener('load', () => {
    console.log(req.response);
  });
  event.preventDefault();
}

// delete/cancel a reservation
function cancel(customerId) {
  document.getElementsByTagName('form')[0].reset();
  var req = new XMLHttpRequest();
  payload = {};
  payload.businessId = document.getElementById('id').value;
  payload.customerId = customerId;
  req.open('DELETE', baseURL, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
  req.addEventListener('load', () => {
    document.getElementById('status').innerHTML =
      'Your reservation has been canceled';
  });
  event.preventDefault();
}
