<?php
$filename = $_POST['filename'];
$gameState = $_POST['gameData'];
$inputUsername = $_POST['username'];

if (!empty($filename) && !empty($gameState)) {
  $jsonData = json_encode($gameState);
  $filePath = $filename;
  if (file_put_contents($filePath, $jsonData, LOCK_EX) !== false) {
    echo json_encode(['success' => true]);
  } else {
    echo json_encode(['error' => 'Failed to store game data']);
  }
} else {
  echo json_encode(['error' => 'Invalid filename or game data']);
}
?>