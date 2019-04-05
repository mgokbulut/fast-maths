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


  <?php 

       if(isset($_GET["newpassword"])) {
        if ($_GET["newpassword"] == "empty") {
          echo '<h3 style="color:red;text-align:center;">please fill in the form</h3>';
        }else if($_GET["newpassword"] == "notsame"){
          echo '<h3 style="color:red;text-align:center;">the passwords does not match</h3>';
        }
        else if($_GET["newpassword"] == "resubmit"){
          echo '<h3 style="color:red;text-align:center;">You need to re-submit your reset request.</h3>';
        }
       }

      if (empty($_GET["selector"]) || empty($_GET["validator"])) {
        echo "<h3 style='color:red;text-align:center;'>couldn't validate your request!</h3>";
      }else{

        $selector = $_GET["selector"];
        $validator = $_GET["validator"];
        
        if (ctype_xdigit($selector) !== false && ctype_xdigit($validator) !== false) {

          ?>
  <form action="../includes/reset-password-inc.php" method="post">

    <input type="hidden" name="selector" value="<?php echo $selector; ?>">
    <input type="hidden" name="validator" value="<?php echo $validator; ?>">

    <div class="input-group">
      <label>Enter a new password</label>
      <input type="password" name="password">
    </div>
    <div class="input-group">
      <label>Enter your new password again</label>
      <input type="password" name="password-repeat">
    </div>
    
    <div class="input-group">
      <button type="submit" class="btn" name="reset-password-submit">change password</button>
    </div>
    </form>
        <?php
        }
      }
      ?>


</body>
</html>



