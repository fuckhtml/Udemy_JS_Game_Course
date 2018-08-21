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

function colRowToArrayIndex(col, row) {
  var trackIndexUnderCar = ((row - 1) * TRACK_COLS + col) - 1;
  return trackIndexUnderCar;
}

function getColFromX(x) {
  return Math.floor(x / (TRACK_WIDTH + TRACK_GAP) + 1);
}

function getRowFromY(y) {
  return Math.floor(y / (TRACK_HEIGHT + TRACK_GAP) + 1);
}
