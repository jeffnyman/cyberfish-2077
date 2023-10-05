import { ActionHandler } from "./actionhandler.js";
import { CyberFish } from "./cyberfish.js";
import { Angler } from "./angler.js";
import { HUD } from "./hud.js";

export class Game {
  constructor(width, height) {
    console.log("Game constructed.");

    this.width = width;
    this.height = height;

    // Keeps track of all actions (key press events) from the player.
    this.actions = new Set();

    // Keeps track of all active bounty targets.
    this.targets = [];

    this.targetTimer = 0;
    this.targetInterval = 1000;
  }

  setup() {
    this.cyberfish = new CyberFish(this);
    this.actionHandler = new ActionHandler(this);
    this.actionHandler.setup();
    this.hud = new HUD(this.cyberfish);
  }

  render(gameDisplay) {
    this.cyberfish.draw(gameDisplay);
    this.hud.draw(gameDisplay);

    this.targets.forEach((target) => {
      target.draw(gameDisplay);
    });
  }

  process(deltaTime) {
    this.cyberfish.update(deltaTime);

    this.targets.forEach((target) => {
      target.update();

      if (this.checkCollision(this.cyberfish, target)) {
        target.collided = true;
      }
    });

    this.targets = this.targets.filter((target) => !target.escaped);
    this.targets = this.targets.filter((target) => !target.collided);

    if (this.targetTimer > this.targetInterval) {
      this.addTarget();
      this.targetTimer = 0;
    } else {
      this.targetTimer += deltaTime;
    }
  }

  addTarget() {
    this.targets.push(new Angler(this));
  }

  checkCollision(rect1, rect2) {
    return (
      this.isLeftOf(rect1, rect2) &&
      this.isRightOf(rect1, rect2) &&
      this.isAbove(rect1, rect2) &&
      this.isBelow(rect1, rect2)
    );
  }

  isLeftOf(rect1, rect2) {
    // Horizontal Axis Check
    // Check if the left side of rect1 is to the left of
    // the right side of rect2.
    return rect1.x < rect2.x + rect2.width;
  }

  isRightOf(rect1, rect2) {
    // Horizontal Axis Check
    // Check if the right side of rect1 is to the right of
    // the left side of rect2.
    return rect1.x + rect1.width > rect2.x;
  }

  isAbove(rect1, rect2) {
    // Vertical Axis Check
    // Check if the top side of rect1 is above the bottom
    // side of rect2.
    return rect1.y < rect2.y + rect2.height;
  }

  isBelow(rect1, rect2) {
    // Vertical Axis Check
    // Check if the bottom side of rect1 is below the top
    // side of rect2.
    return rect1.y + rect1.height > rect2.y;
  }
}
