let throwDiceBtn = document.getElementById('throwDiceBtn');
let clearScoreBtn = document.getElementById('clearScoreBtn');
let amountOfDiceToThrow = document.getElementById('amountOfDiceToThrow');
let diceArea = document.getElementById('diceWrapper');
let playerOneScore = document.getElementById('scoreForPlayer');
let addPlayerBtn = document.getElementById('addPlayer');
let playerToAdd = document.getElementById('playerToAdd');
let startGameBtn = document.getElementById('startGame');
let setupForm = document.getElementById('setupForm');
let diceThrownArr = [];
let playerOneScoreTotal = 0;
let areSureTheyWantToReset = false;
let isPlaying = false;
let StartedGame = false;
let idIterator = 0;

let addPlayerListenerFunc = () => {
  if (!StartedGame) {
    StartedGame = new Game();
  }
  //get value from textbox
  let nameOfPlayer = playerToAdd.value; //this is the value of the player
  //make a new player instance from that
  let newPlayer = new Player(nameOfPlayer);
  //add instance to array of player
  StartedGame.players.push(newPlayer);
  newPlayer.setId();
  //show this player as a new dom element where the 'playerName score: 0' is (model it off that html structure)
  playerToAdd.value = '';
  console.log(StartedGame.players);
};

let showSetUpFormAgain = () => {
  setupForm.style.display = '';
};

let hideSetUpFormAgain = () => {
  setupForm.style.display = 'none';
};

let defaultResetButton = () => {
  clearScoreBtn.style.backgroundColor = 'white';
  clearScoreBtn.innerHTML = 'Reset Game.';
  areSureTheyWantToReset = false;
  showSetUpFormAgain();
};

let cautionResetButton = () => {
  clearScoreBtn.style.backgroundColor = 'red';
  clearScoreBtn.innerHTML = 'If you are sure click again.';
  areSureTheyWantToReset = true;
};

let startGameListenerFunc = () => {
  if (!StartedGame) {
    console.log('you need to add at least one player');
  } else {
    hideSetUpFormAgain();
    StartedGame.diceAmount = Number(amountOfDiceToThrow.value);
    console.log(StartedGame);
    StartedGame.SetCurrentPlayer();
  }
};

let clearScoreListenerFunc = () => {
  if (areSureTheyWantToReset) {
    playerOneScoreTotal = 0;
    playerOneScore.innerHTML = playerOneScoreTotal;
    ClearnUpthrownDice();
    defaultResetButton();
    areSureTheyWantToReset = false;
  } else {
    cautionResetButton();
  }
};

let throwDiceListenerFunc = () => {
  //defaultResetButton();
  if (diceThrownArr.length) ClearnUpthrownDice();
  diceThrownArr = [];

  let numTimesToThrowDice = Number(amountOfDiceToThrow.value);

  for (let i = 0; i < numTimesToThrowDice; i++) {
    throwOneDice(numTimesToThrowDice);
  }

  let highestPlayerScore = score(diceThrownArr);
  console.log(StartedGame);
  StartedGame.currentPlayer.score += highestPlayerScore;
  playerOneScore.innerHTML = playerOneScoreTotal;

  StartedGame.nextPlayer();
};

function throwOneDice(amount) {
  let randomDice = Math.ceil(Math.random() * 6);
  diceThrownArr.push(randomDice);
  let element = document.createElement('DIV');

  for (let i = 0; i < randomDice; i++) {
    let dot = document.createElement('DIV');
    dot.classList = 'dot';
    element.appendChild(dot);
  }
  element.setAttribute('data-value', randomDice);
  element.classList = `dice`;

  diceArea.appendChild(element);
}

function ClearnUpthrownDice() {
  let allDivs = diceArea.querySelectorAll('div.dice');
  for (let i = 0; i < allDivs.length; i++) {
    allDivs[i].remove();
  }
}

function score(dice) {
  let score = 0;
  let dictionaryObjCalcTriplets = dice.reduce((acc, val) => {
    if (acc[val]) {
      acc[val][0]++;

      if (acc[val][0] === 3) {
        if (val === 1) acc[val][1] += 1000;
        else acc[val][1] += val * 100;

        acc[val][0] = 0;
      }
    } else {
      if (val === 1) acc[val] = [1, 0];
      else acc[val] = [1, 0];
    }

    return acc;
  }, {});

  for (let val in dictionaryObjCalcTriplets) {
    score += dictionaryObjCalcTriplets[val][1];
    if (val === '1') score += dictionaryObjCalcTriplets[val][0] * 100;
    if (val === '5') score += dictionaryObjCalcTriplets[val][0] * 50;
  }

  return score;
}

throwDiceBtn.addEventListener('click', throwDiceListenerFunc);
clearScoreBtn.addEventListener('click', clearScoreListenerFunc);
addPlayerBtn.addEventListener('click', addPlayerListenerFunc);
startGameBtn.addEventListener('click', startGameListenerFunc);
