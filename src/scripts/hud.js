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

    if (this.game.won || this.game.loss) {
      this.displayWinLoss(gameDisplay);
    }

    gameDisplay.restore();
  }

  displayWinLoss(gameDisplay) {
    gameDisplay.textAlign = "center";
    gameDisplay.fillStyle = "white";

    let message1;
    let message2;

    if (this.game.bounty > this.game.winningBounty) {
      message1 = "Bounty Collected!";
      message2 = "Well done on the hunt!";
    } else {
      message1 = "Bounty Not Collected!";
      message2 = "Better luck on the next hunt!";
    }

    gameDisplay.font = "50px Helvetica";

    gameDisplay.fillText(
      message1,
      this.game.width * 0.5,
      this.game.height * 0.5 - 40,
    );

    gameDisplay.font = "25px Helvetica";

    gameDisplay.fillText(
      message2,
      this.game.width * 0.5,
      this.game.height * 0.5 + 40,
    );
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
