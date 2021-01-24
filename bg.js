const body = document.querySelector("body");

const IMG_NUMBER = 16;

function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add("bgImage");
  body.append(image);
}

function genRandom() {
  return (number = Math.floor(Math.random() * IMG_NUMBER));
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
