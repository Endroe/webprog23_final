<?php include 'tpl/head.php'; ?>
    <h1 class="text-center my-4">Tic Tac Toe</h1>
    <h2 class="text-center my-4" id="gameStatusIndicator">Enter a Lobby Key</h2>
    <div class="row justify-content-center">
    <!-- Lobby Creation -->
        <div id="lobby-creation">
            <div class="row">
                <div class="col-md-6">
                    <input class="input w-100 h-100" type="text" id="lobby-key-input" placeholder="515151"> <br>
                </div>
                <div class="col-md-6">
                    <button class="btn btn-primary w-100" id="create-lobby-btn">Login</button>
                </div>
                <div id="alert-notloggedin">You must be logged in to play!</div>
                <div id="alert-invalidlobby">Lobby key is invalid.</div>
                <div id="alert-roomNotAvailable">Sorry, that lobby is not available.</div>
            </div>
        </div>
    </div>
    <hr />
    <!-- style="display: none;" -->
    <div class="row justify-content-center" id="game-board"  >

        <div class="col-md-3 col-lg-3">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span id="player2title" class="text-primary">Opponent</span>
                <span class="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-danger-subtle border border-danger-subtle rounded-pill">
                    <div id='player2emoji' class="rounded-circle me-1 emoji">😀</div>
                </span>
            </h4>

            <div id="user2StatsDiv"></div>
            <div class="justify-content-center mt-4">
                <button class="btn btn-secondary disabled w-100">Opponent</button>
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
                <span id="player1title" class="text-primary">Opponent</span>
                <span class="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-danger-subtle border border-danger-subtle rounded-pill">
                    <div id='player1emoji' class="rounded-circle me-1 emoji">😀</div>
                </span>
            </h4>

            <div id="user1StatsDiv"></div>
            <div class="justify-content-center mt-4">
                <button onclick="resetGame()" class="btn btn-danger w-100" id="leave-game-btn">Leave Game</button>
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
</div>
</body>

</html>