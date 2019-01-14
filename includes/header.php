<?php
  include_once("includes/db_handler-inc.php");
?>

<?php
  $id = $_SESSION['user_id'];
  $username = $_SESSION['username'];

  $query1 = "SELECT * FROM users WHERE username='$username' AND id='$id'";
  $results = mysqli_query($connection, $query1);
  if (mysqli_num_rows($results) == 1) {
    while($row=mysqli_fetch_array($results)){
      $max_point=$row["max_point"];
      $id=$row["id"];
      $lastDate = $row["daily_questions"];
      $year9Info = $row["year9"];
      $year10Info = $row["year10"];
      $year11Info = $row["year11"];
      $year12Info = $row["year12"];
    }

    $_SESSION['max_point'] = $max_point;
    $_SESSION['daily_questions'] = $lastDate;
    $_SESSION['year9'] = $year9Info;
    $_SESSION['year10'] = $year10Info;
    $_SESSION['year11'] = $year11Info;
    $_SESSION['year12'] = $year12Info;
  }
?>

<?php
  session_start();

  if (!isset($_SESSION['username'])) {
    $_SESSION['msg'] = "You must log in first";
    header('location: Login_register/login.php');
  }// /images/picture.jpg
  if (isset($_GET['logout'])) {
    session_destroy();
    unset($_SESSION['username']);
    header("location: ../Login_register/login.php");
  }
?>

<!DOCTYPE html>
<html>
<head>
  <title>Fast Maths</title>

  <!-- <link rel="stylesheet" type="text/css" href="mainstyle.css">
	<script type="text/javascript" src="script.js"></script>
	<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script type="text/javascript" src="timer.js"></script>
	<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full"></script>
	<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
	<script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"></script> -->


  <link rel="stylesheet" type="text/css" href="includes/mainstyle.css">
	<script type="text/javascript" src="gameScript.js"></script>
  <script type="text/javascript" src="calculator.js"></script>
  <script type="text/javascript" src="libraries/jquery.js"></script>
  <script type="text/javascript" src="libraries/jquery-ajax.js"></script>
  <html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
  <script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"></script>

</head>

  <script type="text/javascript">
    //adjusting screen size for all costumers
    var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
    var width_proportion = x * 100 /1920;
    width_proportion = width_proportion.toString() + "%";
    var height_proportion = y * 100 /950;
    height_proportion = height_proportion.toString() + "%";
    $('body').css('width', width_proportion);
    $('body').css('height', height_proportion);
  </script>

  <body>
    <div class="topbar">

        <div style="display:inline-block;">
          <!--Logo img-->
          <img class="logo" src="includes/logo.png">

          <!--Mainnavigation bar-->
          <ul class="mainnavigationbar">
              <li><a href="home.php">Home</a></li>
              <li><a href="gamestart.php">Game</a></li>
              <li><a href="Daily-Questions.php">Daily Questions</a></li>
              <!-- <button onclick="sq_send()">avg 20 Sim eq to db</button>
              <button onclick="aq_send()">100 alg eq to db</button> -->
          </ul>

        </div>

        <!--Profile Info-->
        <div style="float:right;" >
          <div class="profileinfo">

            <div class="name_topscore">
              <p style="margin-top: 5px;"><b>Name:</b><?php echo $_SESSION['username']; ?> </p>
              <p style="margin-bottom: 5px;"><b>Top-score:</b><?php echo $_SESSION['max_point']; ?></p>
            </div>

            <?php
            function getRate($yearGroup){
              $arr = explode(",", $yearGroup);
              if($arr[1] == 0){
                if($arr[0] == 0){
                  $rate = "0%";
                }
                else {
                  $rate = "100%";
                }
              }
              else if ($arr[0] == 0) {
                $rate = "0%";
              }
              else {
                $rate = 100*($arr[0] / ($arr[0] + $arr[1]));
                $rate = round($rate, 1);
                $rate = (string)$rate ."%";
              }
              return $rate;
            }

             ?>
            <div class="successrates">
              <p style="margin-top: 5px;"><b>year9:</b><?php echo getRate($_SESSION['year9']); ?> </p>
              <p style="margin-bottom: 5px;"><b>year10:</b><?php echo getRate($_SESSION['year10']); ?> </p>
            </div>

            <div class="successrates" style="margin-left:10px;">
              <p style="margin-top: 5px;"><b>year11:</b><?php echo getRate($_SESSION['year11']); ?> </p>
              <p style="margin-bottom: 5px;"><b>year12:</b><?php echo getRate($_SESSION['year12']); ?> </p>
            </div>

          </div>
              <button class="logout"> <a href="includes/header.php?logout=0"><span>Log Out</span></a></button>
        </div>
      </div>
