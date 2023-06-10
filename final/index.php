<?php include 'tpl/head.php'; ?>
<div class="container">
    <h1 class="text-center my-4">Tic Tac Toe</h1>
    <div class="row justify-content-center">
        <!-- Lobby Creation -->
        <div class="col-md-6">

        </div>
    </div>
    <hr />
    <div class="justify-content-center mt-4">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Highscores</span>
        </h4>

        <div id="leaderboard">

        </div>
        <div class="justify-content-center mt-4">
            <a href="play.php">
                <button onclick='updateLeaderboard("Andrew", "win")' class="btn btn-success w-100">Try out the game for yourself!</button>
            </a>
        </div>
    </div>
</div>
</body>

</html>
<script>
</script>
