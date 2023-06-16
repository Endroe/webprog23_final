<?php
/**
 * Attempts to retrieve the game data from the requested JSON file.
 * If the file cannot be found, create it with initial data and send that to the user instead.
 *
 * @param string $filename The requested filename for the JSON file.
 * @param string $currentPlayer The username of the player requesting the game data.
 * @param integer $lastUpdated The UNIX timestamp for when the data was requested.
 * @param object $data The raw data obtained from the JSON file.
 * @param object $data_decode The decoded JSON data from the file.
 * @param array $gameData The status of the game board.
 * @param string $player1 The username of player 1.
 * @param string $player2 The username of player 2.
 * @param string $stringState What action the game is currently in.
 * @param object $responseData The data to be returned to the requesting user.
 * @param object $jsonData The encoded version of $responseData.
 */

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