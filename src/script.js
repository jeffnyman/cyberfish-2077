window.addEventListener("load", () => {
  const gameAreaCanvas = document.getElementById("game");

  gameAreaCanvas.width = 500;
  gameAreaCanvas.height = 500;

  class Game {
    constructor() {
      console.log("Game constructed.");
    }
  }

  const game = new Game();
});
