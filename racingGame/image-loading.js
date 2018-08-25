var carPic = document.createElement("img");
var wallPic = document.createElement("img");
var roadPic = document.createElement("img");

var picsToLoad = 3;

function loadImages() {
  beginLoadImage(carPic, "player_1.png");
  beginLoadImage(wallPic, "track_wall.png");
  beginLoadImage(roadPic, "track_road.png");
}

function beginLoadImage(imgVar, fileName) {
  imgVar.onload = countLoadedImages;
  imgVar.src = fileName;
}

function countLoadedImages() {
  picsToLoad--;
  if (picsToLoad == 0) {
    startGame();
  }
}




