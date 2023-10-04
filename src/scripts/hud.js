export class HUD {
  constructor(cyberfish) {
    console.log("HUD constructed.");

    this.cyberfish = cyberfish;
  }

  draw(gameDisplay) {
    gameDisplay.fillStyle = "yellow";

    for (let i = 0; i < this.cyberfish.availablePlasmaBolts; i++) {
      const xCoordWithSpacing = 20 + 10 * i;
      gameDisplay.fillRect(xCoordWithSpacing, 50, 3, 20);
    }
  }
}
