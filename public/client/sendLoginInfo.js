const loginURL = 'http://localhost:3000/business/login';

function sendLoginForm() {
  var req = new XMLHttpRequest();

  var email = document.getElementById('inputEmail');
  var password = document.getElementById('inputPassword');
  var wrongEmail = document.querySelector('#email-error-msg');
  var wrongPwd = document.querySelector('#pwd-error-msg');

  const payload = {
    email: email.value,
    password: password.value,
  };

  req.open('POST', loginURL, true);
  req.setRequestHeader('Content-Type', 'application/json');
  req.send(JSON.stringify(payload));
  req.addEventListener('load', () => {
    var response = JSON.parse(req.response);
    if (response.isLogin == 'true') {
      window.location = 'http://localhost:3000/manager/' + response.business_id;
    } else if (response.isEmail == 'false' && response.isPwd == 'false') {
      wrongPwd.classList.remove('hide');
      wrongEmail.classList.remove('hide');
      wrongEmail.innerHTML = 'Wrong Email';
      wrongPwd.innerHTML = 'Wrong Password';
    } else if (response.isEmail == 'false') {
      // wrong email input
      wrongEmail.classList.remove('hide');
      wrongPwd.classList.add('hide');
      wrongEmail.innerHTML = 'Wrong Email Address';
    } else if (response.isPwd == 'false') {
      // wrong password input
      wrongPwd.classList.remove('hide');
      wrongEmail.classList.add('hide');
      wrongPwd.innerHTML = 'Wrong Password';
    }
  });
  event.preventDefault();
}
