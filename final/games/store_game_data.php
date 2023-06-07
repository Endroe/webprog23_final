<?php
$filename = $_POST['filename'];
$gameData = $_POST['gameData'];

if (!empty($filename) && !empty($gameData)) {
  $jsonData = json_encode($gameData);
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