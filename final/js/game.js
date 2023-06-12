
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
  console.log(grid);
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

function checkMoveLegality() {
  if (gameStringState === "player1turn" && username1 === lockedUsername) {
    return true;
  }
  else return gameStringState === "player2turn" && username2 === lockedUsername;
}

function Move(row, col) {
  let currentPlayer = "undefined";
  if (checkMoveLegality() === false) {
    return;
  }
  if (gameStringState === "player1turn") {
    currentPlayer = player1;
  }
  else {
    currentPlayer = player2;
  }
  grid[row][col] = currentPlayer;
  document.getElementsByClassName('cell')[row * 3 + col].innerText = currentPlayer;
  if (checkWin(currentPlayer)) {
    alert(`${currentPlayer} wins!`);
    resetGame();
  } else if (checkTie()) {
    alert("It's a tie!");
    resetGame();
  } else {
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
  //console.log("retrieval init happens.")

  $.ajax({
    type: 'GET',
    url: 'games/retrieve_game_data.php',
    async: false,
    data: {
      filename: filename,
      gameData: grid,

      stringState: gameStringState,
    },
    dataType: 'json',
    success: function(response) {
      // Handle the retrieved game data
      //console.log("ajax happens");
      if (response && response.gameData) {
        const gameData = response.gameData;
        username1 = response.player1;
        username2 = response.player2;
        grid = response.gameData;
        gameStringState = response.stringState;
        // Update the game board with the retrieved data
        //updateGameBoard(gameData);
        //lastUpdated = new Date().getTime(); // Update the last updated timestamp
        //checkPlayerTurn(gameData);
      }
    },
    error: function() {
      console.error('Failed to retrieve game data.');
      console.log("ajax does not happen")
    }
  });
  return "done";
}

// Function to check the player's turn based on the game data
function checkPlayerTurn(gameData) {
  const totalMoves = gameData.grid.flat().filter(value => value !== '').length;
  currentPlayer = totalMoves % 2 === 0 ? player1 : player2;
}

// Function to check for new updates since the last updated timestamp
function checkForUpdates() {
  const filename = lobbyKey + '.json';
  //$.ajax({
  //  type: 'GET',
  //  url: 'games/retrieve_game_data.php',
  //  data: { filename: filename, lastUpdated: lastUpdated },
  //  dataType: 'json',
  //  success: function(response) {
  //    if (response && response.gameData) {
  //      const gameData = response.gameData;
  //      updateGameBoard(gameData);
  //      lastUpdated = new Date().getTime(); // Update the last updated timestamp
  //      checkPlayerTurn(gameData);
  //    }
  //  },
  //  error: function() {
  //    console.error('Failed to check for updates.');
  //  }
  //});
  updateGameBoard(grid);
  lastUpdated = new Date().getTime(); // Update the last updated timestamp
  //checkPlayerTurn(gameData);
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
  lockedUsername = Cookies.get('username');
  $.when(retrieveGameData()).done(function (a1) {
    console.log("INIT RETRIEVAL");
    console.log(username1);
    console.log(username2);
    if (username1 == null) {
      username1 = lockedUsername;
      gameStringState = "waiting";
      storeGameData(grid)
    } else if (username2 === "") {
      console.log(username2);
      username2 = lockedUsername;
      gameStringState = "player1turn";
      storeGameData(grid)
    } else {
      console.log("ERROR IN INITIALISATION");
    }
    console.log("INIT STORED");
    console.log(username1);
    console.log(username2);
    startPolling(); // Start the polling for live updates
  });
}

function updatePage() {
  $('#gameStatusIndicator').text(gameStringState);
  if (username1 === lockedUsername) {
    $('#player1title').text(username1);
    $('#player2title').text(username2);
  }
  else {
    $('#player1title').text(username2);
    $('#player2title').text(username1);
    console.log("we are not the host.")
  }
}