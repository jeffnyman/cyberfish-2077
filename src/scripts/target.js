export class Target {
  constructor(game) {
    this.game = game;

    // Location
    this.x = this.game.width;

    // State
    this.velocity = Math.random() * -1.5 - 0.5;

    // Refers to the condition of the target not being engaged with by
    // the player and moving off the edge of the game area.
    this.escaped = false;

    // Refers to the condition of the target colliding with the player.
    // This does not count as collecting the bounty.
    this.collided = false;

    // Refers to the condition of the target colliding with a plasma
    // bolt fired by the player.
    this.captured = false;

    this.armor = 5;
    this.bounty = this.armor;

    // Animation
    this.frameX = 0;
    this.frameY = 0;
  }

  draw(gameDisplay) {
    if (this.game.debug) {
      gameDisplay.strokeRect(this.x, this.y, this.width, this.height);
    }

    gameDisplay.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );

    if (this.game.debug) {
      // Bounty Value
      gameDisplay.fillStyle = "cyan";
      gameDisplay.font = "20px Helvetica";
      gameDisplay.fillText(this.armor, this.x, this.y);
    }
  }

  update() {
    this.x += this.velocity;

    if (this.x + this.width < 0) {
      this.escaped = true;
    }

    // Handle animation
    if (this.frameX < this.lastFrame) {
      this.frameX++;
    } else {
      this.frameX = 0;
    }
  }
}
