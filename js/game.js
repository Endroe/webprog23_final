
const player1 = 'X';
const player2 = 'O';
let grid = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let localGrid = [ // This is the grid that gets displayed on screen.
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let lockedUsername = null;
let username1 = null;
let username2 = null;
let gameStringState = "notInGame";

let lobbyKey = Cookies.get('lobby');
let lastUpdated = null; // Variable to track the last updated timestamp

// Polling interval in milliseconds (e.g., update every 2 seconds)
const pollingInterval = 1000;

// Function to start the polling for live updates https://levelup.gitconnected.com/polling-in-javascript-ab2d6378705a?gi=f09e207a63ec
function startPolling() {
  setInterval(function() {
    retrieveGameData();
    checkForUpdates();
    updatePage();
  }, pollingInterval);
}

// Function to update the game board with the retrieved data
function updateGameBoard(gameData) {
  let board = gameData;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] !== localGrid[row][col]) {
        // Update the corresponding cell in the game board
        grid[row][col] = board[row][col];
        document.getElementsByClassName('cell')[row * 3 + col].innerText = board[row][col];
      }
    }
  }
}

function checkMoveLegality(row, col) {
  if (grid[row][col] !== "") {
    return false;
  }
  if (gameStringState === "player1turn" && username1 === lockedUsername) {
    return true;
  }
  else return gameStringState === "player2turn" && username2 === lockedUsername;
}

function Move(row, col) {
  
  let currentPlayer = null;
  if (checkMoveLegality(row, col) === false) {
    return;
  }
  if (gameStringState === "player1turn") {
    currentPlayer = player1;
  } else {
    currentPlayer = player2;
  }
  grid[row][col] = currentPlayer;
  document.getElementsByClassName('cell')[row * 3 + col].innerText = currentPlayer;
  
  // Animate the cell
  var cellId = 'cell-' + row + '-' + col;
  var cell = document.getElementById(cellId);
  anime({
    targets: cell,
    rotateY: '360deg',
      scale: [1, 1.2, 1],
      easing: 'easeInOutSine',
      duration: 1000,
      complete: function() {
          cell.style.backgroundColor = '#007bff';
      }
  });
  if (gameStringState === "player1turn") {
    gameStringState = "player2turn";
  }
  else if (gameStringState === "player2turn") {
    gameStringState = "player1turn";
  }
  else {
    gameStringState = "broken";
  }
  storeGameData(grid);
}

// Function to store game data in JSON file
function storeGameData(gameData) {
  const filename = lobbyKey + '.json';
  $.ajax({
    type: 'POST',
    url: 'games/store_game_data.php',
    data: {
      filename: filename,
      gameData: grid,
      player1: username1,
      player2: username2,
      stringState: gameStringState,
    },
    success: function(response) {
      console.log('Game data stored successfully.');
    },
    error: function() {
      console.error('Failed to store game data.');
    }
  });
}

// Function to retrieve game data from JSON file
function retrieveGameData() {
  const filename = lobbyKey + '.json';
  return $.ajax({ // We return this for when/then behaviours. Change this and it breaks!
    type: 'GET',
    url: 'games/retrieve_game_data.php',
    data: {
      filename: filename,
      gameData: grid,
      stringState: gameStringState,
      requestingClient: lockedUsername,
    },
    dataType: 'json',
    success: function(response) {
      // Handle the retrieved game data
      if (response && response.gameData) {
        username1 = response.player1;
        username2 = response.player2;
        grid = response.gameData;
        gameStringState = response.stringState;
      }
    },
    error: function() {
      console.error('Failed to retrieve game data.');
    }
  });
}

// Function to check for new updates since the last updated timestamp
function checkForUpdates() {
  const filename = lobbyKey + '.json';
  updateGameBoard(grid);
  lastUpdated = new Date().getTime(); // Update the last updated timestamp
  checkGameEnd();
}

function checkGameEnd() {
  if (checkWin("X")) {
    alert(`${username1} wins!`);
    updateLeaderboard(username1, "win");
    updateLeaderboard(username2, "loss");
    resetGame();
  }
  else if (checkWin("O")) {
    alert(`${username2} wins!`);
    updateLeaderboard(username2, "win");
    updateLeaderboard(username1, "loss");
    resetGame();
  }
  else if (checkTie()) {
    alert("It's a tie!");
    updateLeaderboard(username1, "tie");
    updateLeaderboard(username2, "tie");
    resetGame();
  }
}

