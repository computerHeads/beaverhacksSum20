const baseURL = 'http://localhost:3000/addCustomer/:business_id';

//open source validator from https://intl-tel-input.com/node_modules/intl-tel-input/examples/gen/is-valid-number.html
var input = document.querySelector('#phone'),
  errorMsg = document.querySelector('#error-msg');
// error codes
var errorMap = [
  'Invalid number',
  'Invalid country code',
  'Too short',
  'Too long',
  'Invalid number',
];
// initialise plugin
var iti = window.intlTelInput(input, {
  // set to international mode (include country codes in input)
  nationalMode: false,
  utilsScript:
    'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.3/js/utils.js',
});

var reset = function () {
  input.classList.remove('error');
  errorMsg.innerHTML = '';
  errorMsg.classList.add('hide');
};

// on blur: validate
input.addEventListener('blur', function () {
  reset();
  if (input.value.trim()) {
    if (!iti.isValidNumber()) {
      input.classList.add('error');
      var errorCode = iti.getValidationError();
      errorMsg.innerHTML = errorMap[errorCode];
      errorMsg.classList.remove('hide');
    }
  }
});

// on keyup / change flag: reset
input.addEventListener('change', reset);
input.addEventListener('keyup', reset);

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
    cancel.id = 'cancelBtn';
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
  var req = new XMLHttpRequest();
  const form = document.getElementsByTagName('form')[0];
  payload = {};
  payload.name = form.elements.name.value;
  payload.phone = form.elements.phone.value;
  payload.email = form.elements.email.value;
  payload.businessId = document.getElementById('id').value;
  payload.customerId = customerId;
  req.open('DELETE', baseURL, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
  req.addEventListener('load', () => {
    document.getElementsByTagName('form')[0].reset();
    document.getElementById('status').innerHTML =
      'Your reservation has been canceled';
    var cancelBtn = document.getElementById('cancelBtn');
    cancelBtn.parentNode.removeChild(cancelBtn); // remove the btn
  });
  event.preventDefault();
}
