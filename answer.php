<?php
  include_once("includes/db_handler-inc.php");
  session_start();
  if(isset($_GET["isCorrect"]) && isset($_GET["id"])){
    //isCorrect == 0 means it is wrong
    //isCorrect == 1 means it is correct
    $id = $_GET["id"];
    $isCorrect = $_GET["isCorrect"];
    if($isCorrect == "0"){//means Wrong
      //Update simultaneous_questions set fail='$fail' , success='$success' where id='$id'
      $query = "SELECT * FROM `questions` WHERE id='$id'";
      $results = mysqli_query($connection, $query);

      while($row=mysqli_fetch_array($results))
  		{
        $fail=$row["fail"];
        $level = $row["level"];
  		}
      $fail = $fail + 1;
      $query2 = mysqli_query($connection,"Update questions set fail='$fail' where id='$id' ");

      //---------------------------------------------------------------------------------------

      $level = 'year'.$level;
      $user_id=$_SESSION['user_id'];

      $query3 = "SELECT $level FROM `users` WHERE id='$user_id'";
      $results2 = mysqli_query($connection, $query3);

      while($row=mysqli_fetch_array($results2))
      {
        $successRate=$row["$level"];
      }

      $successRate = explode(",",$successRate);
      $successRate[1] = intval($successRate[1]);
      $successRate[1] = $successRate[1] + 1;
      $successRate[1] = (string) $successRate[1];
      $successRate =  $successRate[0].",".$successRate[1];
      $query4 = mysqli_query($connection,"Update users set $level='$successRate' where id='$user_id'");

    }
    else if($isCorrect == "1"){//means Wrong
      //Update simultaneous_questions set fail='$fail' , success='$success' where id='$id'
      $query = "SELECT * FROM `questions` WHERE id='$id'";
      $results = mysqli_query($connection, $query);

      while($row=mysqli_fetch_array($results))
      {
        $success=$row["success"];
        $level = $row["level"];
      }
      $success = $success + 1;
      $query2 = mysqli_query($connection,"Update questions set success='$success' where id='$id'");

      //---------------------------------------------------------------------------------------

      $level = 'year'.$level;
      $user_id=$_SESSION['user_id'];

      $query3 = "SELECT $level FROM `users` WHERE id='$user_id'";
      $results2 = mysqli_query($connection, $query3);

      while($row=mysqli_fetch_array($results2))
      {
        $successRate=$row["$level"];
      }

      $successRate = explode(",",$successRate);
      $successRate[0] = intval($successRate[0]);
      $successRate[0] = $successRate[0] + 1;
      $successRate[0] = (string) $successRate[0];
      $successRate =  $successRate[0].",".$successRate[1];
      $query4 = mysqli_query($connection,"Update users set $level='$successRate' where id='$user_id'");

    }
  }
?>
