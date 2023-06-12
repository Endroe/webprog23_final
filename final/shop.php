<?php include 'tpl/head.php'; ?>
<!-- Chart.js -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.3.0/chart.umd.js" integrity="sha512-CMF3tQtjOoOJoOKlsS7/2loJlkyctwzSoDK/S40iAB+MqWSaf50uObGQSk5Ny/gfRhRCjNLvoxuCvdnERU4WGg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <div class="jumbotron">
        <div class="row">
            <div class="col-md-6">
                <h1 class="display-4">Your Stats</h1>
                <p class="lead">Wins, Losses, and Ties</p>
                <div class="row">
                    <div class="col-lg-6">
                        <div id='xIcon'></div>
                    </div>
                    <div class="col-lg-6">
                        <div id='oIcon'></div>
                    </div>
                </div>
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