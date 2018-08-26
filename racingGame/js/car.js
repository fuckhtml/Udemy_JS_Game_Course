var carX;
var carY;
var carAng = 0;
var carSpeed = 0;

const GROUNDSPEED_DECAY_MULT = 0.97;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = (Math.PI*2 / (12 * 8));
const MIN_SPEED_TO_TURN = 0.3;

function carReset() {
  for (var row = 0; row < TRACK_ROWS; row++) {
    for (var col = 0; col < TRACK_COLS; col++) {
      var arrayIndex = colRowToArrayIndex(col, row);
      if ( trackGrid[arrayIndex] == TRACK_PLAYERSTART ) {
        trackGrid[arrayIndex] = TRACK_ROAD;
        carAng = -Math.PI / 2;
        carX = TRACK_WIDTH * col + TRACK_WIDTH / 2;
        carY = TRACK_HEIGHT * row + TRACK_HEIGHT / 2;
      }
    }
  }
}

function carMove() {
  carSpeed *= GROUNDSPEED_DECAY_MULT;

  if ( keyHeld_gus ) carSpeed += DRIVE_POWER;
  if ( keyHeld_reverse ) carSpeed -= REVERSE_POWER;

  if (Math.abs(carSpeed) > MIN_SPEED_TO_TURN ) {
    if ( keyHeld_turnLeft ) carAng -= TURN_RATE; 
    if ( keyHeld_turnRight ) carAng += TURN_RATE;     
  }

  carX += Math.cos(carAng) * carSpeed;
  carY += Math.sin(carAng) * carSpeed;
}

function carTrackHandling() {
  var trackCol = getColFromX(carX);
  var trackRow = getRowFromY(carY);
  var trackIndex = colRowToArrayIndex(trackCol, trackRow);
  if ( isObstacleAtColRow(trackCol, trackRow) ) {
    carX -= Math.cos(carAng) * carSpeed;
    carY -= Math.sin(carAng) * carSpeed;

    carSpeed *= -0.5;          
  }
}

function drawCar() {
  drawBitmapCenteredWithRotation(carPic, carX, carY, carAng);

}