<?php include 'tpl/head.php'; ?>
  <div class="container">
    <h1 class="text-center my-4">Tic Tac Toe</h1>
    <div class="row justify-content-center">
      <!-- Lobby Creation -->
      <div class="col-md-6">
        <div id="login-section">
          <input type="text" id="username-input" placeholder="Enter a username">
          <button class="btn btn-primary" onclick="login()">Login</button>
        </div>
        
        <div id="welcome-section" style="display: none;">
          <div id="welcome-message"></div>
          <button class="btn btn-primary" id="logout-btn" onclick="logout()">Logout</button>
        </div>
        
      </div>
      <div class="col-md-6">
          <h2 id="currentPlayerDisplay"></h2>
      </div>
    </div>
    <hr />
    <div class="justify-content-center mt-4">
      <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-primary">Highscores</span>
      </h4>
      
      <div id="leaderboard">
        
      </div>
      <div class="justify-content-center mt-4">
        <a href="play.html">
          <button onclick='updateLeaderboard("Andrew", "win")' class="btn btn-success w-100">Try out the game for yourself!</button>
        </a>
      </div>
    </div>
  </div>
</body>

</html>
<script>
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
  </script>
