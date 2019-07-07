<?php
  session_start();
  include_once("includes/db_handler-inc.php");
  if(isset($_GET["level"]) && isset($_GET["difficulty"])){

    $difficulty = $_GET["difficulty"];
    $level = $_GET["level"];
    $query1 = mysqli_query($connection, "Select * from questions where level=$level order by rand() limit 1");//SELECT * FROM `questions` WHERE level=9

    $control = true;
    while($control){
      while($row=mysqli_fetch_array($query1)){
        $question=$row["question"];
        $answer=$row["answer"];
        $success=$row["success"];
        $fail=$row["fail"];
        $id=$row["id"];

        $totalplayed = $success + $fail;
        if($totalplayed > 10){
          //in order to start taking difficulty, the question need to be solved at least 10 times
          $total=$success+$fail;
          $successRate=($success*100)/$toplam; // success rate of the question
          if ($difficulty == 1) {
            $range1 = 0;
            $range2 = 33;
          }
          else if($difficulty == 2){
            $range1 = 34;
            $range2 = 66;
          }
          else{
            $range1 = 67;
            $range2 = 100;
          }

          if($successRate <= $range2 && $successRate >= $range1){
            $control = false;
          }
        }
        else {
          $control = false;
        }
      }
    }
    echo "$question#$answer#$id";
  }
?>
