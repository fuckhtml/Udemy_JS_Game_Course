var mouseX = 0;
var mouseY = 0;

const KEY_LEFT_ARROW = 37;
const KEY_UP_ARROW = 38;
const KEY_RIGHT_ARROW = 39;
const KEY_DOWN_ARROW = 40;

var keyHeld_gus = false;
var keyHeld_reverse = false;
var keyHeld_turnLeft = false;
var keyHeld_turnRight = false;

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);
  
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
}

function updateMousePos(event) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = event.clientX - rect.left - root.scrollLeft
  mouseY = event.clientY - rect.top - root.scrollTop;

  // cheat / to check for bugs 
  /*
  carX = mouseX;
  carY = mouseY;
  */
}

function keyPressed(event) {
  if ( event.keyCode == KEY_LEFT_ARROW ) keyHeld_turnLeft = true;
  if ( event.keyCode == KEY_RIGHT_ARROW ) keyHeld_turnRight = true;
  if ( event.keyCode == KEY_UP_ARROW ) keyHeld_gus = true;
  if ( event.keyCode == KEY_DOWN_ARROW ) keyHeld_reverse = true;
}

function keyReleased(event) {
  if ( event.keyCode == KEY_LEFT_ARROW ) keyHeld_turnLeft = false;
  if ( event.keyCode == KEY_RIGHT_ARROW ) keyHeld_turnRight = false;
  if ( event.keyCode == KEY_UP_ARROW ) keyHeld_gus = false;
  if ( event.keyCode == KEY_DOWN_ARROW ) keyHeld_reverse = false;
}
