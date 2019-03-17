<?php
  require "includes/header.php";
?>
<script type="text/javascript" src="slideshow.js"></script>
  <div class="outer-layer-gameover">
    <div style="float:left; margin-left:100px;">
      <!-- Slideshow container -->
      <div class="slideshow-container">

        <!-- Full-width images with number and caption text -->

          <div class="mySlides fade">
            <div id="warning" align="center" style="margin: 10px auto 10px auto">
            <p style="height: 450px;">
              <strong>GAME OVER !</strong><br><br> Final Score <br><input type='text' id='amount' value='0' style="text-align: center; font-size: 20px; font-weight: bold;" readonly/>
              <br><br><br>
              <span style="font-size: 20px; bottom:0;">Click on the buttons with question labels below or the buttons on the right and left to see your wrong answers</span>
            </p>

            <div class="buttons">
              <a href="home.php"><p style="float:left; margin-left:85px;">Go Back Home</p></a>
              <a href="game.php"><p style="float:right; margin-right:85px;">Again</p></a>
            </div>
          </div>
          </div>

          <div class="mySlides fade" >
            <!-- <div class="text">Question :  <span id="questi1">:</span> </div> -->
            <div class="gameover-mathml">
              <div id="wrong1" style="margin-left:10px;">
                <math display="block" >
                  <mrow class="beginning">
                  </mrow>
                </math>
              </div>
              <div id="wrong10" style="margin-left:10px; margin-top:10px;">
                <math display="block" >
                  <mrow class="beginning">
                  </mrow>
                </math>
              </div>
            </div>

            <div class="answerSteps">
              <table id="answerTable1"></table>
            </div>
          </div>

        <div class="mySlides fade">
          <!-- <div class="text">Question :  <span id="questi2">:</span> </div> -->
          <div class="gameover-mathml">
            <div id="wrong2" style="margin-left:10px;">
              <math display="block">
                <mrow class="beginning">
                </mrow>
              </math>
            </div>
            <div id="wrong20" style="margin-left:10px; margin-top:10px;">
              <math display="block" >
                <mrow class="beginning">
                </mrow>
              </math>
            </div>
          </div>

          <div class="answerSteps">
              <table id="answerTable2"></table>
            </div>
          </div>

          <div class="mySlides fade">
              <!-- <div class="text">Question :  <span id="questi3">:</span> </div> -->
              <div class="gameover-mathml">
                <div id="wrong3" style="margin-left:10px;">
                  <math display="block">
                    <mrow class="beginning">
                    </mrow>
                  </math>
                </div>
              </div>

              <div id="wrong30" style="margin-left:10px; margin-top:10px;">
                <math display="block" >
                  <mrow class="beginning">
                  </mrow>
                </math>
              </div>

              <div class="answerSteps">
                  <table id="answerTable3"></table>
              </div>
          </div>

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
          <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
          <a class="nexts" onclick="plusSlides(1)">&#10095;</a>
      </div>
      <br>
      <!-- The dots/circles -->
      <div style="text-align:center">
          <span class="dot" onclick="currentSlide(1)"> Game Over</span>
          <span class="dot" onclick="currentSlide(2)"> Question 1</span>
          <span class="dot" onclick="currentSlide(3)"> Question 2</span>
          <span class="dot" onclick="currentSlide(4)"> Question 3</span>
      </div>
    </div>
    <div class="rightside" style="margin-left:50px;">
      <!--Leaderboard-->
      <?php
        require "leaderboard.php";
      ?>
    </div>
  </div>
<?php
  require "includes/footer.php";
?>
<script type="text/javascript">
  window.onload = game_over;
  function game_over(){
    $( document ).ready(function() {
      game = new game_class();
      game.gameover();
    });
  }
</script>
