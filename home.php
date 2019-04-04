<?php
  require "includes/header.php";
?>

<div class="container-mail">
  <form class="container-form" action="includes/send-mail-inc.php" method="post">
    <h1 style="text-align: center;">Contact Us</h1>
    <p style="font-size: 20px;">* Please contact us if you have any suggestions or problems.</p>
    <?php  
      if(isset($_GET["mail"])){
        if ($_GET["mail"] == "success") {
          echo '<p style="color:green;font-size: 20px;"> mail has been sent successfully </p>';
        }else if ($_GET["mail"] == "fail") {
          echo '<p style="color:red;font-size: 20px;"> an error occured, please try later </p>';
        }
      }
    ?>
    <label for="subject"><b>Subject</b></label>
    <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>

    <input type="submit" value="Submit">
  </form>
</div>

<!-- content -->
<script type="text/javascript" src="slideshow.js"></script>
<div style="
width: 15%;
background: white;
padding: auto;
margin: auto;
margin-top: 120px;
margin-bottom: 10px;
border: 5px solid black;
border-radius: 10px;
">
  <h1 style="text-align: center; color: red;">How To Play</h1>
</div>
<div class="slideshow-container">

  <!-- Full-width images with number and caption text -->

    <div class="mySlides fade">
      <img src="includes/images/fastmaths_presentation_1.jpg" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/images/fastmaths_presentation_2.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/images/fastmaths_presentation_3.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/images/fastmaths_presentation_4.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/images/fastmaths_presentation_5.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/images/fastmaths_presentation_6.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/images/fastmaths_presentation_7.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/images/fastmaths_presentation_8.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/images/fastmaths_presentation_9.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>
    <!-- Next and previous buttons -->
    <a class="prev" onclick="plusSlides(-1)" style="z-index: 1">&#10094;</a>
    <a class="nexts" onclick="plusSlides(1)" style="z-index: 1">&#10095;</a>
</div>

<div style="text-align:center;visibility:hidden;">
    <span class="dot" onclick="currentSlide(1)">#</span>
    <span class="dot" onclick="currentSlide(2)">#</span>
    <span class="dot" onclick="currentSlide(3)">#</span>
    <span class="dot" onclick="currentSlide(4)">#</span>
    <span class="dot" onclick="currentSlide(5)">#</span>
    <span class="dot" onclick="currentSlide(6)">#</span>
    <span class="dot" onclick="currentSlide(7)">#</span>
    <span class="dot" onclick="currentSlide(8)">#</span>
    <span class="dot" onclick="currentSlide(9)">#</span>
</div>

<script type="text/javascript">
  window.onload = currentSlide(1);
  //skip to the next slide every 15 seconds
  setInterval(function(){ plusSlides(1); }, 15000);
</script>



<style type="text/css">
  input[type=text], select, textarea {
  width: 100%; /* Full width */
  padding: 12px; /* Some padding */  
  border: 1px solid #ccc; /* Gray border */
  border-radius: 4px; /* Rounded borders */
  box-sizing: border-box; /* Make sure that padding and width stays in place */
  margin-top: 6px; /* Add a top margin */
  margin-bottom: 16px; /* Bottom margin */
  resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
}

/* Style the submit button with a specific background color etc */
input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* When moving the mouse over the submit button, add a darker green color */
input[type=submit]:hover {
  background-color: #45a049;
}

/* Add a background color and some padding around the form */
.container-form {
  width: 80%;
  height: 70%;
  margin: auto;
  padding: auto;
  border-radius: 10px;
  border: 5px solid black;
  
}
.container-mail {
  width: 100%;
  margin: auto;
  padding: auto;
  border-radius: 5px;
  padding: 20px;
}
</style>
<?php
  require "includes/footer.php";
?>
