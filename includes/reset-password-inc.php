<?php  
include_once("db_handler-inc.php");

if (isset($_POST["reset-password-submit"])) {
		
	$selector = $_POST["selector"];
	$validator = $_POST["validator"];
	$password = $_POST["password"];
	$passwordRepeat = $_POST["password-repeat"];

	 if (empty($password) || empty($passwordRepeat)) {
	 	//validation
        header("Location: ../Login_register/create-new-password.php??selector=". $_GET["selector"] . "&validator=" . $_GET["validator"]. "&newpassword=empty");
        exit();
      }else if($password != $passwordRepeat){
      	//validation
		header("Location: ../Login_register/create-new-password.php?selector=". $_GET["selector"] . "&validator=" . $_GET["validator"]. "&newpassword=notsame");
        exit();
      }

      $currentDate = date("U");

      $sql = "SELECT * FROM password_reset WHERE password_reset_Selector=? AND password_reset_Expires >= ?";

      $statement = mysqli_stmt_init($connection);
	  if(!mysqli_stmt_prepare($statement, $sql)){
	  	echo "There was an error!";
		exit();
	  } else {
		mysqli_stmt_bind_param($statement, "ss", $selector, $currentDate);//using this gives extra security because if checks before executing the query.
		mysqli_stmt_execute($statement);

		$result = mysqli_stmt_get_result($statement);
		if(!$row = mysqli_fetch_assoc($result)){
			header("Location: ../Login_register/create-new-password.php?selector=". $_GET["selector"] . "&validator=" . $_GET["validator"]. "&newpassword=resubmit");
        exit();
		} else{

			$tokenBin = hex2bin($validator);
			$tokenCheck = password_verify($tokenBin, $row["password_reset_Token"]);
			if($tokenCheck === false){//if validation is not true
				echo "You need to re-submit your reset request.";
				exit();
			} else if($tokenCheck === true) {

				$tokenEmail = $row['password_reset_Email'];
				$sql = "SELECT * FROM users WHERE email=?";

				$statement = mysqli_stmt_init($connection);
				  if(!mysqli_stmt_prepare($statement, $sql)){
				  	echo "There was an error!";
					exit();
				  } else {

				  	mysqli_stmt_bind_param($statement, "s", $tokenEmail);
				  	mysqli_stmt_execute($statement);

				  	$result = mysqli_stmt_get_result($statement);
					if(!$row = mysqli_fetch_assoc($result)){
						echo "There was an error";
						exit();
					} else{
						//update password in database
						$sql = "UPDATE users SET password=? WHERE email=?;";
						$statement = mysqli_stmt_init($connection);
					    if(!mysqli_stmt_prepare($statement, $sql)){
					      echo "There was an error!";
						  exit();
					    } else {
					      $passwordHased = md5($password); //hashing entered password
						  mysqli_stmt_bind_param($statement, "ss", $passwordHased, $tokenEmail);
						  mysqli_stmt_execute($statement);
						  
						  $sql = "DELETE FROM password_reset WHERE password_reset_Email=?";
						  $statement = mysqli_stmt_init($connection);
						  if(!mysqli_stmt_prepare($statement, $sql)){
							echo "There was an error!";
							exit();
						  }else {
						  	mysqli_stmt_bind_param($statement, "s", $tokenEmail);
						  	mysqli_stmt_execute($statement);
							header("Location: ../Login_register/login.php?newpassword=updated");
						  }

						}
					}
				  }
			}
		}

	  }

} else {
	header('location: ../Login_register/login.php');
}

?>