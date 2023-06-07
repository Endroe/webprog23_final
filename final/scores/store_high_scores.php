<?php
$leaderboardData = $_POST['leaderboardData'];

if (!empty($leaderboardData)) {
  $filePath = 'highscores.json';
  if (file_put_contents($filePath, $leaderboardData, LOCK_EX) !== false) {
    echo json_encode(['success' => true]);
  } else {
    echo json_encode(['error' => 'Failed to store leaderboardData']);
  }
} else {
  echo json_encode(['error' => 'Invalid leaderboardData']);
}
?>