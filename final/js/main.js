window.onload = function() {
    const username = Cookies.get('username');
    if (username) {
      displayWelcomeMessage(username);
    }
  };
  
  function login() {
    const usernameInput = document.getElementById('username-input');
    const username = usernameInput.value;
    Cookies.set('username', username);
    displayWelcomeMessage(username);
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
  
    const loginSection = document.getElementById('login-section');
    loginSection.style.display = 'block';
  
    const welcomeSection = document.getElementById('welcome-section');
    welcomeSection.style.display = 'none';
  }