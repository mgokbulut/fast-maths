<?php include('server.php') ?>
<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
  <link rel="stylesheet" type="text/css" href="../includes/mainstyle.css">
</head>
<body>
  <div class="header">
    <h2>Reset your password</h2>
  </div>

  <form method="post" action="../includes/reset_request-inc.php">
    <?php 

      if(isset($_GET["reset"])) {
        if($_GET["reset"] == "success"){
          echo '<p style="color:green;"> Success! Check your e-mail account</p>';
        } else if($_GET["reset"] == "fail"){
          echo '<p style="color:red;"> An error is occured </p>';
        } else if($_GET["reset"] == "emailError"){
          echo '<p style="color:red;"> The email entered does not exists in our records. </p>';
        }
      }

    ?>

    <div class="input-group">
      <p>An e-mail will be send to you with instructions on how to reset your password.</p>
    </div>

    <div class="input-group">
      <label>Your Email address</label>
      <input type="email" name="email">
    </div>
    <div class="input-group">
      <button type="submit" class="btn" name="reset_request_submit">Receive new password by e-mail</button>
    </div>
    </form>
      
</body>
</html>
