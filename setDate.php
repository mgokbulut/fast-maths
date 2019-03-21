<?php
session_start();
include_once("includes/db_handler-inc.php");

if(isset($_GET["time"])){
  if ($_GET["time"] == 1) {

    date_default_timezone_set('Asia/Tokyo');
    $date   = new DateTime(); //this returns the current date time
    $dateInformation = $date->format('F j, Y H:i:s');

    $query = mysqli_query($connection,"Select * from users where id='$_SESSION['user_id']'");
    if(mysqli_num_rows($query)!=0){

      	$query2 = mysqli_query($connection,"Update users set daily_questions='$dateInformation' where id='$_SESSION['user_id']'");
      	if(!$query2){
      		$data="error";
      	}
      }
      else{
      	$data="fail";
      }
    }
    else{
    	$data="error1";
    }
    echo $data;
  }
}
?>
