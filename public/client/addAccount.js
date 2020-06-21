const baseURL = 'http://localhost:3000/business/create-account';

function sendAccountForm() {
  var req = new XMLHttpRequest();

  var name = document.getElementById("inputName");
  var email = document.getElementById("inputEmail");
  var password = document.getElementById("inputPassword");
  var businessName = document.getElementById("inputBusinessName");
  var website = document.getElementById("inputWebsite");
  var maxOccupancy = document.getElementById("inputMaxOccupancy");
  var isShowBusinessInfo = document.getElementById("showBusinessInfoPublic");
  var isAgreeTerms = document.getElementById("agreeCondition");
  var open = document.getElementById("inputOpen");
  var close = document.getElementById("inputClose");
  var openDays = document.getElementsByName("openDays");
  var businessTypes = document.getElementsByName("businessType");

  var addressOne = document.getElementById("inputAddressOne");
  var addressTwo = document.getElementById("inputAddressTwo");
  var city = document.getElementById("inputCity");
  var state = document.getElementById("inputState");
  var zip = document.getElementById("inputZip");

  // openDays[6].value == "Sun" // boolean: "true", "false" by .checked// index: 0~ 6 (Mon, Tue, Wed, Thu, Fri, Sat, Sun)
  
  
  
  if (addressTwo.value == "") {
    address = addressOne.value + "," + city.value + "," + state.value + "," + zip.value;
  } else {
    address = addressOne.value + "," + addressTwo.value + "," + city.value + "," + state.value + "," + zip.value;
  }

  if (businessTypes[0].selected == "true") {
    businessType = "Not selected";
  } else if (businessTypes[1].selected == "true") {
    businessType = "Restaurants";
  } else if (businessTypes[2].selected == "true") {
    businessType = "Stores";
  } else if (businessTypes[3].selected == "true") {
    businessType = "Others";
  }

  // var phone = document.getElementById("inputPhone").value,
  //   phone = `+1${phone.substring(0, 3)}${phone.substring(
  //     4,
  //     7
  //   )}${phone.substring(8)}`;

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
      maxOccupancy: maxOccupancy.value,
      businessType: businessType,
      isShowBusinessInfo: isShowBusinessInfo.checked,
    },
    isAgreeTerms: isAgreeTerms.checked,
  };
  
    // phone: phone,
    // openDays: openDays,
    
  
  req.open('POST', baseURL, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
  req.addEventListener('load', () => {
    var response = JSON.parse(req.response);
    if (response.isSignUp == "true") {
      window.location = "http://localhost:3000/sign-up-success";
    }
  });
  event.preventDefault();
}
