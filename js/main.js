/**
 * Retrieves user data based on the provided username.
 * @param {string} username - The username to retrieve data for.
 * @param {function} callback - The callback function to invoke with the retrieved user data.
 */
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
          oIcon: score.oIcon,
        };
        break;
      }
    }

    if (userData !== null) {
      console.log('User found.');
    } else {
      console.log('User not found.');
      // If user data is not found, create a new user with default values
      userData = {
        playerName: username,
        wins: 0,
        losses: 0,
        ties: 0,
        xIcon: "❌",
        oIcon: "⭕",
      };
      updateLeaderboard(username);
    }

    // Invoke the callback function with the retrieved user data
    callback(userData);
  });
}

/**
 * Display welcome message if user is logged in.
 */
window.onload = function() {
  const username = Cookies.get('username');
  if (username) {
    displayWelcomeMessage(username);
  }
  $('#login-alert').hide();
};

/**
 * Logs in the user with the provided username.
 */
function login() {
  const usernameInput = document.getElementById('username-input');
  const username = usernameInput.value;
  // Validate user login and reload the page
  if (!validateLogin(username)) {
    $('#login-alert').show();
    return;
  }
  Cookies.set('username', username);

  displayWelcomeMessage(username);
  location.reload();
}

/**
 * Validates the login username.
 * @param {string} username - The username to validate.
 * @returns {boolean} - True if the username is valid, false otherwise.
 */
function validateLogin(username) {
  const usernameRegex = /^[A-Za-z0-9_-]{3,16}$/;
  return usernameRegex.test(username);
}

/**
 * Displays the welcome message for the logged-in user.
 * @param {string} username - The username to display in the welcome message.
 */
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
/**
 * Logs out the user.
 */
function logout() {
  Cookies.remove('username');
  $('#login-alert').hide();

  const loginSection = document.getElementById('login-section');
  loginSection.style.display = 'block';

  const welcomeSection = document.getElementById('welcome-section');
  welcomeSection.style.display = 'none';

  location.reload();
}