<?php
//ALTER TABLE table_name AUTO_INCREMENT = 1;  --> RESETTING AUTO_INCREMENT
include_once("..\includes\db_handler-inc.php");

session_start();

//  data        : {"question":arr[0],"answer":arr[1],"level":level}, //Data sent to server
// initializing variables
$question = "";
$ans = "";
$level = 0;


if (isset($_POST['question']) && isset($_POST['answer']) && isset($_POST['level'])){
  // receive all input values from the form

  $question = $_POST['question'];
	$ans = $_POST['answer'];
  $level = $_POST['level'];

	$query = "INSERT INTO questions (question,answer,level,success,fail) VALUES ('$question','$ans','$level',0,0)";
	$querywork=mysqli_query($connection, $query);
}

//$data = "data ";
//$data2 = " is this";
//echo $data, $data2;
//echo $data; you can reach $data var if ajax is success in javascript and can use within php

?>
