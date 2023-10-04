import { Game } from "./game.js";

window.addEventListener("load", () => {
  const gameAreaCanvas = document.getElementById("game");
  const gameDisplay = gameAreaCanvas.getContext("2d");

  gameAreaCanvas.width = 500;
  gameAreaCanvas.height = 500;

  const game = new Game(gameAreaCanvas.width, gameAreaCanvas.height);
  game.setup();

  let previousFrameTime = 0;

  function gameLoop(currentFrameTime = 0) {
    const deltaTime = currentFrameTime - previousFrameTime;
    previousFrameTime = currentFrameTime;

    gameDisplay.clearRect(0, 0, gameAreaCanvas.width, gameAreaCanvas.height);

    game.render(gameDisplay);
    game.process(deltaTime);

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});
