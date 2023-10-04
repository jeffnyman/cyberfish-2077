export class ActionHandler {
  constructor(game) {
    console.log("Action Handler constructed.");

    this.game = game;
  }

  setup() {
    const movementKeys = ["ArrowUp", "ArrowDown"];
    const SPACEBAR = " ";

    window.addEventListener("keydown", (event) => {
      if (movementKeys.includes(event.key)) {
        this.game.actions.add(event.key);
      }

      if (event.key === SPACEBAR) {
        this.game.cyberfish.fire();
      }
    });

    window.addEventListener("keyup", (event) => {
      if (this.game.actions.has(event.key)) {
        this.game.actions.delete(event.key);
      }
    });
  }
}
