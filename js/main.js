// Retrieve the data
// getUserData(username, function(userData) {
//   console.log('User Data:', userData);
// });

function getUserData(username, callback) {
  $.getJSON('scores/highscores.json', function(data) {
    let userData = null;
    // Find the data for the specified username
    for (let i = 0; i < data.length; i++) {
      const score = data[i];
      const scoreUsername = score.username;

      if (scoreUsername === username) {
        userData = {
          playerName: score.username,
          wins: parseInt(score.wins),
          losses: parseInt(score.losses),
          ties: parseInt(score.ties),
          xIcon: score.xIcon,
          oIcon: score.xIcon
        };
        break;
      }
    }

    if (userData !== null) {
      callback(userData);
    } else {
      console.log('User not found.');
    }
  });
}

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
  if (!validateLogin(username)) {
    $('#login-alert').show();
    return;
  }
  Cookies.set('username', username);
  displayWelcomeMessage(username);
}

function validateLogin(username) {
  const re_username = /^[A-Za-z0-9_-]{3,16}$/igm;
  return re_username.test(username);
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
