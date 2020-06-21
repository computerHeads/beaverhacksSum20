const baseURL = 'http://localhost:3000/business/create-account';

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

function sendAccountForm() {
  var req = new XMLHttpRequest();

  var name = document.getElementById('inputName');
  var email = document.getElementById('inputEmail');
  var password = document.getElementById('inputPassword');
  var businessName = document.getElementById('inputBusinessName');
  var website = document.getElementById('inputWebsite');
  var maxOccupancy = document.getElementById('inputMaxOccupancy');
  var isShowBusinessInfo = document.getElementById('showBusinessInfoPublic');
  var isAgreeTerms = document.getElementById('agreeCondition');
  var open = document.getElementById('inputOpen');
  var close = document.getElementById('inputClose');
  var openingDays = document.getElementsByName('openDays');
  var businessTypes = document.getElementsByName('businessType');

  var addressOne = document.getElementById('inputAddressOne');
  var addressTwo = document.getElementById('inputAddressTwo');
  var city = document.getElementById('inputCity');
  var state = document.getElementById('inputState');
  var zip = document.getElementById('inputZip');

  if (addressTwo.value == '') {
    var address =
      addressOne.value + ',' + city.value + ',' + state.value + ',' + zip.value;
  } else {
    var address =
      addressOne.value +
      ',' +
      addressTwo.value +
      ',' +
      city.value +
      ',' +
      state.value +
      ',' +
      zip.value;
  }

  if (businessTypes[0].selected == 'undefined') {
    var businessType = 'Not selected';
  } else if (businessTypes[1].selected == true) {
    console.log(businessTypes[1].selected == true);
    var businessType = 'Restaurants';
  } else if (businessTypes[2].selected == true) {
    var businessType = 'Stores';
  } else if (businessTypes[3].selected == true) {
    var businessType = 'Others';
  }

  // openingDays[6].value == "Sun" // boolean: true, false by .checked// index: 0~ 6 (Mon, Tue, Wed, Thu, Fri, Sat, Sun)
  if (
    openingDays[0].checked == true &&
    openingDays[1].checked == true &&
    openingDays[2].checked == true &&
    openingDays[3].checked == true &&
    openingDays[4].checked == true
  ) {
    var openDays = 'Mon - Fri';
  } else if (
    openingDays[0].checked == true &&
    openingDays[1].checked == true &&
    openingDays[2].checked == true &&
    openingDays[3].checked == true
  ) {
    var openDays = 'Mon - Thu';
  } else if (
    openingDays[0].checked == true &&
    openingDays[1].checked == true &&
    openingDays[2].checked == true
  ) {
    var openDays = 'Mon - Wed';
  } else if (
    openingDays[1].checked == true &&
    openingDays[2].checked == true &&
    openingDays[3].checked == true &&
    openingDays[4].checked == true
  ) {
    var openDays = 'Tue - Fri';
  } else if (
    openingDays[1].checked == true &&
    openingDays[2].checked == true &&
    openingDays[3].checked == true
  ) {
    var openDays = 'Tue - Thu';
  } else {
    var openDays = '';
    for (let i = 0; i < openingDays.length; i++) {
      if (openingDays[i].checked == true) {
        openDays = openDays + '/' + openingDays[i].value;
      }
    }
  }
  var phone = document.getElementById('phone').value;

  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
    settings: {
      businessName: businessName.value,
      address: address,
      website: website.value,
      open: open.value,
      close: close.value,
      openDays: openDays,
      maxOccupancy: maxOccupancy.value,
      businessType: businessType,
      isShowBusinessInfo: isShowBusinessInfo.checked,
      phone: phone,
    },
    isAgreeTerms: isAgreeTerms.checked,
  };

  // phone: phone,

  req.open('POST', baseURL, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
  req.addEventListener('load', () => {
    var response = JSON.parse(req.response);
    if (response.isSignUp == 'true') {
      window.location = 'http://localhost:3000/sign-up-success';
    }
  });
  event.preventDefault();
}
