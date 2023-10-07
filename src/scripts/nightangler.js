import { Target } from "./target.js";

export class NightAngler extends Target {
  constructor(game) {
    super(game);

    // Dimensions
    this.width = 213;
    this.height = 165;

    // Location
    this.y = Math.random() * (this.game.height - this.height);

    // Animation
    this.frameY = Math.floor(Math.random() * 2);
    this.lastFrame = 37;

    // Representation
    this.image = document.getElementById("nightangler");
  }
}
