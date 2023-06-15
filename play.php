<?php include 'tpl/head.php'; ?>

    <!-- style="display: none;" -->
    <div class="row justify-content-center" id="game-board"  >

        <div class="col-md-3 col-lg-3">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span id="player2title" class="text-primary">Player 2</span>
                <span class="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-danger-subtle border border-danger-subtle rounded-pill">
                    <div id='player2emoji' class="rounded-circle me-1 emoji">⭕</div>
                </span>
                
            </h4>

            <div id="user2StatsDiv"></div>
            <div id="lobby-creation">
            <h4 class="text-center my-4">Enter a Lobby Key</h4>
                <input class="input w-100 h-100" type="text" id="lobby-key-input" placeholder="515151"> <br>
                <div id="alert-notloggedin">You must be logged in to play!</div>
                <div id="alert-invalidlobby">
                    Lobby key is invalid. <br>
                    Must be a sequence of 6 letters/numbers.
                </div>
                <div id="alert-duplicatePlayer">Sorry, you cannot play against yourself.</div>
                <div id="alert-roomNotAvailable">Sorry, that lobby is not available.</div>
            </div>
            <div class="justify-content-center mt-4">
                <div class="row">
                    <div class="col-md-6">
                        <button class="btn btn-primary w-100" id="create-lobby-btn">Join</button>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-warning w-100" id="generate-lobby-key-btn">Random</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-6">
            <div class="row">
                <div class="col-md-4 cell" onclick="Move(0,0)" id="cell-0-0"></div>
                <div class="col-md-4 cell" onclick="Move(0,1)" id="cell-0-1"></div>
                <div class="col-md-4 cell" onclick="Move(0,2)" id="cell-0-2"></div>
            </div>
            <div class="row">
                <div class="col-md-4 cell" onclick="Move(1,0)" id="cell-1-0"></div>
                <div class="col-md-4 cell" onclick="Move(1,1)" id="cell-1-1"></div>
                <div class="col-md-4 cell" onclick="Move(1,2)" id="cell-1-2"></div>
            </div>
            <div class="row">
                <div class="col-md-4 cell" onclick="Move(2,0)" id="cell-2-0"></div>
                <div class="col-md-4 cell" onclick="Move(2,1)" id="cell-2-1"></div>
                <div class="col-md-4 cell" onclick="Move(2,2)" id="cell-2-2"></div>
            </div>
        </div>


        <div class="col-md-3 col-lg-3">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span id="player1title" class="text-primary">Player 1</span>
                <span class="badge d-flex align-items-center p-1 pe-2 text-secondary-emphasis bg-danger-subtle border border-danger-subtle rounded-pill">
                    <div id='player1emoji' class="rounded-circle me-1 emoji">❌</div>
                </span>
            </h4>

            <div id="user1StatsDiv"></div>
            <div class="justify-content-center mt-4">
                <button onclick="handlePlayerLeave()" class="btn btn-danger w-100" id="leave-game-btn">Forfeit</button>
            </div>
        </div>
        
        <h4 class="text-center my-4" id="gameStatusIndicator">Initializing game...</h4>

    </div>
    </div>

</div>
</body>

</html>
