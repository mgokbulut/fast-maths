<?php
  include_once("includes/db_handler-inc.php");
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

<style media="screen">
table.blueTable {
  border: 1px solid #1C6EA4;
  background-color: #EEEEEE;
  width: 100%;
  text-align: left;
  border-collapse: collapse;
}
table.blueTable td, table.blueTable th {
  border: 1px solid #AAAAAA;
  padding: 3px 2px;
}
table.blueTable tbody td {
  font-size: 13px;
}
table.blueTable tr:nth-child(even) {
  background: #D0E4F5;
}
table.blueTable thead {
  background: #1C6EA4;
  background: -moz-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  background: -webkit-linear-gradient(top, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  background: linear-gradient(to bottom, #5592bb 0%, #327cad 66%, #1C6EA4 100%);
  border-bottom: 2px solid #444444;
}
table.blueTable thead th {
  font-size: 15px;
  font-weight: bold;
  color: #FFFFFF;
  border-left: 2px solid #D0E4F5;
}
table.blueTable thead th:first-child {
  border-left: none;
}

table.blueTable tfoot {
  font-size: 14px;
  font-weight: bold;
  color: #FFFFFF;
  background: #D0E4F5;
  background: -moz-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
  background: -webkit-linear-gradient(top, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
  background: linear-gradient(to bottom, #dcebf7 0%, #d4e6f6 66%, #D0E4F5 100%);
  border-top: 2px solid #444444;
}
table.blueTable tfoot td {
  font-size: 14px;
}
table.blueTable tfoot .links {
  text-align: right;
}
table.blueTable tfoot .links a{
  display: inline-block;
  background: #1C6EA4;
  color: #FFFFFF;
  padding: 2px 8px;
  border-radius: 5px;
}
</style>

    <?php
    $query1=mysqli_query($connection, "Select * from users");//SELECT * FROM `questions` WHERE level=9
    $query2=mysqli_query($connection, "Select * from questions");
      echo "<br> <br> <br>";
        echo "<table class='blueTable'>";
          echo "<tr>";
            echo "<th>";
              echo 'id';
            echo "</th>";
            echo "<th>";
              echo 'email';
            echo "</th>";
            echo "<th>";
              echo 'username';
            echo "</th>";
            echo "<th>";
              echo 'max_point';
            echo "</th>";
            echo "<th>";
              echo 'daily_questions';
            echo "</th>";
            echo "<th>";
              echo 'year9';
            echo "</th>";
            echo "<th>";
              echo 'year10';
            echo "</th>";
            echo "<th>";
              echo 'year11';
            echo "</th>";
            echo "<th>";
              echo 'year12';
            echo "</th>";
          echo "</tr>";
        while($row = mysqli_fetch_array($query1)){
          echo "<tr>";
            echo "<th>";
              echo $row['id'];
            echo "</th>";
            echo "<th>";
              echo $row['email'];
            echo "</th>";
            echo "<th>";
              echo $row['username'];
            echo "</th>";
            echo "<th>";
              echo $row['max_point'];
            echo "</th>";
            echo "<th>";
              echo $row['daily_questions'];
            echo "</th>";
            echo "<th>";
              echo $row['year9'];
            echo "</th>";
            echo "<th>";
              echo $row['year10'];
            echo "</th>";
            echo "<th>";
              echo $row['year11'];
            echo "</th>";
            echo "<th>";
              echo $row['year12'];
            echo "</th>";
          echo "</tr>";
        }
        echo "</table>";

        echo "<br> <br> <br>";

        echo "<table class='blueTable'>";
          echo "<tr>";
            echo "<th>";
              echo 'id';
            echo "</th>";
            echo "<th>";
              echo 'question';
            echo "</th>";
            echo "<th>";
              echo 'answer';
            echo "</th>";
            echo "<th>";
              echo 'level';
            echo "</th>";
            echo "<th>";
              echo 'success';
            echo "</th>";
            echo "<th>";
              echo 'fail';
            echo "</th>";
        while($row = mysqli_fetch_array($query2)){
          echo "<tr>";
            echo "<th>";
              echo $row['id'];
            echo "</th>";
            echo "<th>";
              echo $row['question'];
            echo "</th>";
            echo "<th>";
              echo $row['answer'];
            echo "</th>";
            echo "<th>";
              echo $row['level'];
            echo "</th>";
            echo "<th>";
              echo $row['success'];
            echo "</th>";
            echo "<th>";
              echo $row['fail'];
            echo "</th>";
          echo "</tr>";
        }
        echo "</table>";

    ?>




    <script type="text/javascript">
      function request(selectBar){
        var tableName = selectBar.value;
        var k = 0;
        $.ajax({
           type        : "POST", //GET or POST or PUT or DELETE verb
           url         : "admin.php", // Location of the service
           data        : {"tableName":tableName}, //Data sent to server
           success: function(data){
             data = $.trim(data);
             //data = data.split("#");
             alert(data);
           },
        //for multiple data data: { code: code, userid: userid }
        });
      }

    </script>

    <table id="users_table"></table>
    <table id="questions_table"></table>
    <!-- style="visibility:hidden;" -->

  </body>
</html>
