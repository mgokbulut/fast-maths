<?php

$db_Servername = "localhost";
$db_Username = "root";
$db_Password = "";
$db_Name = "fast_maths";

$connection = mysqli_connect($db_Servername, $db_Username, $db_Password, $db_Name);
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
?>
