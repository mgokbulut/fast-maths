<?php
  require "includes/header.php";
?>
<?php
  if(isset($_POST["submit"]))
  {
   if(!empty($_POST["questionLevel"]))
   {
    $_SESSION['levels'] = $_POST["questionLevel"];
    $_SESSION['current_difficulty'] = 1;
    header('location: game.php');
   }
  }
?>

<form method="post" class="startform">
  <div style="display:inline-block;">
  <div class="checkbox"><input type="checkbox"  name="questionLevel[]" value="9"> 9th Grade</div><br>
  <div class="checkbox"><input type="checkbox"  name="questionLevel[]" value="10"> 10th Grade</div><br>
  <div class="checkbox"><input type="checkbox"  name="questionLevel[]" value="11"> 11th Grade</div><br>
  <div class="checkbox"><input type="checkbox"  name="questionLevel[]" value="12"> 12th Grade</div><br><br>
  </div>
  <input type="submit" class="formbutton" onclick="activate()" name="submit" value="Start" />
</form>

<div class="message" id="message">
  <label class='text-danger'>* Please Select at least one Level</label>
</div>



<?php
  require "includes/footer.php";
?>
