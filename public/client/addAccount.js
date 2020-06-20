const baseURL = 'http://localhost:3000/business/create-account';

function sendAccountForm() {
  var req = new XMLHttpRequest();

  var name = document.getElementById("inputName");
  var email = document.getElementById("inputEmail");
  var password = document.getElementById("inputPassword");
  // var businessName = document.getElementById("inputBusinessName");
  // var website = document.getElementById("inputWebsite");

  // var open = document.getElementById("inputOpen");
  // var close = document.getElementById("inputClose");

  // var maxOccupancy = document.getElementById("inputMaxOccupancy");
  // var isShowBusinessInfo = document.getElementById("showBusinessInfoPublic");
  // var isAgreeTerms = document.getElementById("agreeCondition");

  // //openDays = edit required
  // var openDays = document.getElementsByName("openDays");

  // // businessType = edit required
  // var businessType = document.getElementsByName("businessType");

  // // address - edit required
  // var addressOne = document.getElementById("inputAddressOne");
  // var addressTwo = document.getElementById("inputAddressTwo");
  // var city = document.getElementById("inputCity");
  // var state = document.getElementById("inputState");
  // var zip = document.getElementById("inputZip");

  // var phone = document.getElementById("inputPhone").value,
  //   phone = `+1${phone.substring(0, 3)}${phone.substring(
  //     4,
  //     7
  //   )}${phone.substring(8)}`;

  // Add to payload: openDays, businessType, address(combined text)
  const payload = {
    name: name.value,
    email: email.value,
    password: password.value,
  };
    // phone: phone,
    // businessName: businessName.value,
    // website: website.value,
    // fix - open, close, maxOccupancy, isShowBusinessInfo is in 'settings' in BusinessSchema
    // open: open.value,
    // close: close.value,
    // maxOccupancy: maxOccupancy.value,
    // isShowBusinessInfo: isShowBusinessInfo.checked,
    // isAgreeTerms: isAgreeTerms.checked,
  

  req.open('POST', baseURL, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
  req.addEventListener('load', () => {
    var response = JSON.parse(req.response);
    console.log("client/addAccount.js works!")
  });
  event.preventDefault();
}