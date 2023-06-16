/**
 * Tic Tac Toe Game
 */

// Constants
const player1 = 'X';
const player2 = 'O';

// Game grids
let grid = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];
let localGrid = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// Player information
let lockedUsername = null;
let username1 = null;
let username2 = null;

// Game state
let gameStringState = "notInGame";

// Lobby information
let lobbyKey = Cookies.get('lobby');
let lastUpdated = null; // Variable to track the last updated timestamp

// Polling interval in milliseconds (e.g., update every second)
const pollingInterval = 1000;

/**
 * Start the polling for live updates
 * @link https://levelup.gitconnected.com/polling-in-javascript-ab2d6378705a?gi=f09e207a63ec
 */
function startPolling() {
  setInterval(function() {
    retrieveGameData();
    checkForUpdates();
    updatePage();

    if (gameStringState === "player1win" || gameStringState === "player2win") {
      handleWinReceive();
    }
    if (gameStringState === "player1forfeit" || gameStringState === "player2forfeit") {
      onReceiveForfeit();
    }
  }, pollingInterval);
}

/**
 * Update the game board with the retrieved data
 * @param {Array} gameData - The retrieved game data
 */
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

/**
 * Check if a move is legal
 * @param {number} row - The row index of the move
 * @param {number} col - The column index of the move
 * @returns {boolean} - True if the move is legal, false otherwise
 */
function checkMoveLegality(row, col) {
  if (grid[row][col] !== "") {
    return false;
  }
  if (gameStringState === "player1turn" && username1 === lockedUsername) {
    return true;
  } else {
    return gameStringState === "player2turn" && username2 === lockedUsername;
  }
}

/**
 * Make a move on the game board
 * @param {number} row - The row index of the move
 * @param {number} col - The column index of the move
 */
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
  } else if (gameStringState === "player2turn") {
    gameStringState = "player1turn";
  } else {
    gameStringState = "broken";
  }

  storeGameData(grid);
}

/**
 * Store game data in JSON file
 */
function storeGameData() {
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
      storeTime: lastUpdated,
    },
    success: function() {
      console.log('Game data stored successfully.');
    },
    error: function() {
      console.error('Failed to store game data.');
    }
  });
}

/**
 * Retrieve game data from JSON file
 * @returns {Promise} - A promise that resolves with the retrieved game data
 */
function retrieveGameData() {
  const filename = lobbyKey + '.json';
  return $.ajax({
    type: 'GET',
    url: 'games/retrieve_game_data.php',
    data: {
      filename: filename,
      gameData: grid,
      stringState: gameStringState,
      requestingClient: lockedUsername,
      requestTime: "test"
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

/**
 * Check for new updates since the last updated timestamp
 */
function checkForUpdates() {
  updateGameBoard(grid);
  lastUpdated = new Date().getTime(); // Update the last updated timestamp
  checkGameEnd();
}

/**
 * Check if the game has ended
 */
function checkGameEnd() {
  if (checkWin("X")) {
    gameStringState = "player1win";
    storeGameData(grid);
    sendOwnResult("X");
    resetGame();
  } else if (checkWin("O")) {
    gameStringState = "player2win";
    storeGameData(grid);
    sendOwnResult("O");
    resetGame();
  } else if (checkTie()) {
    gameStringState = "gameTie";
    storeGameData(grid);
    sendOwnResult("tie");
    resetGame();
  }
}

/**
 * Handle the win received from the server
 */
function handleWinReceive() {
  if (gameStringState === "player1win" && lockedUsername === username2) {
    gameStringState = "player2turn";
    resetGame();
  } else if (gameStringState === "player2win" && lockedUsername === username1) {
    gameStringState = "player1turn";
    resetGame();
  }
  storeGameData(grid);
}

/**
 * Send the result of the game for the current player
 * @param {string} winner - The winner of the game ("X" or "O") or "tie"
 */
function sendOwnResult(winner) {
  if (player1 === winner && lockedUsername === username1) {
    updateLeaderboard(lockedUsername, "win");
  } else if (player2 === winner && lockedUsername === username2) {
    updateLeaderboard(lockedUsername, "win");
  } else if (winner === "tie") {
    updateLeaderboard(lockedUsername, "tie");
  } else {
    updateLeaderboard(lockedUsername, "loss");
  }
}

/**
 * Check if a player has won the game
 * @param {string} player - The player to check ("X" or "O")
 * @returns {boolean} - True if the player has won, false otherwise
 */
function checkWin(player) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      grid[i][0] === player &&
      grid[i][1] === player &&
      grid[i][2] === player
    ) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      grid[0][i] === player &&
      grid[1][i] === player &&
      grid[2][i] === player
    ) {
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

/**
 * Check if the game is a tie
 * @returns {boolean} - True if the game is a tie, false otherwise
 */
function checkTie() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (grid[row][col] === "") {
        return false;
      }
    }
  }
  return true;
}

/**
 * Reset the game board and state
 */
