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

    process() {
      this.player.update();
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

      // Movement
      this.velocity = 0;
    }

    draw() {
      gameDisplay.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
      this.y += this.velocity;
    }
  }

  const game = new Game();

  function gameLoop() {
    game.render();
    game.process();

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});
