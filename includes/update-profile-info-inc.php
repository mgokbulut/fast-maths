<?php
  session_start();
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
