const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;

const KEY_W = 87;
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;

var mouseX = 0;
var mouseY = 0;

function setupInput() {
  canvas.addEventListener('mousemove', updateMousePos);
  
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  blueCar.setupInput(KEY_W, KEY_S, KEY_A, KEY_D);
  redCar.setupInput(KEY_UP_ARROW, KEY_DOWN_ARROW, KEY_LEFT_ARROW, KEY_RIGHT_ARROW);
}

function updateMousePos(event) {
  var rect = canvas.getBoundingClientRect();
  var root = document.documentElement;

  mouseX = event.clientX - rect.left - root.scrollLeft
  mouseY = event.clientY - rect.top - root.scrollTop;

  /* cheat to check for bugs 
  carX = mouseX;
  carY = mouseY; */
}

function keyPressed(event) {
  keySet(event, blueCar, true);
  keySet(event, redCar, true);
}

function keyReleased(event) {
  keySet(event, blueCar, false);
  keySet(event, redCar, false);
}

function keySet(event, car, value) {
  if ( event.keyCode == car.controlKeyGus ) car.keyHeld_gus = value;
  if ( event.keyCode == car.controlKeyReverse ) car.keyHeld_reverse = value;
  if ( event.keyCode == car.controlKeyTurnLeft ) car.keyHeld_turnLeft = value;
  if ( event.keyCode == car.controlKeyTurnRight ) car.keyHeld_turnRight = value;
}
