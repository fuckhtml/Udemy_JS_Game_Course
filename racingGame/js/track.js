const TRACK_COLS = 20;
const TRACK_ROWS = 15;

const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 40;

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;
const TRACK_GOAL = 3;
const TRACK_TREE = 4;
const TRACK_FLAG = 5;


var trackGrid = [ 4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4,
                  4, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
                  4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
                  1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,
                  1, 0, 0, 0, 1, 1, 1, 4, 4, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 1,
                  1, 0, 0, 1, 1, 0, 0, 1, 4, 4, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                  1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1,
                  1, 2, 2, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1,
                  1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1,
                  0, 3, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 
                  0, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1,
                  1, 1, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 1, 4 ];

function drawTracks() {
  var arrayIndex = 0;
  var x = 0;
  var y = 0;
  for (var row = 0; row < TRACK_ROWS; row++) {
    for (var col = 0; col < TRACK_COLS; col++) {
      var tileKindHere = trackGrid[arrayIndex];
      var useImg = trackPics[tileKindHere];
      canvasContext.drawImage(useImg, x, y);
      arrayIndex++;
      x += TRACK_WIDTH;
    }
    x = 0;
    y += TRACK_HEIGHT;
  } 
}

function isObstacleAtColRow(col, row) {
  var index = colRowToArrayIndex(col, row);
  if ( index < trackGrid.length &&      //*  check if the brick is inside the field
       col >= 0 && col < TRACK_COLS && //** check for fixing bug with opposite edge removing
       row >= 0 && row < TRACK_ROWS && //**
       trackGrid[index] != TRACK_ROAD ) //*** check if is there a wall
    return true;
  else
    return false;
}