<?php include 'tpl/head.php'; ?>
<h1 class="text-center my-4">Tic Tac Toe</h1>
<div class="row justify-content-center">
    <!-- Lobby Creation -->
    <div class="col-md-6">
        <div id="lobby-creation">
            <input type="text" id="lobby-key-input" placeholder="Enter a lobby key"> <br>
            <button class="btn btn-primary" id="create-lobby-btn">Login</button>
            <div id="alert-notloggedin">You must be logged in to play!</div>
            <div id="alert-invalidlobby">Lobby key is invalid.</div>
        </div>
    </div>
    <div class="col-md-6">
        <h2 id="currentPlayerDisplay"></h2>
    </div>
</div>
<hr />
<div class="row justify-content-center" id="game-board" style="display: none;" >

    <div class="col-md-3 col-lg-3">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Jawid</span>
            <span class="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-danger-subtle border border-danger-subtle rounded-pill">
              <img class="rounded-circle me-1" width="24" height="24" src="https://github.com/endroe.png" alt="">
            </span>
        </h4>

        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                <div class="text-success">
                    <h6 class="my-0">Wins</h6>
                    <small><i class="fas fa-circle text-success"></i> 45%</small>
                </div>
                <span class="text-success">92</span>
            </li>
            <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                <div class="text-danger">
                    <h6 class="my-0">Losses</h6>
                    <small><i class="fas fa-circle text-danger"></i> 23%</small>
                </div>
                <span class="text-danger">78</span>
            </li>
            <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                <div class="text-warning">
                    <h6 class="my-0">Ties</h6>
                    <small><i class="fas fa-circle text-warning"></i> 30%</small>
                </div>
                <span class="text-warning">85</span>
            </li>
        </ul>
        <div class="justify-content-center mt-4">
            <button onclick="resetGame()" class="btn btn-secondary disabled w-100">Opponent</button>
        </div>
    </div>

    <div class="col-6">
        <div class="row">
            <div class="col-md-4 cell" onclick="Move(0,0)"></div>
            <div class="col-md-4 cell" onclick="Move(0,1)"></div>
            <div class="col-md-4 cell" onclick="Move(0,2)"></div>
        </div>
        <div class="row">
            <div class="col-md-4 cell" onclick="Move(1,0)"></div>
            <div class="col-md-4 cell" onclick="Move(1,1)"></div>
            <div class="col-md-4 cell" onclick="Move(1,2)"></div>
        </div>
        <div class="row">
            <div class="col-md-4 cell" onclick="Move(2,0)"></div>
            <div class="col-md-4 cell" onclick="Move(2,1)"></div>
            <div class="col-md-4 cell" onclick="Move(2,2)"></div>
        </div>
    </div>

    <div class="col-md-3 col-lg-3">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">Andrew</span>
            <span class="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle rounded-pill">
              <img class="rounded-circle me-1" width="24" height="24" src="https://github.com/endroe.png" alt="">
            </span>
        </h4>

        <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                <div class="text-success">
                    <h6 class="my-0">Wins</h6>
                    <small><i class="fas fa-circle text-success"></i> 45%</small>
                </div>
                <span class="text-success">92</span>
            </li>
            <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                <div class="text-danger">
                    <h6 class="my-0">Losses</h6>
                    <small><i class="fas fa-circle text-danger"></i> 23%</small>
                </div>
                <span class="text-danger">78</span>
            </li>
            <li class="list-group-item d-flex justify-content-between bg-body-tertiary">
                <div class="text-warning">
                    <h6 class="my-0">Ties</h6>
                    <small><i class="fas fa-circle text-warning"></i> 30%</small>
                </div>
                <span class="text-warning">85</span>
            </li>
        </ul>
        <div class="justify-content-center mt-4">
            <button onclick="resetGame()" class="btn btn-danger w-100">Leave Game</button>
        </div>
        <!-- <form class="p-2">
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Username">
                <button type="submit" class="btn btn-secondary">Sign in</button>
            </div>
        </form> Why is this here? Feel free to add back if it's actually necessary. -->
    </div>

</div>
</div>
<div class="col-md-3 col-lg-3">
    <h4 class="d-flex justify-content-between align-items-center mb-3">
        <span class="text-primary">Highscores</span>
        <span class="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-secondary-subtle border border-secondary-subtle rounded-pill">
          <img class="rounded-circle me-1" width="24" height="24" src="https://github.com/endroe.png" alt="">
        </span>
    </h4>

    <div id="leaderboard">

    </div>
    <div class="justify-content-center mt-4">
        <button onclick='updateLeaderboard("Andrew", "win")' class="btn btn-danger w-100">Add win to andrew button</button>
    </div>
</div>
</div>
</body>

</html>