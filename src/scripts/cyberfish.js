import { PlasmaBolt } from "./plasmabolt.js";

export class CyberFish {
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
    this.firedPlasmaBolts = [];
    this.availablePlasmaBolts = 20;
    this.plasmaBoltLimit = 20;
    this.boltTimer = 0;
    this.boltInterval = 500;
  }

  fire() {
    if (this.availablePlasmaBolts > 0) {
      this.firedPlasmaBolts.push(new PlasmaBolt(this.game, this.x, this.y));
      this.availablePlasmaBolts--;
    }
  }

  draw(gameDisplay) {
    gameDisplay.fillStyle = "black";
    gameDisplay.fillRect(this.x, this.y, this.width, this.height);

    this.firedPlasmaBolts.forEach((plasma) => {
      plasma.draw(gameDisplay);
    });
  }

  update(deltaTime) {
    this.handleMovement();
    this.handlePlasmaBolts();
    this.handlePlasmaBoltReplenish(deltaTime);
  }

  handleMovement() {
    if (this.game.actions.has("ArrowUp")) {
      this.currentVelocity = -this.maximumVelocity;
    } else if (this.game.actions.has("ArrowDown")) {
      this.currentVelocity = this.maximumVelocity;
    } else {
      this.currentVelocity = 0;
    }

    this.y += this.currentVelocity;

    // Vertical boundaries

    if (this.y > this.game.height - this.height) {
      this.y = this.game.height - this.height;
    } else if (this.y < 0) {
      this.y = 0;
    }
  }

  handlePlasmaBolts() {
    this.firedPlasmaBolts.forEach((plasma) => {
      plasma.update();
    });

    this.firedPlasmaBolts = this.firedPlasmaBolts.filter(
      (plasma) => !plasma.dissipated,
    );

    this.firedPlasmaBolts = this.firedPlasmaBolts.filter(
      (plasma) => !plasma.collided,
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
