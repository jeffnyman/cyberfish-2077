window.addEventListener("load", () => {
  const gameAreaCanvas = document.getElementById("game");
  const gameDisplay = gameAreaCanvas.getContext("2d");

  gameAreaCanvas.width = 500;
  gameAreaCanvas.height = 500;

  class Game {
    constructor() {
      console.log("Game constructed.");

      this.player = new Player();
    }

    render() {
      this.player.draw();
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

    draw() {
      gameDisplay.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  const game = new Game();
  game.render();
});
