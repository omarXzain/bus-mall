'use strict';

var busMAllImages = ['bag.jpg', 'banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
  'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg','shark.jpg','sweep.png', 'tauntaun.jpg',
  'unicorn.jpg', 'usb.gif', 'water-can.jpg','wine-glass.jpg'];

var leftBusImage = document.getElementById('left_ad_img');
var middleBusImage = document.getElementById('middle_ad_img');
var rightBusImage = document.getElementById('right_ad_img');

var groupimages = document.getElementById('bigSection');

var busMallArr = [];
var totalClicks = 25;


var leftAdRandom;
var middleAdRandom;
var rightAdRandom;


function Bus (name){
  this.name = name;
  this.imgUrl = `img/${name}`;
  this.votes = 0;
  this.views = 0;
  this.viewResult = 0;
  busMallArr.push(this);
}


function renderImages(leftAdRandom, middleAdRandom, rightAdRandom ){

  leftBusImage.setAttribute('src', leftAdRandom.imgUrl);
  leftBusImage.setAttribute('alt', leftAdRandom.name);
  leftAdRandom.views++;

  middleBusImage.setAttribute('src', middleAdRandom.imgUrl);
  middleBusImage.setAttribute('alt', middleAdRandom.name);
  middleAdRandom.views++;

  rightBusImage.setAttribute('src', rightAdRandom.imgUrl);
  rightBusImage.setAttribute('alt', rightAdRandom.name);
  rightAdRandom.views++;


}


function getRandomImg(){
  leftAdRandom = busMallArr[randomNumber(0, busMallArr.length-1)];
  middleAdRandom = busMallArr[randomNumber(0, busMallArr.length-1)];
  rightAdRandom = busMallArr[randomNumber(0, busMallArr.length-1)];

  renderImages(leftAdRandom, middleAdRandom, rightAdRandom );

  while(leftAdRandom === rightAdRandom || leftAdRandom === middleAdRandom || rightAdRandom === middleAdRandom){
    leftAdRandom = busMallArr[randomNumber(0, busMallArr.length-1)];
    middleAdRandom = busMallArr[randomNumber(0, busMallArr.length-1)];
    rightAdRandom = busMallArr[randomNumber(0, busMallArr.length-1)];
  }

  renderImages(leftAdRandom,middleAdRandom, rightAdRandom );
}

for (var i = 0; i< busMAllImages.length; i++){
  new Bus (busMAllImages[i]);
}
getRandomImg();


function clickOnImg(e){
  if (e.target.id === 'left_ad_img' || e.target.id === 'middle_ad_img' || e.target.id === 'right_ad_img'){
    getRandomImg();
    totalClicks--;
  }

  if (e.target.id === 'left_ad_img'){
    leftAdRandom.votes++;
  }
  if (e.target.id === 'middle_ad_img'){
    middleAdRandom.votes++;
  }
  if (e.target.id === 'right_ad_img'){
    rightAdRandom.votes++;
  }

  if(totalClicks === 0){


    groupimages.removeEventListener('click', clickOnImg);
    lastResults();
    results();
  }
}

groupimages.addEventListener('click' , clickOnImg);



function results(){
  var finalResults = document.getElementById('totalResults');
  for (var m = 0; m<busMallArr.length;m++){

    var listedResults = document.createElement('li');
    finalResults.appendChild(listedResults);
    listedResults.textContent = ` ${busMallArr[m].name} had ${busMallArr[m].votes} votes and was shown ${busMallArr[m].views} times`;
  }}


function lastResults(){
  var adsNameArr = [];
  var adsClicks = [];
  for (var j = 0; j < busMallArr.length; j++){
    var ads = busMallArr[j].name;
    adsNameArr.push(ads);
    var adsViews = busMallArr[j].viewResult;
    adsClicks.push(adsViews);
  }}









function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
