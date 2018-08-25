var carPic = document.createElement("img");
var wallPic = document.createElement("img");
var roadPic = document.createElement("img");

var picsToLoad = 3;

function loadImages() {
  trackLoadImages();
  carImageLoad();
}

function countLoadedImages() {
  picsToLoad--;
  if (picsToLoad == 0) {
    startGame();
  }
}

function carImageLoad() {
  carPic.onload = countLoadedImages;
  carPic.src = "player_1.png";
}

function trackLoadImages() {
  wallPic.onload = countLoadedImages;
  roadPic.onload = countLoadedImages;
  wallPic.src="track_wall.png";
  roadPic.src="track_road.png";
}