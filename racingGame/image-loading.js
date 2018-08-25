var carPic = document.createElement("img");
var wallPic = document.createElement("img");
var roadPic = document.createElement("img");

var picsToLoad = 0; // set automatically based on imageList in loadImages();

function loadImages() {
  var dataSet = {
    varName: carPic, 
    theFile: "player_1.png"
  };
  var imageList = [
    { varName: carPic, 
      theFile: "player_1.png" },
    { varName: wallPic, 
      theFile: "track_wall.png" },
    { varName: roadPic, 
      theFile: "track_road.png" }
  ];

  picsToLoad = imageList.length;

  for (var i = 0; i < imageList.length; i++) {
    beginLoadImage(imageList[i].varName, imageList[i].theFile);
  }
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




