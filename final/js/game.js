
const player1 = 'X';
const player2 = 'O';
const grid = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

var username1 = null;
var username2 = null;
var gameStringState = "notInGame";

let lobbyKey = Cookies.get('lobby');
let lastUpdated = null; // Variable to track the last updated timestamp

// Polling interval in milliseconds (e.g., update every 2 seconds)
const pollingInterval = 1000;

// Function to start the polling for live updates https://levelup.gitconnected.com/polling-in-javascript-ab2d6378705a?gi=f09e207a63ec
function startPolling() {
  setInterval(function() {
    retrieveGameData();
  }, pollingInterval);
}

// Function to update the game board with the retrieved data
function updateGameBoard(gameData) {
  let board = gameData.grid;
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (board[row][col] !== grid[row][col]) {
        // Update the corresponding cell in the game board
        grid[row][col] = board[row][col];
        document.getElementsByClassName('cell')[row * 3 + col].innerText = board[row][col];
      }
    }
  }
}


function Move(row, col) {
  if ((currentPlayer === player) && grid[row][col] === '') {
    grid[row][col] = currentPlayer;
    document.getElementsByClassName('cell')[row * 3 + col].innerText = currentPlayer;
    if (checkWin(currentPlayer)) {
      alert(`${currentPlayer} wins!`);
      resetGame();
    } else if (checkTie()) {
      alert("It's a tie!");
      resetGame();
    } else {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
      storeGameData(grid);
    }
  }
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
  const username = Cookies.get('username');
  const filename = lobbyKey + '.json';

  //TEMP: Console Variables
  //console.log(username1);
  //console.log(username2);
  //console.log(gameStringState);

  $.ajax({
    type: 'GET',
    url: 'games/retrieve_game_data.php',
    data: {
      filename: filename,
      gameData: grid,
      currentPlayer: username,
      player1: username1,
      player2: username2,
      stringState: gameStringState,
    },
    dataType: 'json',
    success: function(response) {

      // Handle the retrieved game data
      if (response && response.gameData) {
        const gameData = response.gameData;
        username1 = response.player1;
        username2 = response.player2;
        gameStringState = response.stringState;
        // Update the game board with the retrieved data
        //updateGameBoard(gameData);
        //lastUpdated = new Date().getTime(); // Update the last updated timestamp
        //checkPlayerTurn(gameData);
      }
    },
    error: function() {
      console.error('Failed to retrieve game data.');
    }
  });
}

// Function to check the player's turn based on the game data
function checkPlayerTurn(gameData) {
  const totalMoves = gameData.grid.flat().filter(value => value !== '').length;
  currentPlayer = totalMoves % 2 === 0 ? player1 : player2;
}

// Function to check for new updates since the last updated timestamp
function checkForUpdates() {
  const filename = lobbyKey + '.json';
  $.ajax({
    type: 'GET',
    url: 'games/retrieve_game_data.php',
    data: { filename: filename, lastUpdated: lastUpdated },
    dataType: 'json',
    success: function(response) {
      if (response && response.gameData) {
        const gameData = response.gameData;
        updateGameBoard(gameData);
        lastUpdated = new Date().getTime(); // Update the last updated timestamp
        checkPlayerTurn(gameData);
      }
    },
    error: function() {
      console.error('Failed to check for updates.');
    }
  });
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


//   function resetGame() {
//       grid.forEach(row => row.fill(''));
//       const cells = document.getElementsByClassName('cell');
//       for (let i = 0; i < cells.length; i++) {
//         cells[i].innerText = '';
//       }
//       storeGameData(grid)
//       currentPlayer = 'X';
//   }


$(document).ready(function() {
  $('#alert-invalidlobby').hide();
  $('#alert-notloggedin').hide();
  $('#create-lobby-btn').click(function() {
    const lobby = $('#lobby-key-input').val();

    // Validate Lobby Code
    if (validateLobby(lobby) === false) {
      $('#alert-invalidlobby').show();
      return;
    }

    // Check if logged in.
    if (Cookies.get('username') === null) {
      $('#alert-notloggedin').show();
      return;
    }

    $('#alert-invalidlobby').hide();
    console.log('Lobby key:', lobby);
    Cookies.set('lobby', lobby);
    Cookies.set('player', '');
    lobbyKey = lobby;

    $('#game-board').show();
    initializeGame();
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
  retrieveGameData(); // Initial retrieval of game data
  if (username1 == null) {
    username1 = Cookies.get('username');
    gameStringState = "waiting";
    storeGameData(grid)
  } else if (username2 == null || username2 === "") {
    console.log(username2);
    username2 = Cookies.get('username');
    gameStringState = "player1turn";
    storeGameData(grid)
  } else {
    console.log("ERROR IN INITIALISATION");
  }
  startPolling(); // Start the polling for live updates
}