function checkWin(player) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (grid[i][0] === player && grid[i][1] === player && grid[i][2] === player) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (grid[0][i] === player && grid[1][i] === player && grid[2][i] === player) {
      return true;
    }
  }

  // Check diagonals
  if (grid[0][0] === player && grid[1][1] === player && grid[2][2] === player) {
    return true;
  }
  if (grid[0][2] === player && grid[1][1] === player && grid[2][0] === player) {
    return true;
  }

  return false;
}


function checkTie() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row][col] === '') {
        return false;
      }
    }
  }
  return true;
}


function resetGame() {
    grid.forEach(row => row.fill(''));
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = '';
      cells[i].style.backgroundColor = 'aliceblue';
    }
    storeGameData(grid)
    currentPlayer = 'X';
}

/*Added the following handler for indicating leaving players but it still
has the following issues:
1. Used lobby keys cant be used again; once a file with a lobby key
has been created. Maybe clearing cache helps?
2. If a player gets a normal win, the win declaration gets blocked?
It just does not show who has won ig and the game for the winner does not reset.*/ 
function handlePlayerLeave(leavingPlayer) {
  // Determine the other player's username
  const otherPlayer = (leavingPlayer === username1) ? username2 : username1;

  // Declare the other player as the winner
  alert(`${otherPlayer} wins!`);

  // Update the leaderboard
  updateLeaderboard(otherPlayer, "win");
  updateLeaderboard(leavingPlayer, "loss");

  // Reset the game
  resetGame();
}
  

$(document).ready(function() {
  $('#gameStatusIndicator').hide();
  $('#alert-invalidlobby').hide();
  $('#alert-notloggedin').hide();
  $('#alert-roomNotAvailable').hide();
  $('#alert-duplicatePlayer').hide();
  $('#create-lobby-btn').click(function() {
    const lobby = $('#lobby-key-input').val();

    // Hide helpers.
    $('#alert-invalidlobby').hide();
    $('#alert-roomNotAvailable').hide();
    $('#alert-duplicatePlayer').hide();

    // Check if logged in.
    if (Cookies.get('username') === undefined) {
      $('#alert-notloggedin').show();
      return;
    }

    // Validate Lobby Code
    if (validateLobby(lobby) === false) {
      $('#alert-invalidlobby').show();
      return;
    }

    Cookies.set('lobby', lobby);
    Cookies.set('player', '');
    lobbyKey = lobby;

    $('#game-board').show();
    initializeGame();

    // Calls the leavingPlayer function
    $('#leave-game-btn').click(function() {
      // Get the username of the leaving player
      const leavingPlayer = lockedUsername;
  
      // Call the handlePlayerLeave function
      handlePlayerLeave(leavingPlayer);
    });
  });
});

function validateLobby(lobbyInput) {
  const re_lobby = /^[a-z0-9_-]{6}$/igm;
  if (re_lobby.test(lobbyInput) === false) {
    return false;
  } else {
    return true;
  }
}

// Function to initialize the game
function initializeGame() {
  lockedUsername = Cookies.get('username');
  let initialRetrieve = retrieveGameData();
  initialRetrieve.then(function() {
    //Check for duplicate login.
    if (lockedUsername === username1) {
      $('#alert-duplicatePlayer').show();
      username1 = null;
      username2 = null;
      lockedUsername = null;
      grid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
      localGrid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
      console.log("ERROR IN INITIALISATION");
      return;
    }

    if (username1 == null) {
      username1 = lockedUsername;
      gameStringState = "waiting";
      storeGameData(grid)
    } else if (username2 === "") {
      username2 = lockedUsername;
      gameStringState = "player1turn";
      storeGameData(grid)
    } else {
      $('#alert-roomNotAvailable').show();
      username1 = null;
      username2 = null;
      lockedUsername = null;
      grid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
      localGrid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ];
      console.log("ERROR IN INITIALISATION");
      return;
    }
    $('#gameStatusIndicator').show();
    $('#leave-game-btn').show();
    $('#lobby-creation').hide();
    stopAnimation = true;
    startPolling(); // Start the polling for live updates
  });
}

