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
  var openingDays = document.getElementsByName("openDays");
  var businessTypes = document.getElementsByName("businessType");

  var addressOne = document.getElementById("inputAddressOne");
  var addressTwo = document.getElementById("inputAddressTwo");
  var city = document.getElementById("inputCity");
  var state = document.getElementById("inputState");
  var zip = document.getElementById("inputZip");

  if (addressTwo.value == "") {
    var address = addressOne.value + "," + city.value + "," + state.value + "," + zip.value;
  } else {
    var address = addressOne.value + "," + addressTwo.value + "," + city.value + "," + state.value + "," + zip.value;
  }

  if (businessTypes[0].selected == "undefined") {
    var businessType = "Not selected";
  } else if (businessTypes[1].selected == true) {
    console.log(businessTypes[1].selected == true);
    var businessType = "Restaurants";
  } else if (businessTypes[2].selected == true) {
    var businessType = "Stores";
  } else if (businessTypes[3].selected == true) {
    var businessType = "Others";
  }

  // openingDays[6].value == "Sun" // boolean: true, false by .checked// index: 0~ 6 (Mon, Tue, Wed, Thu, Fri, Sat, Sun)
  if (openingDays[0].checked == true && openingDays[1].checked == true && 
    openingDays[2].checked == true && openingDays[3].checked == true &&
    openingDays[4].checked == true) {
      var openDays = "Mon - Fri";
    } else if (openingDays[0].checked == true && openingDays[1].checked == true && 
    openingDays[2].checked == true && openingDays[3].checked == true) {
      var openDays = "Mon - Thu";
    } else if (openingDays[0].checked == true && openingDays[1].checked == true && openingDays[2].checked == true) {
      var openDays = "Mon - Wed";
    } else if (openingDays[1].checked == true && 
      openingDays[2].checked == true && openingDays[3].checked == true &&
      openingDays[4].checked == true) {
        var openDays = "Tue - Fri";
      } else if (openingDays[1].checked == true && 
        openingDays[2].checked == true && openingDays[3].checked == true) {
          var openDays = "Tue - Thu";
        } else {
          var openDays = "";
          for (let i = 0; i < openingDays.length; i++) {
            if (openingDays[i].checked == true) {
              openDays = openDays + "/" + openingDays[i].value;
          }
        }
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
      openDays: openDays,
      maxOccupancy: maxOccupancy.value,
      businessType: businessType,
      isShowBusinessInfo: isShowBusinessInfo.checked,
    },
    isAgreeTerms: isAgreeTerms.checked,
  };
  
    // phone: phone,
  
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
