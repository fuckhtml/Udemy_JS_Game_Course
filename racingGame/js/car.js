const GROUNDSPEED_DECAY_MULT = 0.97;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = (Math.PI*2 / (12 * 8));
const MIN_SPEED_TO_TURN = 0.3;

function Car() {
  this.x;
  this.y;
  this.ang = 0;
  this.speed = 0;
  this.picture = document.createElement("img");

  this.reset = function() {
    for (var row = 0; row < TRACK_ROWS; row++) {
      for (var col = 0; col < TRACK_COLS; col++) {
        var arrayIndex = colRowToArrayIndex(col, row);
        if ( trackGrid[arrayIndex] == TRACK_PLAYERSTART ) {
          trackGrid[arrayIndex] = TRACK_ROAD;
          this.ang = -Math.PI / 2;
          this.x = TRACK_WIDTH * col + TRACK_WIDTH / 2;
          this.y = TRACK_HEIGHT * row + TRACK_HEIGHT / 2;
          return;
        } // end of player if
      } // end of for loop for columns
    } // end of for loop for rows
  } // end of carReset function
  
  this.move = function() {

    // checks for collision
    var trackCol = getColFromX(this.x);
    var trackRow = getRowFromY(this.y);
    var trackIndex = colRowToArrayIndex(trackCol, trackRow);
    if ( isObstacleAtColRow(trackCol, trackRow) ) {
      this.x -= Math.cos(this.ang) * this.speed;
      this.y -= Math.sin(this.ang) * this.speed;

      this.speed *= -0.5;          
    }

    // then moves
    this.speed *= GROUNDSPEED_DECAY_MULT;

    if ( keyHeld_gus ) this.speed += DRIVE_POWER;
    if ( keyHeld_reverse ) this.speed -= REVERSE_POWER;

    if (Math.abs(this.speed) > MIN_SPEED_TO_TURN ) {
      if ( keyHeld_turnLeft ) this.ang -= TURN_RATE; 
      if ( keyHeld_turnRight ) this.ang += TURN_RATE;     
    }

    this.x += Math.cos(this.ang) * this.speed;
    this.y += Math.sin(this.ang) * this.speed;

  }

  this.draw = function() {
    drawBitmapCenteredWithRotation(this.picture, this.x, this.y, this.ang);
  }

}