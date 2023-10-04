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

      // Keeps track of all active bounty targets.
      this.targets = [];
    }

    setup() {
      this.cyberfish = new CyberFish();
      this.actionHandler = new ActionHandler();
      this.actionHandler.setup();
      this.hud = new HUD(this.cyberfish);
    }

    render() {
      this.cyberfish.draw();
      this.hud.draw();

      if (this.targets.length > 0) {
        this.targets[0].draw();
      }
    }

    process(deltaTime) {
      this.cyberfish.update(deltaTime);
      this.addTarget();

      if (this.targets.length > 0) {
        this.targets[0].update();
      }

      this.targets = this.targets.filter((target) => !target.escaped);
    }

    addTarget() {
      if (this.targets.length == 0) {
        console.log("Adding a bounty target.");

        this.targets.push(new Angler());
        console.log(this.targets);
      }
    }
  }

  class HUD {
    constructor(cyberfish) {
      console.log("HUD constructed.");

      this.cyberfish = cyberfish;
    }

    draw() {
      gameDisplay.fillStyle = "yellow";

      for (let i = 0; i < this.cyberfish.availablePlasmaBolts; i++) {
        const xCoordWithSpacing = 20 + 10 * i;
        gameDisplay.fillRect(xCoordWithSpacing, 50, 3, 20);
      }
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
      this.firedPlasmaBolts = [];
      this.availablePlasmaBolts = 20;
      this.plasmaBoltLimit = 20;
      this.boltTimer = 0;
      this.boltInterval = 500;
    }

    fire() {
      if (this.availablePlasmaBolts > 0) {
        this.firedPlasmaBolts.push(new PlasmaBolt(this.x, this.y));
        this.availablePlasmaBolts--;
      }
    }

    draw() {
      gameDisplay.fillStyle = "black";
      gameDisplay.fillRect(this.x, this.y, this.width, this.height);

      this.firedPlasmaBolts.forEach((plasma) => {
        plasma.draw();
      });
    }

    update(deltaTime) {
      this.handleMovement();
      this.handlePlasmaBolts();
      this.handlePlasmaBoltReplenish(deltaTime);
    }

    handleMovement() {
      if (game.actions.has("ArrowUp")) {
        this.currentVelocity = -this.maximumVelocity;
      } else if (game.actions.has("ArrowDown")) {
        this.currentVelocity = this.maximumVelocity;
      } else {
        this.currentVelocity = 0;
      }

      this.y += this.currentVelocity;
    }

    handlePlasmaBolts() {
      this.firedPlasmaBolts.forEach((plasma) => {
        plasma.update();
      });

      this.firedPlasmaBolts = this.firedPlasmaBolts.filter(
        (plasma) => !plasma.dissipated,
      );
    }

    handlePlasmaBoltReplenish(deltaTime) {
      if (this.boltTimer > this.boltInterval) {
        if (this.availablePlasmaBolts < this.plasmaBoltLimit) {
          this.availablePlasmaBolts++;
        }

        this.boltTimer = 0;
      } else {
        this.boltTimer += deltaTime;
      }
    }
  }

  class PlasmaBolt {
    constructor(x, y) {
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
      gameDisplay.fillStyle = "yellow";
      gameDisplay.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
      this.x += this.velocity;

      if (this.x > gameAreaCanvas.width * 0.5) {
        this.dissipated = true;
      }
    }
  }

  class Angler {
    constructor() {
      console.log("Angler Target constructed.");

      // Dimensions
      this.width = 45;
      this.height = 34;

      // Location
      this.x = gameAreaCanvas.width;
      this.y = Math.random() * (gameAreaCanvas.height - this.height);

      // State
      this.velocity = 1;

      // Refers to the condition of the target not being engaged with by
      // the player and moving off the edge of the game area.
      this.escaped = false;
    }

    draw() {
      gameDisplay.fillStyle = "red";
      gameDisplay.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
      this.x += -this.velocity;

      if (this.x + this.width < 0) {
        console.log("Bounty target escaped!");

        this.escaped = true;
      }
    }
  }

  const game = new Game();
  game.setup();

  let previousFrameTime = 0;

  function gameLoop(currentFrameTime = 0) {
    const deltaTime = currentFrameTime - previousFrameTime;
    previousFrameTime = currentFrameTime;

    gameDisplay.clearRect(0, 0, gameAreaCanvas.width, gameAreaCanvas.height);

    game.render();
    game.process(deltaTime);

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});
