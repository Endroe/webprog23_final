<?php
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