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
	const [isGameOver, setIsGameOver] = useState(undefined);

	const findWinnerPlayer = (currentPosition) => {
		const winner = winningConditions.reduce(
			(acc, crr) => {
				if (crr.every((item) => currentPosition.X.includes(item))) acc.X = true;
				if (crr.every((item) => currentPosition.Y.includes(item))) acc.Y = true;
				return acc;
			},
			{ X: false, Y: false }
		);

		if (winner.X || winner.Y) setIsGameOver(winner.X ? "X" : "Y");
	};

	const handleTileClick = (index) => {
		const copiedBoard = [...board];
		copiedBoard[index] = isX ? "X" : "Y";

		const currentPosition = copiedBoard.reduce(
			(acc, crr, index) => {
				if (crr === "X") acc.X.push(index);
				if (crr === "Y") acc.Y.push(index);
				return acc;
			},
			{ X: [], Y: [] }
		);

		if (copiedBoard.filter(Boolean).length >= 5) {
			findWinnerPlayer(currentPosition);
		}

		setBoard(copiedBoard);
		setIsX((prevState) => !prevState);
	};
	if (isGameOver) {
		return (
			<div
				className="App"
				style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}
			>
				Gameover - Winner is {isGameOver}
			</div>
		);
	}

	return (
		<div
			className="App"
			style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}
		>
			<div className="grid-container">
				{board.map((item, index) => (
					<div className="grid-item" key={index} onClick={() => handleTileClick(index)}>
						{item}
					</div>
				))}
			</div>
		</div>
	);
}

export default App;
