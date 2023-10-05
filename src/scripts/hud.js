export class HUD {
  constructor(game) {
    console.log("HUD constructed.");

    this.game = game;
  }

  draw(gameDisplay) {
    gameDisplay.fillStyle = "yellow";

    // Display bounty

    gameDisplay.font = "25px Helvetica";
    gameDisplay.fillText("Bounty: " + this.game.bounty, 20, 40);

    // Display plasma bolts

    for (let i = 0; i < this.game.cyberfish.availablePlasmaBolts; i++) {
      const xCoordWithSpacing = 20 + 10 * i;
      gameDisplay.fillRect(xCoordWithSpacing, 50, 3, 20);
    }
  }
}
