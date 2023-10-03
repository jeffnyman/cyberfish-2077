window.addEventListener("load", () => {
  const gameAreaCanvas = document.getElementById("game");

  gameAreaCanvas.width = 500;
  gameAreaCanvas.height = 500;

  class Game {
    constructor() {
      console.log("Game constructed.");

      this.player = new Player();
    }
  }

  class Player {
    constructor() {
      console.log("Player constructed.");
    }
  }

  const game = new Game();
});
