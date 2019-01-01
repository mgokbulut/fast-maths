<?php
session_start();
include_once("includes\db_handler-inc.php");

if(isset($_GET["point"])){

$finalpoint=$_GET["point"];
$id = $_SESSION['user_id'];
$data = "success";
$query = mysqli_query($connection,"Select * from users where id='$id'");
if(mysqli_num_rows($query)!=0){
  $query1 = mysqli_query($connection,"Select * from users where id='$id' and max_point < '$finalpoint'");
  //if the final point exceeds the current high score;
  if(mysqli_num_rows($query1)==1){
  	$query2 = mysqli_query($connection,"Update users set max_point='$finalpoint' where id='$id'");
  	if(!$query2){
  		$data="error";
  	}
  }
  else{
  	$data="fail";
  }
}
else{
	$data="error";
}
echo $data;
}
?>
