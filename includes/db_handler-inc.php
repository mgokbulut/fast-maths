<?php

$cleardb_url = parse_url(getenv("CLEARDB_DATABASE_URL"));
$cleardb_server = $cleardb_url["host"];
$cleardb_username = $cleardb_url["user"];
$cleardb_password = $cleardb_url["pass"];
$cleardb_db = substr($cleardb_url["path"],1);

// $db_Servername = "localhost";
// $db_Username = "root";
// $db_Password = "";
// $db_Name = "fast_maths";
// $connection = mysqli_connect($db_Servername, $db_Username, $db_Password, $db_Name);
$connection = mysqli_connect($cleardb_server, $cleardb_username, $cleardb_password, $cleardb_db);

if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
?>
