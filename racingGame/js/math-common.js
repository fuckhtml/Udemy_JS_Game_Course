function colRowToArrayIndex(col, row) {
  var trackIndexUnderCar = row * TRACK_COLS + col;
  return trackIndexUnderCar;
}

function getColFromX(x) {
  return Math.floor(x / TRACK_WIDTH);
}

function getRowFromY(y) {
  return Math.floor(y / TRACK_HEIGHT);
}