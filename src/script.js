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
      const movementKeys = ["ArrowUp", "ArrowDown"];
      const SPACEBAR = " ";

      window.addEventListener("keydown", (event) => {
        if (movementKeys.includes(event.key)) {
          game.actions.add(event.key);
        }

        if (event.key === SPACEBAR) {
          game.cyberfish.fire();
        }
      });

      window.addEventListener("keyup", (event) => {
        if (game.actions.has(event.key)) {
          game.actions.delete(event.key);
        }
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

      if (game.actions.has("ArrowUp")) {
        this.currentVelocity = -this.maximumVelocity;
      } else if (game.actions.has("ArrowDown")) {
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

      // Movement
      this.velocity = 3;

      // State

      // Refers to the condition of the bolt hitting nothing and eventually
      // just disappearing. This is a flag to indicate there was no collision
      // but the bolt is no longer active.
      this.dissipated = false;
    }

    draw() {
      gameDisplay.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
      this.x += this.velocity;

      if (this.x > gameAreaCanvas.width * 0.5) {
        this.dissipated = true;
      }
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
