<?php

$filename = $_GET['filename'];
$currentPlayer = $_GET['requestingClient'];
$lastUpdated = $_GET['requestTime'];

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
            'stringState' => $stringState,
            'lastUpdated' => $lastUpdated,
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
            'player2' => "",
            'stringState' => "waiting",
            'lastUpdated' => $lastUpdated
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