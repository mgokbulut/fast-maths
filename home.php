<?php
  require "includes/header.php";
?>

<!-- content -->
<script type="text/javascript" src="slideshow.js"></script>
<div class="slideshow-container" style="width:1600px;height:790px;">

  <!-- Full-width images with number and caption text -->

    <div class="mySlides fade">
      <img src="includes/fastmaths_presentation_1.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/fastmaths_presentation_2.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/fastmaths_presentation_3.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/fastmaths_presentation_4.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/fastmaths_presentation_5.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/fastmaths_presentation_6.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/fastmaths_presentation_7.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/fastmaths_presentation_8.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>

    <div class="mySlides fade">
      <img src="includes/fastmaths_presentation_9.PNG" style="width:100%;height:100%;visibility:visible;">
    </div>
    <!-- Next and previous buttons -->
    <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
    <a class="nexts" onclick="plusSlides(1)">&#10095;</a>
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
  setInterval(function(){ plusSlides(1); }, 10000);// next slide every 10 seconds.
</script>

<?php
  require "includes/footer.php";
?>
