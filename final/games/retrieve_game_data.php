<?php
$filename = $_GET['filename'];
$currentPlayer = $_GET['currentPlayer'];

if (!empty($filename)) {
    $filePath = $filename;

    if (file_exists($filePath)) {
        $data = file_get_contents($filePath);
        $data_decode = json_decode($data);
        $gameState = $data_decode[0];
        $player1 = $data_decode[1];
        $player2 = $data_decode[2];
        $stringState = $data_decode[3];
        $responseData = [
            'gameData' => $gameState,
            'player1' => $player1,
            'player2' => $player2,
            'stringState' => $stringState
        ];
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
            'player2' => null,
            'stringState' => "waiting"
        ];
        $jsonData = json_encode($emptyGrid);

        // Store the empty grid in the file
        if (file_put_contents($filePath, $jsonData, LOCK_EX) !== false) {
            $responseData = $emptyGrid;
            echo json_encode($responseData);
        } else {
            echo json_encode(['error' => 'Failed to create game data']);
        }
    }
} else {
    echo json_encode(['error' => 'Invalid filename']);
}

?>