var carPic = document.createElement("img");
var carPicLoaded = false;

var wallPic = document.createElement("img");
var roadPic = document.createElement("img");

function loadImages() {
  trackLoadImages();
  carImageLoad();
}

function carImageLoad() {
  carPic.onload = function() {
    carPicLoaded = true;
  }
  carPic.src = "player_1.png";
}

function trackLoadImages() {
  wallPic.src="track_wall.png";
  roadPic.src="track_road.png";
}