function resetGame() {
  grid.forEach(row => row.fill(""));
  const cells = document.getElementsByClassName("cell");
  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].style.backgroundColor = "aliceblue";
  }
  storeGameData(grid);
}

/**
 * Handle a player leaving the game
 * @param {string} lockedUsername - The username of the player who left
 */
function handlePlayerLeave(lockedUsername) {
  if (lockedUsername === username1) {
    updateLeaderboard(lockedUsername, "loss");
    gameStringState = "player1forfeit";
  } else if (lockedUsername === username2) {
    updateLeaderboard(lockedUsername, "loss");
    gameStringState = "player2forfeit";
  }
  storeGameData(grid);
  resetGame();
}

/**
 * Handle a forfeit received from the server
 */
function onReceiveForfeit() {
  if (gameStringState === "player1forfeit") {
    gameStringState = "player2turn";
  } else if (gameStringState === "player2forfeit") {
    gameStringState = "player1turn";
  }
  storeGameData(grid);
  resetGame();
}

$(document).ready(function() {
  $('#gameStatusIndicator').hide();
  $('#alert-invalidlobby').hide();
  $('#alert-notloggedin').hide();
  $('#alert-roomNotAvailable').hide();
  $('#alert-duplicatePlayer').hide();

  $('#create-lobby-btn').click(function() {
    createLobby();
  });

  $('#generate-lobby-key-btn').click(function() {
    generateRandomKey();
    createLobby();
  });

  /**
   * Create a lobby and initialize the game
   */
  function createLobby() {
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
  }

  /**
   * Generate a random lobby key and set it in the input field
   */
  function generateRandomKey() {
    const min = 100000;
    const max = 999999;
    const randomKey = Math.floor(Math.random() * (max - min + 1)) + min;
    $('#lobby-key-input').val(randomKey);
  }

  // Calls the leavingPlayer function
  $('#leave-game-btn').click(function() {
    console.log("test");
    if (gameStringState === "player1turn" && lockedUsername === username1) {
      console.log("test1");
      handlePlayerLeave(lockedUsername);
    } else if (gameStringState === "player2turn" && lockedUsername === username2) {
      handlePlayerLeave(lockedUsername);
    }
  });
});

/**
 * Validate the lobby code
 * @param {string} lobbyInput - The lobby code to validate
 * @returns {boolean} - True if the lobby code is valid, false otherwise
 */
function validateLobby(lobbyInput) {
  const re_lobby = /^[a-z0-9_-]{6}$/igm;
  return re_lobby.test(lobbyInput) !== false;
}

/**
 * Initialize the game
 */
function initializeGame() {
  lastUpdated = new Date().getTime(); // Update the last updated timestamp
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
      storeGameData(grid);
    } else if (username2 === "") {
      username2 = lockedUsername;
      gameStringState = "player1turn";
      storeGameData(grid);
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
    // $('#lobby-creation').hide();
    stopAnimation = true;
    startPolling(); // Start the polling for live updates
  });
}

/**
 * Update the game page elements
 */
function updatePage() {
  // Handle the status indicator.
  switch (gameStringState) {
    case "waiting":
      $('#gameStatusIndicator').text("Waiting for opponent...");
      break;
    case "player1turn":
      $('#gameStatusIndicator').text(username1 + "'s turn...");
      break;
    case "player2turn":
      $('#gameStatusIndicator').text(username2 + "'s turn...");
      break;
    case "player1forfeit":
      $('#gameStatusIndicator').text(username1 + " forfeited.");
      break;
    case "player2forfeit":
      $('#gameStatusIndicator').text(username2 + " forfeited.");
      break;
    case "player1win":
      $('#gameStatusIndicator').text(username1 + " wins!");
      break;
    case "player2win":
      $('#gameStatusIndicator').text(username2 + " wins!");
      break;
    default:
      $('#gameStatusIndicator').text(gameStringState);
      break;
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
      } else {
        $('#player1title').text(username2);
        $('#player1emoji').text(user2.oIcon);
        $('#player2title').text(username1);
        $('#player2emoji').text(user1.xIcon);
        fetchAndDisplayUsersStats(username1, '#user2StatsDiv', username2, '#user1StatsDiv');
      }
    });
  });
}
/**
 * Fetch user statistics and display them
 * @param {string} username1 - The first username
 * @param {string} divId1 - The ID of the first div to display statistics
 * @param {string} username2 - The second username
 * @param {string} divId2 - The ID of the second div to display statistics
 */
function fetchAndDisplayUsersStats(username1, divId1, username2, divId2) {
  /**
   * Calculate the win rate percentage
   * @param {number} count - The number of wins
   * @param {number} total - The total number of games played
   * @returns {number} - The win rate percentage
   */
  function calculatePercentage(count, total) {
    return Math.round((count / total) * 100);
  }

  /**
   * Generate the HTML for the stats list item
   * @param {string} title - The title of the stats
   * @param {number} percentage - The win rate percentage
   * @param {number} count - The count of wins, losses, or ties
   * @param {string} colorClass - The CSS class for the item color
   * @returns {string} - The HTML for the stats list item
   */
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