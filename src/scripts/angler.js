export class Angler {
  constructor(game) {
    this.game = game;

    // Dimensions
    this.width = 228;
    this.height = 169;

    // Location
    this.x = this.game.width;
    this.y = Math.random() * (this.game.height - this.height);

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

    // Representation

    this.image = document.getElementById("angler");
  }

  draw(gameDisplay) {
    gameDisplay.drawImage(
      this.image,
      this.width,
      this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );

    // Bounty Value
    gameDisplay.fillStyle = "cyan";
    gameDisplay.font = "20px Helvetica";
    gameDisplay.fillText(this.armor, this.x, this.y);
  }

  update() {
    this.x += this.velocity;

    if (this.x + this.width < 0) {
      this.escaped = true;
    }
  }
}
