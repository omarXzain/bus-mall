/* eslint-disable no-undef */
'use strict';

var busMAllImages = ['bag.jpg', 'banana.jpg','bathroom.jpg','boots.jpg','breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
  'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg','shark.jpg','sweep.png', 'tauntaun.jpg',
  'unicorn.jpg', 'usb.gif', 'water-can.jpg','wine-glass.jpg'];


//---------------------------------------------------------------

var leftBusImage = document.getElementById('left_ad_img');
var middleBusImage = document.getElementById('middle_ad_img');
var rightBusImage = document.getElementById('right_ad_img');

var groupimages = document.getElementById('bigSection');

var busMallArr = [];
var totalClicks = 25;


var leftPic;
var centerPic;
var rightPic;


function Bus (name){
  this.name = name.split('.')[0];
  this.imgUrl = `img/${name}`;
  this.votes = 0;
  this.views = 0;
  busMallArr.push(this);
}

//----------------------------------------------------------

function updateVotes(){
  var updateFresh = JSON.stringify(busMallArr);
  localStorage.setItem('votes', updateFresh);
}


function getVotes() {
  var getFresh = localStorage.getItem('votes');

  if(getFresh) {
    busMallArr = JSON.parse(getFresh);
    results();
    lastResults();
  }
}

//--------------------------------------------



var noRepeatArray = [];

function getRandomImg(){

  leftPic = busMallArr[randomNumber(0, busMallArr.length-1)];
  centerPic = busMallArr[randomNumber(0, busMallArr.length-1)];
  rightPic = busMallArr[randomNumber(0, busMallArr.length-1)];

  while(leftPic.name === rightPic.name || leftPic.name === centerPic.name || rightPic.name === centerPic.name || noRepeatArray.includes(leftPic) || noRepeatArray.includes(centerPic) || noRepeatArray.includes(rightPic)){
    leftPic = busMallArr[randomNumber(0, busMallArr.length-1)];
    centerPic = busMallArr[randomNumber(0, busMallArr.length-1)];
    rightPic = busMallArr[randomNumber(0, busMallArr.length-1)];
  }

  noRepeatArray = [];
  noRepeatArray.push(leftPic);
  noRepeatArray.push(rightPic);
  noRepeatArray.push(centerPic);



  leftBusImage.setAttribute('src', leftPic.imgUrl);
  leftBusImage.setAttribute('alt', leftPic.name);
  leftPic.views++;

  middleBusImage.setAttribute('src', centerPic.imgUrl);
  middleBusImage.setAttribute('alt', centerPic.name);
  centerPic.views++;

  rightBusImage.setAttribute('src', rightPic.imgUrl);
  rightBusImage.setAttribute('alt', rightPic.name);
  rightPic.views++;
}


for (var i = 0; i< busMAllImages.length; i++){
  new Bus (busMAllImages[i]);
}
getRandomImg();

//---------------------------------------------------

function clickOnImg(e){
  if (e.target.id === 'left_ad_img' || e.target.id === 'middle_ad_img' || e.target.id === 'right_ad_img'){
    getRandomImg();
    totalClicks--;
  }

  if (e.target.id === 'left_ad_img') leftPic.votes++;
  if (e.target.id === 'middle_ad_img') centerPic.votes++;
  if (e.target.id === 'right_ad_img') rightPic.votes++;


  if(totalClicks === 0){
    // leftBusImage.remove();
    // middleBusImage.remove();
    // rightBusImage.remove();
    groupimages.removeEventListener('click', clickOnImg);
    updateVotes();
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
    console.log(listedResults);

  }}


// ............................................................

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ............................................................



function lastResults(){
  var namesArr = [];
  var viewsArr = [];

  for (var j = 0; j < busMallArr.length; j++){
    var namesResults = busMallArr[j].name;
    namesArr.push(namesResults);

    var viewResults = busMallArr[j].views;
    viewsArr.push(viewResults);
  }

  //--------------------------------------------------------------

  var ctx = document.getElementById('myChart').getContext('2d');
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: namesArr,
      datasets: [{
        label: '# of Votes',
        data: viewsArr,
        backgroundColor: 'rgba(255, 99, 102, 8.2)',
        borderColor: 'white',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });


}
getVotes();
