window.addEventListener("load", () => {
  const gameAreaCanvas = document.getElementById("game");
  const gameDisplay = gameAreaCanvas.getContext("2d");

  gameAreaCanvas.width = 500;
  gameAreaCanvas.height = 500;

  class Game {
    constructor() {
      console.log("Game constructed.");

      // Keeps track of all actions (key press events) from the player.
      this.actions = [];

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
      window.addEventListener("keydown", (event) => {
        const keyPresent = this.game.actions.includes(event.key);

        if (event.key === "ArrowUp" && !keyPresent) {
          this.game.actions.push(event.key);
        }

        console.log(this.game.actions);
      });

      window.addEventListener("keyup", (event) => {
        const key = this.game.actions.indexOf(event.key);

        if (this.game.actions.includes(event.key)) {
          this.game.actions.splice(key, 1);
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
