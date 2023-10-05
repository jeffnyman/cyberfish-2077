export class HUD {
  constructor(game) {
    console.log("HUD constructed.");

    this.game = game;
  }

  draw(gameDisplay) {
    gameDisplay.save();

    gameDisplay.shadowOffsetX = 2;
    gameDisplay.shadowOffsetY = 2;
    gameDisplay.shadowColor = "black";
    gameDisplay.font = "25px Helvetica";

    this.displayBounty(gameDisplay);
    this.displayPlasmaBolts(gameDisplay);
    this.displayTimer(gameDisplay);

    gameDisplay.restore();
  }

  displayBounty(gameDisplay) {
    gameDisplay.fillStyle = "white";

    gameDisplay.fillText("Bounty: " + this.game.bounty, 20, 40);
  }

  displayPlasmaBolts(gameDisplay) {
    gameDisplay.fillStyle = "yellow";

    for (let i = 0; i < this.game.cyberfish.availablePlasmaBolts; i++) {
      const xCoordWithSpacing = 20 + 10 * i;
      gameDisplay.fillRect(xCoordWithSpacing, 50, 3, 20);
    }
  }

  displayTimer(gameDisplay) {
    const formattedTime = (this.game.huntTime * 0.001).toFixed(1);

    gameDisplay.fillStyle = "white";
    gameDisplay.fillText("Hunt Timer: " + formattedTime, 20, 100);
  }
}
