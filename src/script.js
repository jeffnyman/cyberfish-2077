window.addEventListener("load", () => {
  const gameAreaCanvas = document.getElementById("game");
  const gameDisplay = gameAreaCanvas.getContext("2d");

  gameAreaCanvas.width = 500;
  gameAreaCanvas.height = 500;

  class Game {
    constructor() {
      console.log("Game constructed.");

      // Keeps track of all actions (key press events) from the player.
      this.actions = new Set();

      this.cyberfish = new CyberFish();
      this.actionHandler = new ActionHandler(this);
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
    constructor(game) {
      console.log("Action Handler constructed.");

      this.game = game;
    }

    setup() {
      const movementKeys = ["ArrowUp", "ArrowDown"];

      window.addEventListener("keydown", (event) => {
        if (movementKeys.includes(event.key)) {
          this.game.actions.add(event.key);
        }

        console.log(this.game.actions);
      });

      window.addEventListener("keyup", (event) => {
        if (this.game.actions.has(event.key)) {
          this.game.actions.delete(event.key);
        }

        console.log(this.game.actions);
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
