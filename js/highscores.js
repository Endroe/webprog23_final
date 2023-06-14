// Function to update the leaderboard for a specific username
function updateLeaderboard(username, result) {
  $.getJSON('scores/highscores.json', function(data) {
    let found = false;

    // Iterate through the data to find the username
    data.forEach(function(score) {
      const scoreUsername = score.username;
      if (scoreUsername === username) {
        found = true;
        const scoreResult = parseInt(score.result);

        // Update the result for the username
        if (result === 'win') {
          score.wins = parseInt(score.wins) + 1;
        } else if (result === 'loss') {
          score.losses = parseInt(score.losses) + 1;
        } else if (result === 'tie') {
          score.ties = parseInt(score.ties) + 1;
        }
      }
    });

    // If the username is not found, add a new entry to the array
    if (!found) {
      const newScore = {
        username: username,
        wins: 0,
        losses: 0,
        ties: 0,
        xIcon: '❌',
        oIcon: '⭕'
      };

      if (result === 'win') {
        newScore.wins = 1;
      } else if (result === 'loss') {
        newScore.losses = 1;
      } else if (result === 'tie') {
        newScore.ties = 1;
      }

      data.push(newScore);
    }

    saveLeaderboardData(data);
    fetchAndDisplayLeaderboard();
  });
}

// Function to fetch and display the leaderboard
function fetchAndDisplayLeaderboard() {
  $.getJSON('scores/highscores.json', function(data) {
    // Sort the data based on wins in descending order
    data.sort(function(a, b) {
      const winsA = parseInt(a.wins);
      const winsB = parseInt(b.wins);
      return winsB - winsA;
    });

    // Retrieve the top 25 players by wins
    const topPlayers = data.slice(0, 25);

    let leaderboardHTML = `
      <table class="table">
        <thead>
          <tr>
            <th>Position</th>
            <th>Player</th>
            <th>Wins</th>
            <th>Ties</th>
            <th>Losses</th>
            <th>Win Rate</th>
          </tr>
        </thead>
        <tbody>
    `;

    topPlayers.forEach(function(score, index) {
      const playerName = score.username;
      let itemClass = 'text-normal'; // Default class for normal players

      if (index === 0) {
        itemClass = 'text-success'; // Class for #1 player (green)
      } else if (index === 1) {
        itemClass = 'text-warning'; // Class for #2 player (yellow)
      } else if (index === 2) {
        itemClass = 'text-danger'; // Class for #3 player (red)
      }

      let wins = parseInt(score.wins);
      let losses = parseInt(score.losses);
      let ties = parseInt(score.ties);

      let totalGames = wins + losses + ties;
      let percentage = Math.round((wins / totalGames) * 100);

      leaderboardHTML += `
        <tr>
          <td class="${itemClass}">${index + 1}</td>
          <td class="${itemClass}">${playerName}</td>
          <td class="${itemClass}">${wins}</td>
          <td class="${itemClass}">${ties}</td>
          <td class="${itemClass}">${losses}</td>
          <td class="${itemClass}">${percentage}%</td>
        </tr>
      `;
    });

    leaderboardHTML += `
        </tbody>
      </table>
    `;

    $('#leaderboard').html(leaderboardHTML);
  });
}

// Button to update leaderboard
$(document).ready(function() {
  $('#create-lobby-btn').click(function() {
    const score = $('#lobby-key-input').val();
    const playerName = "Andrew";
    const newScore = {
      username: playerName,
      wins: score,
      losses: score / 2,
      ties: score / 4
    };

    $.getJSON('scores/highscores.json', function(data) {
      let highScoreData = data;

      // Check if the player already exists in the high scores array
      let playerExists = false;
      for (let i = 0; i < highScoreData.length; i++) {
        if (highScoreData[i].username === playerName) {
          highScoreData[i] = newScore;
          playerExists = true;
          break;
        }
      }

      if (!playerExists) {
        highScoreData.push(newScore);
      }
    });
  });

  fetchAndDisplayLeaderboard();
});

// Function to save the updated leaderboard data to the JSON file
function saveLeaderboardData(data) {
  const jsonData = JSON.stringify(data);
  $.ajax({
    type: 'POST',
    url: 'scores/store_high_scores.php',
    data: { leaderboardData: jsonData },
    success: function(response) {
      console.log('Leaderboard data saved successfully.');
    },
    error: function() {
      console.error('Failed to save leaderboard data.');
    }
  });
}
