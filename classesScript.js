class Game {
  constructor() {
    this.diceAmount = undefined;
    this.players = [];
    this.idIterator = 0;
    this.currentIdx = 0;
    this.currentPlayer = this.players[this.currentIdx];
  }
  nextPlayer() {
    if (this.currentIdx === this.players.length - 1) {
      this.currentIdx = 0;
    } else {
      this.currentIdx++;
    }
    this.SetCurrentPlayer();
  }
  SetCurrentPlayer() {
    this.currentPlayer = this.players[this.currentIdx];
  }
  checkForWinner() {
    let winner = undefined;
    this.players.forEach((player) => {
      if (player.score >= 10000) {
        winner = player;
      }
    });
    return winner ? winner : false;
  }
  clearScore(playerId) {
    let foundPlayer = this.players.filter(({ id }) => {
      return id === playerId;
    });
    if (foundPlayer.length) return (foundPlayer[0].score = 0);
    else return false;
  }
  addPlayersToDom() {}
}

class Player {
  constructor(name, score = 0, farkles = 0) {
    this.name = name;
    this.score = score;
    this.farkles = farkles;
    this.id = StartedGame.currentIdx;
  }
  addToScore(amount) {
    this.score += amount;
  }
  hasFarkled() {
    if (this.farkles === 3) {
      this.score -= 1000;
    }
  }
  setId() {
    this.id = idIterator;
    idIterator += 1;
  }
}
