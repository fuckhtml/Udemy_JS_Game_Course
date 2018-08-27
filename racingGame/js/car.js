const GROUNDSPEED_DECAY_MULT = 0.97;
const DRIVE_POWER = 0.5;
const REVERSE_POWER = 0.2;
const TURN_RATE = (Math.PI*2 / (12 * 8));
const MIN_SPEED_TO_TURN = 0.3;

function Car(name, pictureName) {
  this.name = name;
  this.picture = document.createElement("img");
  this.pictureName = pictureName;

  this.x;
  this.y;
  this.ang = 0;
  this.speed = 0;

  this.keyHeld_gus = false;
  this.keyHeld_reverse = false;
  this.keyHeld_turnLeft = false;
  this.keyHeld_turnRight = false;

  this.controlKeyGus;
  this.controlKeyReverse;
  this.controlKeyTurnLeft;
  this.controlKeyTurnRight;

  this.setupInput = function(keyGus, keyReverse, keyTurnLeft, keyTurnRight) {
    this.controlKeyGus = keyGus;
    this.controlKeyReverse = keyReverse;
    this.controlKeyTurnLeft = keyTurnLeft;
    this.controlKeyTurnRight = keyTurnRight;
  }

  this.reset = function() {
    this.speed = 0;
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
    console.log("NO PLAYER START FOUND")
  } // end of carReset function
  
  this.move = function() {

    // checks for collision
    var trackCol = getColFromX(this.x);
    var trackRow = getRowFromY(this.y);
    var trackIndex = colRowToArrayIndex(trackCol, trackRow);
    var tileType = returnTileTypeAtColRow(trackCol, trackRow);
    if ( tileType == TRACK_GOAL ) {
      console.log(this.name);
      loadLevel(levelOne);
    } else if ( tileType != TRACK_ROAD ) {
      this.x -= Math.cos(this.ang) * this.speed;
      this.y -= Math.sin(this.ang) * this.speed;

      this.speed *= -0.5; 
    }

    // then moves
    this.speed *= GROUNDSPEED_DECAY_MULT;

    if ( this.keyHeld_gus ) this.speed += DRIVE_POWER;
    if ( this.keyHeld_reverse ) this.speed -= REVERSE_POWER;

    if (Math.abs(this.speed) > MIN_SPEED_TO_TURN ) {
      if ( this.keyHeld_turnLeft ) this.ang -= TURN_RATE; 
      if ( this.keyHeld_turnRight ) this.ang += TURN_RATE;     
    }

    this.x += Math.cos(this.ang) * this.speed;
    this.y += Math.sin(this.ang) * this.speed;
  }


  function returnTileTypeAtColRow(col, row) {
    var index = colRowToArrayIndex(col, row);
    if ( col >= 0 && col < TRACK_COLS && //** check for fixing bug with opposite edge removing
         row >= 0 && row < TRACK_ROWS )
      return trackGrid[index];
    else
      return TRACK_WALL;
  }

  this.draw = function() {
    drawBitmapCenteredWithRotation(this.picture, this.x, this.y, this.ang);
  }

}