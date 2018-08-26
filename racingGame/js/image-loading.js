var carPic = document.createElement("img");
var trackPics = [];

var picsToLoad = 0; // set automatically based on imageList in loadImages();

function loadImages() {

  var imageList = [
    { varName: carPic, fileName: "player_1.png" },
    { trackCode: TRACK_WALL, fileName: "track_wall.png" },
    { trackCode: TRACK_ROAD, fileName: "track_road.png" },
    { trackCode: TRACK_GOAL, fileName: "track_goal.png" },
    { trackCode: TRACK_TREE, fileName: "track_tree.png" },
    { trackCode: TRACK_FLAG, fileName: "track_flag.png" }
  ];

  picsToLoad = imageList.length;

  for (var i = 0; i < imageList.length; i++) {
    if ( imageList[i].varName != undefined ) {
      loadImage(imageList[i].varName, imageList[i].fileName);
    } else {
      createVarOfTrackImage(imageList[i].trackCode, imageList[i].fileName);
      loadImage(trackPics[imageList[i].trackCode], imageList[i].fileName);
    }
  }
}

function loadImage(imgVar, fileName) {
  imgVar.onload = countLoadedImages;
  imgVar.src = "images/" + fileName;
}

function createVarOfTrackImage(trackCode, fileName) {
  trackPics[trackCode] = document.createElement("img");
}

function countLoadedImages() {
  picsToLoad--;
  if (picsToLoad == 0) {
    startGame();
  }
}




