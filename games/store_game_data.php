<?php
/**
 * Stores the game data provided in the JSON file specified.
 *
 * @param string $filename The requested filename for the JSON file.
 * @param integer $lastUpdated The UNIX timestamp for when the data was requested.
 * @param object $JsonRaw The unencoded version of what is to be stored.
 * @param object $jsonData The encoded version of what is to be stored.
 * @param array $gameState The status of the game board.
 * @param string $player1 The username of player 1.
 * @param string $player2 The username of player 2.
 * @param string $stringState What action the game is currently in.
 * @param string $filePath The file to send the data to.
 */

$filename = $_POST['filename'];
$gameState = $_POST['gameData'];
$player1 = $_POST['player1'];
$player2 = $_POST['player2'];
$stringState = $_POST['stringState'];
$lastUpdated = $_POST['storeTime'];

if (!empty($filename) && !empty($gameState)) {
    $jsonRaw = [
        'grid' => $gameState,
        'player1' => $player1,
        'player2' => $player2,
        'stringState' => $stringState,
        // Next variable is not used in the game, but is useful for a serverside program that cleans up old lobbies.
        'lastUpdated' => $lastUpdated,
    ];
    //$jsonRaw = [$gameState, $player1, $player2, $stringState];
    $jsonData = json_encode($jsonRaw);
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