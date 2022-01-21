import { useState } from "react";
import "./App.css";
import { winningConditions } from "./utils";

//TODO: RESET GAME
//TODO: USER CANNOT CLICK THE SAME SPOT
//TODO: OPTIMIZE currentPosition reduce for the winning condition
//TODO: IMPROVE DESIGN
//TODO: ADD ANIMATION
//TODO: SHIP THIS TO VERCEL
//TODO: ADD MINIMAX ALGO

function App() {
  const [board, setBoard] = useState(new Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const [reset, setReset] = useState(false);
  const [isGameOver, setIsGameOver] = useState(undefined);

  const cols = Array.from(document.querySelectorAll(".grid-item"));
  const colorizeSelectedBoxes = (winner, ...args) =>
    args[0][winner].forEach((item) => cols[item].classList.add("win"));

  const findWinnerPlayer = (currentPosition) => {
    const winner = winningConditions.reduce(
      (acc, crr) => {
        if (crr.every((item) => currentPosition.X.includes(item))) {
          acc.X = true;
          acc.XMoves = currentPosition;
        }
        if (crr.every((item) => currentPosition.O.includes(item))) {
          acc.O = true;
          acc.OMoves = currentPosition;
        }
        return acc;
      },
      { X: false, O: false }
    );

    const isWinnerX = winner.X ? "X" : "O";
    console.log(isWinnerX, winner);
    if (winner.X || winner.O) {
      colorizeSelectedBoxes(isWinnerX, currentPosition);
      setIsGameOver(isWinnerX);
    }
    console.log({
      board,
      draw: !winner.X && !winner.O && board.length === 9,
    });
    if (!winner.X && !winner.O && board.filter(Boolean).length === 9) {
      setIsGameOver("berabere");
    }
  };

  if (isGameOver) {
    document.querySelector(".tabel").style.backgroundColor = "red";
  }

  const handleTileClick = (index) => {
    if (reset || isGameOver || board[index]) return;
    const copiedBoard = [...board];
    copiedBoard[index] = isX ? "X" : "O";

    const currentPosition = copiedBoard.reduce(
      (acc, crr, index) => {
        if (crr === "X") acc.X.push(index);
        if (crr === "O") acc.O.push(index);
        return acc;
      },
      { X: [], O: [] }
    );

    if (copiedBoard.filter(Boolean).length >= 5) {
      findWinnerPlayer(currentPosition);
    }

    setBoard(copiedBoard);
    setIsX((prevState) => !prevState);
  };

  const handleReset = () => {
    setIsGameOver(undefined);
    setIsX(true);
    setBoard(Array(9).fill(null));
    setReset(false);
    document.querySelector(".tabel").style.backgroundColor = "#76AFD6";
  };

  return (
    <div>
      <body class="w-screen h-screen ctr">
        <div class="tabel ctr">
          <div class="board">
            {board.map((item, index) => (
              <div
                className="grid-item"
                key={index}
                onClick={() => handleTileClick(index)}
              >
                {item}
              </div>
            ))}
          </div>
          <button id="reset" onClick={() => handleReset()}>
            Reset
          </button>
          {isGameOver && (
            <div
              className="App"
              style={{
                display: "flex",
                height: "100vh",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Winner is {isGameOver}
            </div>
          )}
        </div>
      </body>
    </div>
  );
}

export default App;
