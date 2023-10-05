export class Angler {
  constructor(game) {
    this.game = game;

    // Dimensions
    this.width = 45;
    this.height = 34;

    // Location
    this.x = this.game.width;
    this.y = Math.random() * (this.game.height - this.height);

    // State
    const velocityRange = -1.5 - 0.5;
    this.velocity = Math.random() * velocityRange;

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
  }

  draw(gameDisplay) {
    gameDisplay.fillStyle = "red";
    gameDisplay.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.x += this.velocity;

    if (this.x + this.width < 0) {
      this.escaped = true;
    }
  }
}
