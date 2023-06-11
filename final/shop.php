<?php include 'tpl/head.php'; ?>
<!-- Chart.js -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>   
    <div class="jumbotron">
        <div class="row">
            <div class="col-md-6">
                <h1 class="display-4">Your Stats</h1>
                <p class="lead">Wins, Losses, and Ties</p>
            </div>
            <div class="col-md-6 h-50 d-inline-block">
                <canvas id="chart"></canvas>
            </div>
        </div>
    </div>


    <div id="emoji-container" class="row"></div>

    <script src="js/shop.js"></script> 
</body>

</html>