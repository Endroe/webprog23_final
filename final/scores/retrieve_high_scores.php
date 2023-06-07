<?php
$filename = $_GET['filename'];

if (!empty($filename)) {
  $filePath = $filename;

  if (file_exists($filePath)) {
    $data = file_get_contents($filePath);
    $responseData = ['gameData' => json_decode($data)];
    echo json_encode($responseData);
  } else {
    // Create a scoreboard
    $emptyGrid = [
        // # NAME WINS LOSSES TIES
        ["Andrew", 424, 4, 45],
        
    ];
    $jsonData = json_encode($emptyGrid);
    // Store the empty grid in the file
    if (file_put_contents($filePath, $jsonData, LOCK_EX) !== false) {
      $responseData = ['gameData' => $emptyGrid];
    } else {
      echo json_encode(['error' => 'Failed to create game data']);
    }
  }
} else {
  echo json_encode(['error' => 'Invalid filename']);
}
?>
