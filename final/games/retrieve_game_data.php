<?php
$filename = $_GET['filename'];
$currentPlayer = $_GET['currentPlayer'];
if (!empty($filename)) {
  $filePath = $filename;

  if (file_exists($filePath)) {
    $data = file_get_contents($filePath);
    $responseData = ['gameData' => json_decode($data)];
    echo json_encode($responseData);
  } else {
    // Create an empty grid with additional data
    $emptyGrid = [
      'grid' => [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
      ],
      'player1' => $currentPlayer,
      'player2' => ''
    ];
    $jsonData = json_encode($emptyGrid);
    
    // Store the empty grid in the file
    if (file_put_contents($filePath, $jsonData, LOCK_EX) !== false) {
      $responseData = ['gameData' => $emptyGrid];
      echo json_encode($responseData);
    } else {
      echo json_encode(['error' => 'Failed to create game data']);
    }
  }
} else {
  echo json_encode(['error' => 'Invalid filename']);
}

?>