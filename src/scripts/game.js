import { CollisionManager } from "./collisionmanager.js";
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

      if (CollisionManager.checkCollision(this.cyberfish, target)) {
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
}
