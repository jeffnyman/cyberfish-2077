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

      // Dimensions
      this.width = 55;
      this.height = 43;

      // Location
      this.x = 20;
      this.y = 100;
    }
  }

  const game = new Game();
});
