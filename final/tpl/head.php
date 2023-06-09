<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Meta Data -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Tic Tac Toe</title>

    <!-- Styles -->
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/4.6.1/css/bootstrap.min.css" integrity="sha512-T584yQ/tdRR5QwOpfvDfVQUidzfgc2339Lc8uBDtcp/wYu80d7jwBgAxbyMh0a9YM9F8N3tdErpFI8iaGx6x5g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="css/styles.css">

    <!-- Scripts -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.1/jquery.min.js" integrity="sha512-bLT0Qm9VnAYZDflyKcBaQ2gg0hSYNQrJ8RilYldYQ1FxQYoCLtUjuuRuZo+fjqhx/qtq/1itJ0C2ejDxltZVFg==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
   <script src="https://cdn.jsdelivr.net/npm/js-cookie@3.0.5/dist/js.cookie.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <script type="application/javascript" src="js/highscores.js"></script>
    <script type="application/javascript" src="js/game.js"></script>
    <style>
        .cell {
            flex: 1;
            width: 20vw;
            height: 20vh;
            text-align: center;
            vertical-align: middle;
            font-size: 80px;
            cursor: pointer;
            margin: 2px;
            color:burlywood;
            background-color: aliceblue;
            transition: background-color 0.3s ease;
        }

        .cell:hover {
            background-color: #e5e5e5;
          }
      
          
    </style>
</head>

<body>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Tic Tac Toe</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
    aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="index.php" id="index-link">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="play.php" id="play-link">Play</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="shop.php" id="shop-link">Shop</a>
      </li>
    </ul>
  </div>
</nav>


<div class="container">

<script>
  // Get the current filename
  const currentFilename = window.location.pathname.split('/').pop();

  // Add "active" class to the corresponding navbar link based on the current filename
  switch (currentFilename) {
    case 'index.php':
      document.getElementById('index-link').classList.add('active');
      break;
    case 'play.php':
      document.getElementById('play-link').classList.add('active');
      break;
    case 'shop.php':
      document.getElementById('shop-link').classList.add('active');
      break;
    default:
      break;
  }
</script>