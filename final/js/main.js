window.onload = function() {
  const username = Cookies.get('username');
  if (username) {
    displayWelcomeMessage(username);
  }
  $('#login-alert').hide();
};

function login() {
  const usernameInput = document.getElementById('username-input');
  const username = usernameInput.value;
  if (validateLogin(username) === false) {
    $('#login-alert').show();
    return;
  }
  Cookies.set('username', username);
  displayWelcomeMessage(username);
}

function validateLogin(username) {
  const re_username = /^[A-Za-z0-9_-]{3,16}$/igm;
  if (re_username.test(username) === false) {
    return false;
  } else {
    return true;
  }
}

function displayWelcomeMessage(username) {
  const loginSection = document.getElementById('login-section');
  loginSection.style.display = 'none';

  const welcomeSection = document.getElementById('welcome-section');
  welcomeSection.style.display = 'block';

  const welcomeMessage = document.getElementById('welcome-message');
  welcomeMessage.innerText = 'Welcome, ' + username + '!';

  const logoutBtn = document.getElementById('logout-btn');
  logoutBtn.style.display = 'block';
}

function logout() {
  Cookies.remove('username');
  $('#login-alert').hide();

  const loginSection = document.getElementById('login-section');
  loginSection.style.display = 'block';

  const welcomeSection = document.getElementById('welcome-section');
  welcomeSection.style.display = 'none';

}