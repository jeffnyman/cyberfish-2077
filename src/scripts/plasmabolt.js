export class PlasmaBolt {
  constructor(game, x, y) {
    this.game = game;

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

    // Refers to the condition of the bolt hitting a bounty target.
    this.collided = false;
  }

  draw(gameDisplay) {
    gameDisplay.fillStyle = "yellow";
    gameDisplay.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x += this.velocity;

    if (this.x > this.game.width * 0.5) {
      this.dissipated = true;
    }
  }
}
