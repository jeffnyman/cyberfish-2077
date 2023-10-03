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
    }

    setup() {
      this.cyberfish = new CyberFish(this);
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
      const SPACEBAR = " ";

      window.addEventListener("keydown", (event) => {
        if (movementKeys.includes(event.key)) {
          this.game.actions.add(event.key);
        }

        if (event.key === SPACEBAR) {
          this.game.cyberfish.fire();
        }
      });

      window.addEventListener("keyup", (event) => {
        if (this.game.actions.has(event.key)) {
          this.game.actions.delete(event.key);
        }
      });
    }
  }

  class CyberFish {
    constructor(game) {
      console.log("CyberFish constructed.");

      this.game = game;

      // Dimensions
      this.width = 55;
      this.height = 43;

      // Location
      this.x = 20;
      this.y = 100;

      // Movement
      this.currentVelocity = 0;
      this.maximumVelocity = 3;

      // State
      this.plasmaBolts = [];
    }

    fire() {
      this.plasmaBolts.push(new PlasmaBolt(this.x, this.y));

      console.log(this.plasmaBolts);
    }

    draw() {
      gameDisplay.fillRect(this.x, this.y, this.width, this.height);

      this.plasmaBolts.forEach((plasma) => {
        plasma.draw();
      });
    }

    update() {
      // Handle movement.

      if (this.game.actions.has("ArrowUp")) {
        this.currentVelocity = -this.maximumVelocity;
      } else if (this.game.actions.has("ArrowDown")) {
        this.currentVelocity = this.maximumVelocity;
      } else {
        this.currentVelocity = 0;
      }

      this.y += this.currentVelocity;

      // Handle plasma bolts.

      this.plasmaBolts.forEach((plasma) => {
        plasma.update();
      });

      this.plasmaBolts = this.plasmaBolts.filter(
        (plasma) => !plasma.dissipated,
      );
    }
  }

  class PlasmaBolt {
    constructor(x, y) {
      console.log("Player fires plasma bolt.");

      // Dimensions
      this.width = 28;
      this.height = 10;

      // Location
      this.x = x;
      this.y = y;

      // Refers to the condition of the bolt hitting nothing and eventually
      // just disappearing. This is a flag to indicate there was no collision
      // but the bolt is no longer active.
      this.dissipated = false;
    }

    draw() {
      gameDisplay.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
      this.dissipated = true;
    }
  }

  const game = new Game();
  game.setup();

  function gameLoop() {
    gameDisplay.clearRect(0, 0, gameAreaCanvas.width, gameAreaCanvas.height);

    game.render();
    game.process();

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});
