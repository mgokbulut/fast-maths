<?php
  include_once("includes\db_handler-inc.php");
?>
<?php
  session_start();

  if (!isset($_SESSION['username'])) {
    $_SESSION['msg'] = "You must log in first";
    header('location: Login_register/login.php');
  }
  if ($_SESSION['username'] != 'admin') {
    $_SESSION['msg'] = "You are not an admin";
    header('location: Login_register/login.php');
  }
  if (isset($_GET['logout'])) {
    session_destroy();
    unset($_SESSION['username']);
    header("location: Login_register/login.php");
  }
  if(isset($_GET["s"]))
  {
    $_SESSION['question']=0;
  }
?>

<!DOCTYPE html>
<html>
<head>
  <title>Fast Maths</title>
	<link rel="stylesheet" type="text/css" href="includes/mainstyle.css">
  <link rel="stylesheet" type="text/css" href="includes/mainstyle.css">
  <script type="text/javascript" src="send_question/sendQuestion.js"></script>
  <script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML-full"></script>
  <script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"></script>	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en">
  <script type="text/javascript" async src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML"></script>

</head>
  <body>
    <div style="border: 2px solid black; border-radius:10px;text-align:center;font-size:30px; width: 500px; color:red;margin: 5px 0px 5px 700px;">
      <?php

        date_default_timezone_set('Asia/Tokyo');
        echo date('j/n/Y - H:i:s');

        //instead of j, d can be used to get 01, 02
        // j gives 1, 2

        //n gives -> 1, 2 but m gives 01,02
      ?>
    </div>
    <button class="logout" style="float:right; width:200px; height:240px; font-size:16px; border:5px solid black; border-radius:10px;"> <a href="includes/header.php?logout=0"><span>Log Out</span></a></button>

    <form name="sendtoDB" id="sendtoDB" class="" action="" method="post" style="width:1200px; height:200px; border: 5px solid lightblue; border-radius:10px;">
      <input type="text" id="level" name="level" placeholder=" Level to send (9,10,11,12,13)" style=" width:500px;height:100px;border: 5px solid black; border-radius:10px;font-size:35px;margin-top:40px;">
      <input type="text" name="amount" id="amount" placeholder=" amount" style=" width:500px;height:100px;border: 5px solid black; border-radius:10px;font-size:35px;margin-top:40px;">
      <input type="button" name="" value="send" onclick="send();" style=" width:100px;height:100px;border: 5px solid black; border-radius:10px;font-size:30px;margin-top:40px;">
    </form>
  </body>
</html>
