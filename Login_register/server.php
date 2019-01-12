<?php
session_start();
date_default_timezone_set('Asia/Tokyo');
$date   = new DateTime(); //this returns the current date time
$dateInformation = $date->format('F j, Y H:i:s');

// initializing variables
$username = "";
$email    = "";
$errors = array();

include_once("..\includes\db_handler-inc.php");
// REGISTER USER
if (isset($_POST['reg_user'])) {
  // receive all input values from the form
  $username = $_POST['username'];
  $email = $_POST['email'];
  $password_1 = $_POST['password_1'];
  $password_2 = $_POST['password_2'];

  // form validation: ensure that the form is correctly filled ...
  // by adding (array_push()) corresponding error unto $errors array
  if (empty($username)) { array_push($errors, "Username is required"); }
  if (empty($email)) { array_push($errors, "Email is required"); }
  if (empty($password_1)) { array_push($errors, "Password is required"); }
  if ($password_1 != $password_2) {
  array_push($errors, "The two passwords do not match");
  }

  // first check the database to make sure
  // a user does not already exist with the same username and/or email
  $user_check_query = "SELECT * FROM users WHERE username='$username' OR email='$email' LIMIT 1";
  $result = mysqli_query($connection, $user_check_query);
  $user = mysqli_fetch_assoc($result);

  if ($user) { // if user exists
    if ($user['username'] === $username) {
      array_push($errors, "Username already exists");
    }

    if ($user['email'] === $email) {
      array_push($errors, "email already exists");
    }
  }

  // Finally, register user if there are no errors in the form
  if (count($errors) == 0) {
    $password = md5($password_1);//encrypt the password before saving in the database
    $startRate = '0,0';
    $query = "INSERT INTO users (email,password,username,max_point,daily_questions,year9,year10,year11,year12) VALUES('$email','$password','$username',0,'$dateInformation','$startRate','$startRate','$startRate','$startRate')";
    $querywrk=mysqli_query($connection, $query);
    if($querywrk)
    {
		$id = mysqli_insert_id($connection);
	  $_SESSION['user_id'] = $id;
    $_SESSION['username'] = $username;
    $_SESSION['max_point'] = 0;
    $_SESSION['daily_questions'] = $dateInformation;
    $_SESSION['year9'] = '0,0';
    $_SESSION['year10'] = '0,0';
    $_SESSION['year11'] = '0,0';
    $_SESSION['year12'] = '0,0';
    $_SESSION['success'] = "You are now logged in";
    header('location: ../home.php');
    }
    else
    {
      array_push($errors, $cleardb_username);
      array_push($errors, $dateInformation);
    }
  }
}

// ...
// ...

// LOGIN USER
if (isset($_POST['login_user'])) {
  $username = $_POST['username'];
  $password = $_POST['password'];

  if (empty($username)) {
    array_push($errors, "Username is required");
  }
  if (empty($password)) {
    array_push($errors, "Password is required");
  }

  if (count($errors) == 0) {
    $password = md5($password);
    $query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $results = mysqli_query($connection, $query);
    if (mysqli_num_rows($results) == 1) {
      while($row=mysqli_fetch_array($results))
  		{
        $max_point=$row["max_point"];
		    $id=$row["id"];
        $lastDate = $row["daily_questions"];
        $year9Info = $row["year9"];
        $year10Info = $row["year10"];
        $year11Info = $row["year11"];
        $year12Info = $row["year12"];
  		}
      $_SESSION['user_id'] = $id;
      $_SESSION['username'] = $username;
      $_SESSION['max_point'] = $max_point;
      $_SESSION['daily_questions'] = $lastDate;
      $_SESSION['year9'] = $year9Info;
      $_SESSION['year10'] = $year10Info;
      $_SESSION['year11'] = $year11Info;
      $_SESSION['year12'] = $year12Info;
      $_SESSION['success'] = "You are now logged in";
      if($username == 'admin'){
        header('location: ../admin.php');
      }
      else{
        header('location: ../home.php');
      }
    }else {
      array_push($errors, "Wrong username/password combination");
    }
  }
}

?>