function updatePage() {
  // Handle the status indicator.
  if (gameStringState === "waiting") {
    $('#gameStatusIndicator').text("Waiting for opponent...");
  }
  else if (gameStringState === "player1turn") {
    $('#gameStatusIndicator').text(username1 + "'s turn...");
  }
  else if (gameStringState === "player2turn") {
    $('#gameStatusIndicator').text(username2 + "'s turn...");
  }
  else {
    $('#gameStatusIndicator').text("Unhandled game state.");
  }

  // Handle usernames on the screen.
  getUserData(username1, function(user1) {
    getUserData(username2, function(user2) {
      if (username1 === lockedUsername) {
        $('#player1title').text(username1);
        $('#player1emoji').text(user1.xIcon);
        $('#player2title').text(username2);
        $('#player2emoji').text(user2.oIcon);
        fetchAndDisplayUsersStats(username1, '#user1StatsDiv', username2, '#user2StatsDiv');

      }
      else {
        $('#player1title').text(username2);
        $('#player1emoji').text(user2.oIcon);
        $('#player2title').text(username1);
        $('#player2emoji').text(user1.xIcon);
        fetchAndDisplayUsersStats(username1, '#user2StatsDiv', username2, '#user1StatsDiv');
      }
    });
  });
}
function fetchAndDisplayUsersStats(username1, divId1, username2, divId2) {
  // Function to calculate the win rate percentage
  function calculatePercentage(count, total) {
    return Math.round((count / total) * 100);
  }

  // Function to generate the HTML for the stats list item
  function generateStatsListItem(title, percentage, count, colorClass) {
    return `
      <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
        <div class="${colorClass}">
          <h6 class="my-0">${title}</h6>
          <small><i class="fas fa-circle ${colorClass}"></i> ${percentage}%</small>
        </div>
        <span class="${colorClass}">${count}</span>
      </li>
    `;
  }

  // Fetch user stats using AJAX or fetch API
  $.getJSON('scores/highscores.json', function(data) {
    let user1Stats, user2Stats;
    // Find the stats for the specified usernames
    data.forEach(function(stats) {
      if (stats.username === username1) {
        user1Stats = {
          wins: stats.wins,
          ties: stats.ties,
          losses: stats.losses,
          totalGames: stats.wins + stats.ties + stats.losses
        };
      } else if (stats.username === username2) {
        user2Stats = {
          wins: stats.wins,
          ties: stats.ties,
          losses: stats.losses,
          totalGames: stats.wins + stats.ties + stats.losses
        };
      }
    });

    // Calculate win rate percentages
    const user1WinRate = calculatePercentage(user1Stats.wins, user1Stats.totalGames);
    const user2WinRate = calculatePercentage(user2Stats.wins, user2Stats.totalGames);
    const user1TieRate = calculatePercentage(user1Stats.ties, user1Stats.totalGames);
    const user2TieRate = calculatePercentage(user2Stats.ties, user2Stats.totalGames);

    // Generate the HTML for user1's stats
    const user1StatsHTML = `
      <ul class="list-group">
        ${generateStatsListItem('Wins', user1WinRate, user1Stats.wins, 'text-success')}
        ${generateStatsListItem('Losses', 100 - user1WinRate - user1TieRate, user1Stats.losses, 'text-danger')}
        ${generateStatsListItem('Ties', user1TieRate, user1Stats.ties, 'text-warning')}
      </ul>
    `;

    // Generate the HTML for user2's stats
    const user2StatsHTML = `
      <ul class="list-group">
        ${generateStatsListItem('Wins', user2WinRate, user2Stats.wins, 'text-success')}
        ${generateStatsListItem('Losses', 100 - user2WinRate - user2TieRate, user2Stats.losses, 'text-danger')}
        ${generateStatsListItem('Ties', user2TieRate, user2Stats.ties, 'text-warning')}
      </ul>
    `;

    // Write the HTML to the specified divs
    $(divId1).html(user1StatsHTML);
    $(divId2).html(user2StatsHTML);
  });
}

