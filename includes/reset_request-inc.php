<?php 
//composer require phpmailer/phpmailer
//fastmaths.mail@gmail.com
//@fast-maths@
include_once("db_handler-inc.php");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../libraries/PHPMailer/src/Exception.php';
require '../libraries/PHPMailer/src/PHPMailer.php';
require '../libraries/PHPMailer/src/SMTP.php';

if(isset($_POST["reset_request_submit"])){

	$userEmail = mysqli_real_escape_string($connection, $_POST["email"]); // this is used to detect sql insertion attacks
	//first check if the e=mail entered exists in the users table:

	$query = mysqli_query($connection, "SELECT username FROM users WHERE email='$userEmail';");
	if(mysqli_num_rows($query) == 0){
		header("Location: ../Login_register/reset-password.php?reset=emailError");
		exit();
	}
	
	//-------------------------------------
	$selector = bin2hex(random_bytes(8));
	$token = random_bytes(32);// 32 bytes generated

	$url = "fast-maths.herokuapp.com/Login_register/create-new-password.php?selector=". $selector . "&validator=" . bin2hex($token);
	//echo $url;
	$expires = date("U") + 1800;//setting the limit - 1 hour later
	

	//First we are going to check the database and see if there is an existing token created for the same user, if it does, we are going to delete that row and create a new one. In this way we make sure that the user only gets one token which prevent multiple token generation therefore more secure website.

	$sql = "DELETE FROM password_reset WHERE password_reset_Email=?";
	$statement = mysqli_stmt_init($connection);
	if(!mysqli_stmt_prepare($statement, $sql)){
		echo "There was an error!";
		exit();
	}else {
		mysqli_stmt_bind_param($statement, "s", $userEmail);
		mysqli_stmt_execute($statement);
	}

	$sql = "INSERT INTO password_reset (password_reset_Email, password_reset_Selector, password_reset_Token, password_reset_Expires) VALUES (?,?,?,?);";

	if(!mysqli_stmt_prepare($statement, $sql)){
		echo "There was an error!";
		exit();
	}else {
		$hashedToken = password_hash($token, PASSWORD_DEFAULT);
		mysqli_stmt_bind_param($statement, "ssss", $userEmail, $selector, $hashedToken, $expires);
		mysqli_stmt_execute($statement);
	}

	mysqli_stmt_close($statement);
	mysqli_close($connection);

	//------
	
	$mail = new PHPMailer();
	$mail->isSMTP();
	$mail->SMTPKeepAlive = true;
	$mail->SMTPAuth = true;
	$mail->SMTPSecure = 'tls'; //ssl
	$mail->Port = 587; //25 , 465 , 587
	$mail->Host = "smtp.gmail.com";
	$mail->Username = "fastMaths.mail@gmail.com";
	$mail->Password = "@fast-maths@";
	$mail->setFrom("fastMaths.mail@gmail.com");
	$mail->addAddress($userEmail);
	$mail->isHTML(true);
	$mail->Subject = "Reset your password for fast-maths";
	$mail->Body = '<h3>Reset yout password</h3>
	<p>We recieved a password reset request. The link to reset your password is below. If you did not make this request, you can ignore this email</p><br>
	<p>Here is your password reset link: </br><a href="' . $url . '">' . $url . '</a></p>';
	//$mail->addAttachment("dosya.txt");
	if ($mail->send())
	    header("Location: ../Login_register/reset-password.php?reset=success");
	else
	    header("Location: ../Login_register/reset-password.php?reset=fail");


	//------  
/*
	$to = $userEmail;
	$subject = 'Reset your password for fast-maths';
	$message = '<p>We recieved a password reset request. The link to reset your password is below. If you did not make this request, you can ignore this email</p>';
	$message .= '<p>Here is your password reset link: </br>';
	$message .= '<a href="' . $url . '">' . $url . '</a></p>';

	$headers = "From: who I am <email address gmail.com>\r\n";
	$headers = "Reply-To: replyemail@gmail.com\r\n";
	$headers = "Content-type: text/html\r\n";

	mail($to, $subject, $message, $headers);
*/
	//header("Location: ../Login_register/reset-password.php?reset=success");
} else {
	header('Location: ../Login_register/login.php');
}


?>