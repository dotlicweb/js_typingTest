let startBtn = document.querySelector('#start-btn');
let mainTextH3 = document.querySelector('#main-text');
let playerArea = document.querySelector('#player-area');
let comp1Area = document.querySelector('#comp1-area');
let comp2Area = document.querySelector('#comp2-area');
let comp3Area = document.querySelector('#comp3-area');
let playerBtn = document.querySelector('#player-btn');
let comp1Btn = document.querySelector('#comp1-btn');
let comp2Btn = document.querySelector('#comp2-btn');
let comp3Btn = document.querySelector('#comp3-btn');
let tryAgainBtn = document.querySelector('#try-again');

let position = 0;
let level = 1;
let mainText = '';
let startTime;

startBtn.addEventListener('click', startTimer);
function startTimer(){
    startTime = 3;
    this.innerHTML = startTime;
    let loop = setInterval(()=>{
        startTime--;
        startBtn.innerHTML = startTime;
        if(startTime === 0){
            clearInterval(loop);
            startBtn.style.display = "none";
           startGame();
        }
    },1000)
}
function startGame(){
   setUpRandomText();
   player1StartTyping();
   comp1StartTyping();
   comp2StartTyping();
   comp3StartTyping();
}
function setUpRandomText(){
  let rand = Math.floor(Math.random()*textForTyping.length); 
  mainText = textForTyping[rand];
  mainTextH3.innerHTML = mainText;
  mainTextH3.style.display = "block";
}
function player1StartTyping(){
    playerArea.focus();
    playerArea.addEventListener("keyup", check);
}
function check(e) {
  if (e.code === "Enter") {
    if (this.value.trim() === mainText) {
      position++;
      playerBtn.value = position;
      playerBtn.innerHTML = `Position: ${position}`;
      playerBtn.className = "btn btn-success form-control";
      checkPosition();
      playerArea.removeEventListener('keyup', check);
    } else {
      playerBtn.className = "btn btn-danger form-control";
      playerBtn.innerHTML = "Wrong typing..";
    }
  }
}

function comp1StartTyping(){
    let mainTextArray = mainText.split("");
    setUpRadnomSpeed(mainTextArray, comp1Area, comp1Btn);
}
function comp2StartTyping(){
    let mainTextArray = mainText.split("");
    setUpRadnomSpeed(mainTextArray, comp2Area, comp2Btn);
}
function comp3StartTyping(){
    let mainTextArray = mainText.split("");
    setUpRadnomSpeed(mainTextArray, comp3Area, comp3Btn);
}

function setUpRadnomSpeed(mainTextArray, compArea, compBtn) {
  let rand;
  if(level === 1) {
    rand = Math.floor(Math.random()*(700-100)+100);
  } else if (level === 2) {
    rand = Math.floor(Math.random()*(500-100)+100);
  } else if (level === 3) {
    rand = Math.floor(Math.random()*(300-100)+100);
  } else if (level === 4) {
    rand = Math.floor(Math.random()*(200-50)+50);
  } else if (level === 5) {
    rand = Math.floor(Math.random()*(100-10)+10);
  } else if (level === 6) {
    rand = Math.floor(Math.random()*(40-10)+10);
  }
  console.log(level);
  let loop = setTimeout(() => {
      if(mainTextArray.length > 0) {
        compArea.value += mainTextArray.shift();
        setUpRadnomSpeed(mainTextArray, compArea, compBtn)
      } else {
        position++;
        compBtn.innerHTML = `Position: ${position}`;
        compBtn.className = 'btn btn-success form-control';
        checkPosition();
      }
  },rand)
}

function checkPosition() {
  if(position === 4) {
    checkLevel();
  }
}

function checkLevel() {
    if(parseInt(playerBtn.value) !== 4) {   
      mainTextH3.innerHTML = "CESTITAMO, prosli ste u sledeci level";
      mainTextH3.className = 'btn btn-success form-control p-3';
      tryAgainBtn.style.display = 'block';
      tryAgainBtn.innerHTML = 'Sledeci level';
      tryAgainBtn.addEventListener('click', nextLevel);
    } else {
      mainTextH3.innerHTML = `Nazalost niste prosli u level ${level+1}`;
      mainTextH3.className = 'btn btn-danger form-control p-3';
      tryAgainBtn.innerHTML = 'Pokusaj ponovo';
      tryAgainBtn.addEventListener('click', () => location.reload());
      tryAgainBtn.style.display = 'block';
    }
}

function nextLevel() {
  level++;
  resetFields();
  tryAgainBtn.style.display = 'none';
  mainTextH3.style.display = 'none';
  mainTextH3.className = 'text-center';
  startBtn.style.display= 'block';
  startBtn.className = 'btn btn-success form-control';
  startBtn.innerHTML = 'Start';
  startBtn.addEventListener('click', startTimer);
}

function resetFields() {
  playerArea.value = '';
  playerBtn.className = 'btn btn-warning form-control'
  playerBtn.innerHTML = `Position: 0`;
  
  comp1Area.value = '';
  comp1Btn.className = 'btn btn-warning form-control'
  comp1Btn.innerHTML = `Position: 0`;
  
  comp2Area.value = '';
  comp2Btn.className = 'btn btn-warning form-control'
  comp2Btn.innerHTML = `Position: 0`;
  
  comp3Area.value = '';
  comp3Btn.className = 'btn btn-warning form-control'
  comp3Btn.innerHTML = `Position: 0`;
  position = 0;
  startTime = 3;
}