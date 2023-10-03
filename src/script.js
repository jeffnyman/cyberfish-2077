window.addEventListener("load", () => {
  const gameAreaCanvas = document.getElementById("game");
  const gameDisplay = gameAreaCanvas.getContext("2d");

  gameAreaCanvas.width = 500;
  gameAreaCanvas.height = 500;

  class Game {
    constructor() {
      console.log("Game constructed.");

      this.cyberfish = new CyberFish();
      this.actionHandler = new ActionHandler();
      this.actionHandler.setup();
    }

    render() {
      this.cyberfish.draw();
    }

    process() {
      this.cyberfish.update();
    }
  }

  class ActionHandler {
    constructor() {
      console.log("Action Handler constructed.");
    }

    setup() {
      window.addEventListener("keydown", (event) => {
        console.log(event.key);
      });
    }
  }

  class CyberFish {
    constructor() {
      console.log("CyberFish constructed.");

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
    gameDisplay.clearRect(0, 0, gameAreaCanvas.width, gameAreaCanvas.height);

    game.render();
    game.process();

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});
