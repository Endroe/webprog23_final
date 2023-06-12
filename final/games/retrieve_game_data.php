<?php

$filename = $_GET['filename'];
//$inputUsername = $_GET['username'];

if (!empty($filename)) {
    $filePath = $filename;

    if (file_exists($filePath)) {
        $data = file_get_contents($filePath);
        $data_decode = json_decode($data, true);
        $gameData = $data_decode['grid'];
        $player1 = $data_decode['player1'];
        $player2 = $data_decode['player2'];
        $stringState = $data_decode['stringState'];
        $responseData = [
            'gameData' => $gameData,
            'player1' => $player1,
            'player2' => $player2,
            'stringState' => $stringState
        ];
        echo json_encode($responseData);
    } else {
        // Create an empty grid with additional data
        $emptyGrid = [
            'grid' => [
                ['', 'X', ''],
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