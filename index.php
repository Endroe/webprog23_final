<?php include 'tpl/head.php'; ?>
<div class="row justify-content-between" style='opacity: 0.8;'>
    <div class="row">
        <div class="col-md-4 cell" style="background-color: #007bff;"></div>
        <div class="col-md-4 cell"></div>
        <div class="col-md-4 cell"></div>
    </div>
    <div class="row">
        <div class="col-md-4 cell" style="background-color: #007bff;"></div>
        <div class="col-md-4 cell"></div>
        <div class="col-md-4 cell" style="background-color: #007bff;"></div>
    </div>
    <div class="row">
        <div class="col-md-4 cell" style="background-color: #007bff;"></div>
        <div class="col-md-4 cell"></div>
        <div class="col-md-4 cell"></div>
    </div>
    <div class="row">
        <div class="col-md-4 cell" style="background-color: #007bff;"></div>
        <div class="col-md-4 cell"></div>
        <div class="col-md-4 cell"></div>
    </div>
</div>
    <main role="main" class="inner cover content">
        <h1>Tic Tac Toe.</h1>
        <p class="lead">Players can test their skills against opponents and strive to achieve the top positions on the leaderboard. Emojis can be added to accounts to add a touch of fun and visual appeal.</p>
        <p class="lead">
            <a href="play.php" class="btn btn-lg btn-primary w-100">Play now!</a>
        </p>
        <h1>Leaderboard</h1>
        <div id="leaderboard"></div>
    </main>
    <footer class="mastfoot mt-auto">
        <p>Created by Andrew, Jawid & Cody</p>
    </footer>
</div>
</body>

</html>
<script>
var stopAnimation = false; // Set this flag to true when you want to stop the animation

function animateRandomMovement(element) {
    if (stopAnimation) {
        return; // Stop the animation if the flag is set to true
    }

    anime({
        targets: element,
        translateX: {
            value: function() {
                return anime.random(-1000, 1000) + 'px';
            },
        },
        translateY: {
            value: function() {
                return anime.random(-200, 1500) + 'px';
            },
        },
        easing: 'linear',
        duration: 8000,
        complete: function() {
            animateRandomMovement(element); // Repeat the animation once it's complete
        },
    });
}

document.querySelectorAll('.cell').forEach(function(cell) {
    animateRandomMovement(cell);
});
</script>
