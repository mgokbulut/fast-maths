<?php include('server.php') ?>
<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
  <link rel="stylesheet" type="text/css" href="../includes/mainstyle.css">
</head>
<body>
  <div class="header">
    <h2>Login</h2>
  </div>

  <form method="post" action="login.php">
    <?php include('errors.php'); ?>
     <?php 

      $username = ($conn,$_POST['username']);
		  $passwordB4H = ($conn,$_POST['password']); //password before hash
		  $gosted = hash('gost',$passwordB4H);
	  	$password = hash('whirlpool',$gosted);

        }
      }
      ?>
    <div class="input-group">
      <label>Username</label>
      <input type="text" name="username" >
    </div>
    <div class="input-group">
      <label>Password</label>
      <input type="password" name="password">
    </div>
    <div class="input-group">
      <button type="submit" class="btn" name="login_user">Login</button>
    </div>
    <p>
      Not yet a member? <a href="register.php">Sign up</a>
    </p>
    <p>
      <a href="reset-password.php">Forgot your password? </a>
    </p>
  </form>
</body>
</html>
