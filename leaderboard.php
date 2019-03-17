<!--Leaderboard-->
<div class="leaderboard">

  <div style="display: inline-block;">
    <img src="includes/images/trophy.png">
    <p style="font-family:Brush Script MT, Brush Script Std, cursive; font-size:32px;">Leaderboard</p>
  </div>

  <?php
  include_once("includes\db_handler-inc.php");

  echo "<a href='#$_SESSION[username]'>See Your Rank</a>";
  echo "<ol>";
  $i=0;
  $query2=mysqli_query($connection,"Select * from users order by max_point DESC");
  while($row=mysqli_fetch_array($query2))
  {
    $userName = $row["username"];
    $puan = $row["max_point"];

    if($i<3 && $userName==$_SESSION['username']){
    echo "<li style='color:red;' id='$_SESSION[username]'><strong>";
    echo $userName;
    echo "  |  ";
    echo $puan;
    echo " (YOUR RANK)</strong></li>";
    }
    else if($i<3){

    echo "<li><strong>";
    echo $userName;
    echo "  |  ";
    echo $puan;
    echo "</strong></li>";
    }
    else if($userName==$_SESSION['username'] && $i<10){
    echo "<li style='color:red;' id='a$_SESSION[username]'>";
    echo $userName;
    echo "  |  ";
    echo $puan;
    echo " (YOUR RANK)</li>";
    }
    else if($i<10){
    echo "<li>";
    echo $userName;
    echo "  |  ";
    echo $puan;
    echo "</li>";
    }
    else if ($userName==$_SESSION['username']) {
      $i = $i + 1;
      echo "<li value='$i' style='color:red;' id='a$_SESSION[username]'>";
      echo $userName;
      echo "  |  ";
      echo $puan;
      echo " (YOUR RANK)</li>";
      $i = $i - 1;
    }
    $i=$i+1;
  }
  echo "</ol>";
?>



</div>
