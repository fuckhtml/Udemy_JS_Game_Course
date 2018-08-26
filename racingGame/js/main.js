var canvas, canvasContext;

var blueCar = new Car();
var greenCar = new Car();

window.onload = function() {
  canvas = document.getElementById("gameCanvas");
  canvasContext = canvas.getContext('2d');
  
  showPreloadingScreen();

  loadImages();
}

function showPreloadingScreen() {
  colorRect(0, 0, canvas.width, canvas.height, "black");
  colorText("Images are loading. Wait please.", canvas.width / 2, canvas.height / 2, "white")
}

function startGame() {
  blueCar.reset();
  greenCar.reset();

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
  blueCar.draw();
  greenCar.draw();
}

function moveEverything() {
  blueCar.move();
  greenCar.move();
}