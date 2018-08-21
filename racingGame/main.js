var canvas;
var canvasContext;

// Car's settings
var carPic = document.createElement("img");
var carPicLoaded = false;

var carX;
var carY;
var carAng = 0;
var carSpeed = 0;

const GROUNDSPEED_DECAY_MULT = 0.97;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = (Math.PI*2 / (12 * 4));


// Key's settings    
const KEY_LEFT_ARROW = 37;
const KEY_RIGHT_ARROW = 39;
const KEY_UP_ARROW = 38;
const KEY_DOWN_ARROW = 40;

var keyHeld_gus = false;
var keyHeld_reverse = false;
var keyHeld_turnLeft = false;
var keyHeld_turnRight = false;

var mouseX = 400;
var mouseY;

// Track's settings
const TRACK_COLS = 18;
const TRACK_ROWS = 13;

const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 40;

const TRACK_GAP = 5;

var tracksLeft = 0;

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;


var trackGrid = [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
                  1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1,
                  1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,
                  1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                  1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 1,
                  1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1,
                  1, 0, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1,
                  1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1,
                  1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1,
                  1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ];

window.onload = function() {
  // save the canvas for dimensions, and its 2d context for drawing to it
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext('2d');

  carReset();

  canvas.addEventListener('mousemove', updateMousePos);
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);

  carPic.onload = function() {
    carPicLoaded = true;
  }
  carPic.src = "player_1.png";

  var fps = 30;
  setInterval(updateAll, 1000 / fps);
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

function updateAll() {
  drawEverything();
  moveEverything();
};

function carReset() {
  for (var row = 1; row <= TRACK_ROWS; row++) {
    for (var col = 1; col <= TRACK_COLS; col++) {
      var arrayIndex = colRowToArrayIndex(col, row);
      if ( trackGrid[arrayIndex] == TRACK_PLAYERSTART ) {
        trackGrid[arrayIndex] = TRACK_ROAD;
        carAng = -Math.PI / 2;
        carX = (TRACK_WIDTH + TRACK_GAP) * (col - 1) + TRACK_WIDTH / 2 + TRACK_GAP;
        carY = (TRACK_HEIGHT + TRACK_GAP) * (row - 1) + TRACK_HEIGHT / 2 + TRACK_GAP;
      }
    }
  }
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


function drawTracks() {
  for (var numOfRow = 0; numOfRow < TRACK_ROWS; numOfRow++) {
    var y = (TRACK_HEIGHT + TRACK_GAP) * numOfRow + TRACK_GAP;
    for (var numOfCol = 0; numOfCol < TRACK_COLS; numOfCol++) {
      var x = (TRACK_WIDTH + TRACK_GAP) * numOfCol + TRACK_GAP;
      if ( trackGrid[numOfRow * TRACK_COLS + numOfCol] == TRACK_WALL) {
        colorRect(x, y, TRACK_WIDTH, TRACK_HEIGHT, "blue");
      } 
    }
  }
}

function drawEverything() {
  colorRect(0, 0, canvas.width, canvas.height, '#000');

  if (carPicLoaded) {
    drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);
  }

  drawTracks();
}

function carMove() {
  carSpeed *= GROUNDSPEED_DECAY_MULT;

  if ( keyHeld_turnLeft ) carAng -= TURN_RATE; 
  if ( keyHeld_turnRight ) carAng += TURN_RATE; 
  if ( keyHeld_gus ) carSpeed += DRIVE_POWER;
  if ( keyHeld_reverse ) carSpeed -= REVERSE_POWER;

  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;
}

function colRowToArrayIndex(col, row) {
  var trackIndexUnderCar = ((row - 1) * TRACK_COLS + col) - 1;
  return trackIndexUnderCar;
}

function isWallAtColRow(col, row) {
  var index = colRowToArrayIndex(col, row);
  if ( index < trackGrid.length &&      //*  check if the brick is inside the field
       col >= 1 && col <= TRACK_COLS && //** check for fixing bug with opposite edge removing
       row >= 1 && row <= TRACK_ROWS && //**
       trackGrid[colRowToArrayIndex(col, row)] == TRACK_WALL ) //*** check if is there a wall
    return true;
  else
    return false;
}

function getColFromX(x) {
  return Math.floor(x / (TRACK_WIDTH + TRACK_GAP) + 1);
}

function getRowFromY(y) {
  return Math.floor(y / (TRACK_HEIGHT + TRACK_GAP) + 1);
}

function carTrackHandling() {
  var trackCol = getColFromX(carX);
  var trackRow = getRowFromY(carY);
  var trackIndex = colRowToArrayIndex(trackCol, trackRow);
  if ( isWallAtColRow(trackCol, trackRow) ) {
    carX -= Math.cos(carAng) * carSpeed;
    carY -= Math.sin(carAng) * carSpeed;

    carSpeed *= -0.5;          
  }
} 

function moveEverything() {
  carMove();
  carTrackHandling();
}