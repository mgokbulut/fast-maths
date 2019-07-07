S<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../libraries/PHPMailer/src/Exception.php';
require '../libraries/PHPMailer/src/PHPMailer.php';
require '../libraries/PHPMailer/src/SMTP.php';
session_start();
	
if(isset($_POST["subject"])){
	header("Location: ../home.php?mail=success");
	
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
	$mail->addAddress("fastMaths.mail@gmail.com");
	$mail->isHTML(true);
	$mail->Subject = "Suggestion & Problem";
	$mail->Body = 'User name: ' . $_SESSION['username'] .'<br>Message : ' . $_POST["subject"];

	if ($mail->send())
	    header("Location: ../home.php?mail=success");
	else
	    header("Location: ../home?mail=fail");
}else{
	header("Location: ../home.php?mail=fail");
}

 ?>