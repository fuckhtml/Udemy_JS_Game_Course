var canvas;
var canvasContext;

window.onload = function() {
  // save the canvas for dimensions, and its 2d context for drawing to it
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext('2d');
  
  loadImages();
}

function startGame() {
  carReset();
  setupInput();
  var fps = 30;
  setInterval(updateAll, 1000 / fps);
}

function updateAll() {
  drawEverything();
  moveEverything();
};

function drawEverything() {
  drawTracks();
  drawCar();
}

function moveEverything() {
  carMove();
  carTrackHandling();
}