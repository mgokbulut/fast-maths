<div class="calculator">
  <form>
    <input class="display" name="display" value="0" size=25>
    <br>
    <input style="margin-left: 3px;" type="button" value="+/-" onClick="changeSign(this.form.display)">
    <input style="margin-left: 70.5px;" type="button" value="  Clear  " onClick="this.form.display.value = 0 ">
    <input type="button" value="⌫" onClick="deleteChar(this.form.display)">
    <br>
    <input style="margin-left: 3px;" type="button" value="√" onClick="if (checkNum(this.form.display.value))
    { sqrt(this.form) }">
    <input style="text-align: top;"type="button" value="x²" onClick="if (checkNum(this.form.display.value))
    { square(this.form) }">
    <input type="button" value="    (    " onClick="addChar(this.form.display, '(')">
    <input type="button" value="    )    " onClick="addChar(this.form.display, ')')">
    <br>
    <input style="margin-left: 3px;" type="button" value="7" onClick="addChar(this.form.display, '7')">
    <input type="button" value="8" onClick="addChar(this.form.display, '8')">
    <input type="button" value="9" onClick="addChar(this.form.display, '9')">
    <input type="button" value="/" onClick="addChar(this.form.display, '/')">
    <br>
    <input style="margin-left: 3px;" type="button" value="4" onClick="addChar(this.form.display, '4')">
    <input type="button" value="5" onClick="addChar(this.form.display, '5')">
    <input type="button" value="6" onClick="addChar(this.form.display, '6')">
    <input type="button" value="*" onClick="addChar(this.form.display, '*')">
    <br>
    <input style="margin-left: 3px;" type="button" value="1" onClick="addChar(this.form.display, '1')">
    <input type="button" value="2" onClick="addChar(this.form.display, '2')">
    <input type="button" value="3" onClick="addChar(this.form.display, '3')">
    <input type="button" value="-" onClick="addChar(this.form.display, '-')">
    <br>
    <input style="margin-left: 3px;" type="button" value="." onClick="addChar(this.form.display, '.')">
    <input type="button" value="0" onClick="addChar(this.form.display, '0')">
    <input type="button" value="=" name="enter" onClick="if (checkNum(this.form.display.value))
    { compute(this.form) }">
    <input type="button" value="+" onClick="addChar(this.form.display, '+')">
  </form>
</div>
