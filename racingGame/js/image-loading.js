var carPic = document.createElement("img");
var wallPic = document.createElement("img");
var roadPic = document.createElement("img");
var goalPic = document.createElement("img");
var treePic = document.createElement("img");
var flagPic = document.createElement("img");

var picsToLoad = 0; // set automatically based on imageList in loadImages();

function loadImages() {

  var imageList = [
    { varName: carPic, theFile: "player_1.png" },
    { varName: wallPic, theFile: "track_wall.png" },
    { varName: roadPic, theFile: "track_road.png" },
    { varName: goalPic, theFile: "track_goal.png" },
    { varName: treePic, theFile: "track_tree.png" },
    { varName: flagPic, theFile: "track_flag.png" }
  ];

  picsToLoad = imageList.length;

  for (var i = 0; i < imageList.length; i++) {
    beginLoadImage(imageList[i].varName, imageList[i].theFile);
  }
}

function beginLoadImage(imgVar, fileName) {
  imgVar.onload = countLoadedImages;
  imgVar.src = "images/" + fileName;
}

function countLoadedImages() {
  picsToLoad--;
  if (picsToLoad == 0) {
    startGame();
  }
}




