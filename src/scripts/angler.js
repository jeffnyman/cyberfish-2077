import { Target } from "./target.js";

export class Angler extends Target {
  constructor(game) {
    super(game);

    // Dimensions
    this.width = 228;
    this.height = 169;

    // Location
    this.y = Math.random() * (this.game.height - this.height);

    // Animation
    this.frameY = Math.floor(Math.random() * 3);
    this.lastFrame = 37;

    // Representation
    this.image = document.getElementById("angler");
  }
}
