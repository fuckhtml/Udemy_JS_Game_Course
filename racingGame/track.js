const TRACK_COLS = 18;
const TRACK_ROWS = 13;

const TRACK_WIDTH = 40;
const TRACK_HEIGHT = 40;

const TRACK_ROAD = 0;
const TRACK_WALL = 1;
const TRACK_PLAYERSTART = 2;

var wallPic = document.createElement("img");
var roadPic = document.createElement("img");

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
  for (var row = 0; row < TRACK_ROWS; row++) {
    for (var col = 0; col < TRACK_COLS; col++) {
      var arrayIndex = colRowToArrayIndex(col, row);
      if ( trackGrid[arrayIndex] == TRACK_WALL) {
        canvasContext.drawImage(wallPic, TRACK_WIDTH * col, TRACK_HEIGHT * row);
      } else if ( trackGrid[arrayIndex] == TRACK_ROAD) {
        canvasContext.drawImage(roadPic, TRACK_WIDTH * col, TRACK_HEIGHT * row);
      }
    }
  }
}

function trackLoadImages() {
  wallPic.src="track_wall.png";
  roadPic.src="track_road.png";
}

function isWallAtColRow(col, row) {
  var index = colRowToArrayIndex(col, row);
  if ( index < trackGrid.length &&      //*  check if the brick is inside the field
       col >= 0 && col < TRACK_COLS && //** check for fixing bug with opposite edge removing
       row >= 0 && row < TRACK_ROWS && //**
       trackGrid[index] == TRACK_WALL ) //*** check if is there a wall
    return true;
  else
    return false;
}