<?php
  require "includes/header.php";
?>

<?php
  if(isset($_SESSION['daily_questions'])){
    date_default_timezone_set('Asia/Tokyo');
    $date = new DateTime(); //this returns the current date time
    $Current = $date->format('F j, Y H:i:s');
    $Past = $_SESSION['daily_questions'];
  }
?>
<script type="text/javascript" src="slideshow.js"></script>
<script type="text/javascript">
  function diff_hours(dt2, dt1){
    dt1 = $.trim(dt1);
    dt1 = new Date(dt1);
    dt2 = $.trim(dt2);
    dt2 = new Date(dt2);

    var diff =(dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    diff = (Math.floor(diff));
    diff = Math.abs(diff);
    return diff;
  }

  function checkDaily(){
    var past = '<?php echo $Past; ?>';
    var current = '<?php echo $Current; ?>';
    var difference = diff_hours(current, past);
    var bool = true;
    dailyQuestions = new dailyQuestions_class();

    if(difference < 24){
      bool = false;
      try{
        localStorage.getItem("dailyQuestions");
        dailyQuestions.printDailyQuestions();
        currentSlide(1);
        document.getElementById("dailyQuestion_message").innerHTML = "Click on the buttons with question labels below or the buttons on the right and left to see the questions";
      }catch(e){
        currentSlide(1);
        var remaining = 24-difference;
        document.getElementById("dailyQuestion_message").innerHTML = "you will get your daily questions " + remaining + " hours later";
        $("div#dots").hide();
        $("a#prev").hide();
        $("a#nexts").hide();
      }
    }
    if (bool == true) {
      document.getElementById("dailyQuestion_message").innerHTML = "Click on the buttons with question labels below or the buttons on the right and left to see the questions";
      dailyQuestions.dailyQuestions('<?php echo  $_SESSION['year9']?>', '<?php echo  $_SESSION['year10']?>', '<?php echo  $_SESSION['year11']?>', '<?php echo  $_SESSION['year12']?>');
      currentSlide(1);
      $.ajax({
         type        : "GET", //GET or POST or PUT or DELETE verb
         url         : "Daily-Questions.php", // Location of the service
         data        : {"setDate":1}, //Data sent to server
         success: function(){

         },
      //for multiple data data: { code: code, userid: userid }
      });
    }
  }
</script>
<?php
  if(isset($_GET['setDate'])){
      $date = new DateTime(); //this returns the current date time
      $Current = $date->format('F j, Y H:i:s');
      $id = $_SESSION['user_id'];
      $query = mysqli_query($connection,"Update users set daily_questions='$Current' where id='$id' ");
  }
?>
<div class="slideshow-container">

  <!-- Full-width images with number and caption text -->
    <div class="mySlides fade">
      <div id="warning" align="center" style="margin: 10px auto 10px auto">
        <p style="text-align:center;">
          <br>
          <strong style="font-size:60px;">Daily Questions !</strong>
          <br><br><br>
          <span id="dailyQuestion_message" style="font-size: 20px; bottom:0;"></span>
        </p>
        <div class="" style="border:5px solid black; border-radius:10px; width:820px;height:100px;margin-bottom:10px; text-align: center;background-color: rgb(230, 230, 230);">
          <div class="" style="border: 5px solid black; border-radius:10px;float:left; width:230px; height:70px;margin: 10px 0px 10px 20px; color:green;background-color:white;font-size:16px;">Correct: <h3 id="dailyQuestion_correct"></h3></div>
          <div class="" style="border: 5px solid black; border-radius:10px;float:left; width:230px; height:70px;margin: 10px 0px 10px 20px;color:gray;background-color:white;font-size:16px;">Unsolved: <h3 id="dailyQuestion_unsolved"></h3></div>
          <div class="" style="border: 5px solid black; border-radius:10px;float:right; width:230px; height:70px;margin: 10px 30px 10px 0px;color:red;background-color:white;font-size:16px;">Wrong: <h3 id="dailyQuestion_wrong"></h3></div>
        </div>
        <div class="buttons">
          <a href="home.php"><p style="float:left; margin-left:85px;">Go Back Home</p></a>
          <a href="#" onclick="currentSlide(2)"><p style="float:right; margin-right:85px;">Start solving</p></a>
        </div>
      </div>
    </div>

    <!-- ______________________________________________________________________________________________________ -->
    <div class="mySlides fade">
      <div id="dailyQuestion0" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math>
        <div style="width:80px; height:50px; float:right; border: 2px solid black; border-radius: 10px; margin-right: 10px; text-align:center;"><p id="QuestionStatus_0">unsolved</p></div>
      </div>
      <div id="dailyQuestion00" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math></div>
      <form name="form_0" id="form_0" class="dailyQuestions_form" action="#" style="" method="post">

      </form>
      <div class="answerSteps">
        <table id="answerTable0"></table>
      </div>
    </div>
    <!-- ______________________________________________________________________________________________________ -->

    <div class="mySlides fade">
      <div id="dailyQuestion1" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math>
        <div style="width:80px; height:50px; float:right; border: 2px solid black; border-radius: 10px; margin-right: 10px; text-align:center;"><p id="QuestionStatus_1">unsolved</p></div>
      </div>
      <div id="dailyQuestion10" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math></div>
      <form name="form_1" id="form_1" class="dailyQuestions_form" action="#" style="" method="post">

      </form>
      <div class="answerSteps">
        <table id="answerTable1"></table>
      </div>
    </div>
    <!-- ______________________________________________________________________________________________________ -->

    <div class="mySlides fade">
      <div id="dailyQuestion2" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math>
        <div style="width:80px; height:50px; float:right; border: 2px solid black; border-radius: 10px; margin-right: 10px; text-align:center;"><p id="QuestionStatus_2">unsolved</p></div>
      </div>
      <div id="dailyQuestion20" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math></div>

      <form name="form_2" id="form_2" class="dailyQuestions_form" action="#" style="" method="post">

      </form>
      <div class="answerSteps">
        <table id="answerTable2"></table>
      </div>
    </div>
    <!-- ______________________________________________________________________________________________________ -->

    <div class="mySlides fade">
      <div id="dailyQuestion3" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math>
        <div style="width:80px; height:50px; float:right; border: 2px solid black; border-radius: 10px; margin-right: 10px; text-align:center;"><p id="QuestionStatus_3">unsolved</p></div>
      </div>
      <div id="dailyQuestion30" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math></div>

      <form name="form_3" id="form_3" class="dailyQuestions_form" action="#" style="" method="post">

      </form>
      <div class="answerSteps">
        <table id="answerTable3"></table>
      </div>
    </div>
    <!-- ______________________________________________________________________________________________________ -->

    <div class="mySlides fade">
      <div id="dailyQuestion4" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math>
        <div style="width:80px; height:50px; float:right; border: 2px solid black; border-radius: 10px; margin-right: 10px; text-align:center;"><p id="QuestionStatus_4">unsolved</p></div>
      </div>
      <div id="dailyQuestion40" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math></div>

      <form name="form_4" id="form_4" class="dailyQuestions_form" action="#" style="" method="post">

      </form>
      <div class="answerSteps">
        <table id="answerTable4"></table>
      </div>
    </div>
    <!-- ______________________________________________________________________________________________________ -->

    <div class="mySlides fade">
      <div id="dailyQuestion5" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math>
        <div style="width:80px; height:50px; float:right; border: 2px solid black; border-radius: 10px; margin-right: 10px; text-align:center;"><p id="QuestionStatus_5">unsolved</p></div>
      </div>
      <div id="dailyQuestion50" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math></div>

      <form name="form_5" id="form_5" class="dailyQuestions_form" action="#" style="" method="post">

      </form>
      <div class="answerSteps">
        <table id="answerTable5"></table>
      </div>
    </div>
    <!-- ______________________________________________________________________________________________________ -->

    <div class="mySlides fade">
      <div id="dailyQuestion6" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math>
        <div style="width:80px; height:50px; float:right; border: 2px solid black; border-radius: 10px; margin-right: 10px; text-align:center;"><p id="QuestionStatus_6">unsolved</p></div>
      </div>
      <div id="dailyQuestion60" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math></div>

      <form name="form_6" id="form_6" class="dailyQuestions_form" action="#" style="" method="post">

      </form>
      <div class="answerSteps">
        <table id="answerTable6"></table>
      </div>
    </div>
    <!-- ______________________________________________________________________________________________________ -->

    <div class="mySlides fade">
      <div id="dailyQuestion7" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math>
        <div style="width:80px; height:50px; float:right; border: 2px solid black; border-radius: 10px; margin-right: 10px; text-align:center;"><p id="QuestionStatus_7">unsolved</p></div>
      </div>
      <div id="dailyQuestion70" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math></div>

      <form name="form_7" id="form_7" class="dailyQuestions_form" action="#" style="" method="post">

      </form>
      <div class="answerSteps">
        <table id="answerTable7"></table>
      </div>
    </div>
    <!-- ______________________________________________________________________________________________________ -->

    <div class="mySlides fade">
      <div id="dailyQuestion8" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math>
        <div style="width:80px; height:50px; float:right; border: 2px solid black; border-radius: 10px; margin-right: 10px; text-align:center;"><p id="QuestionStatus_8">unsolved</p></div>
      </div>
      <div id="dailyQuestion80" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math></div>

      <form name="form_8" id="form_8" class="dailyQuestions_form" action="#" style="" method="post">

      </form>
      <div class="answerSteps">
        <table id="answerTable8"></table>
      </div>
    </div>
    <!-- ______________________________________________________________________________________________________ -->

    <div class="mySlides fade">
      <div id="dailyQuestion9" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math>
        <div style="width:80px; height:50px; float:right; border: 2px solid black; border-radius: 10px; margin-right: 10px; text-align:center;"><p id="QuestionStatus_9">unsolved</p></div>
      </div>
      <div id="dailyQuestion90" style="margin-left:10px; margin-top: 10px;"><math display="block"><mrow class="beginning"></mrow></math></div>

      <form name="form_9" id="form_9" class="dailyQuestions_form" action="#" style="" method="post">

      </form>
      <div class="answerSteps">
        <table id="answerTable9"></table>
      </div>
    </div>
    <!-- ______________________________________________________________________________________________________ -->

    <style>
    table {
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        font-family: "Courier New", Courier, monospace;
        border: 1px solid #dddddd;
        border-bottom: 3px solid rgb(204, 245, 255);;
        border-right: solid 1px solid red;
        border-left: solid 1px solid red;
        text-align: left;
        padding: 8px;
    }
    </style>

    <!-- Next and previous buttons -->
    <a id="prev" class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a id="nexts" class="nexts" onclick="plusSlides(1)">&#10095;</a>
</div>
<br>
<!-- The dots/circles -->
<div id="dots" style="text-align:center">
    <span class="dot" onclick="currentSlide(1)"> Game Over</span>
    <span class="dot" onclick="currentSlide(2)"> Question 1</span>
    <span class="dot" onclick="currentSlide(3)"> Question 2</span>
    <span class="dot" onclick="currentSlide(4)"> Question 3</span>
    <span class="dot" onclick="currentSlide(5)"> Question 4</span>
    <span class="dot" onclick="currentSlide(6)"> Question 5</span>
    <span class="dot" onclick="currentSlide(7)"> Question 6</span>
    <span class="dot" onclick="currentSlide(8)"> Question 7</span>
    <span class="dot" onclick="currentSlide(9)"> Question 8</span>
    <span class="dot" onclick="currentSlide(10)"> Question 9</span>
    <span class="dot" onclick="currentSlide(11)"> Question 10</span>
</div>




<script type="text/javascript">
  window.onload = checkDaily;
</script>



<?php
  require "includes/footer.php";
?>
