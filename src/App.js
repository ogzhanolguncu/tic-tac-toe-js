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

	
	const cols = Array.from(document.querySelectorAll('.grid-item'));
	console.log(cols);
	
	function cmp(a, b, c) {
		if(a && b && c)
		  return (a === b) && (a === c) && (b === c)
	  }
	  
		for (let i = 0; i < winningConditions.length; i++) {
			let [a, b, c] = winningConditions[i] 
			if(cmp(Array[a], Array[b], Array[c])){
			  
			   cols[a].classList.add('win')
			   cols[b].classList.add('win')
			   cols[c].classList.add('win')
			}
			
		 
		}
	const findWinnerPlayer = (currentPosition) => {
		
		const winner = winningConditions.reduce(
			(acc, crr) => {
				if (crr.every((item) => currentPosition.X.includes(item))) acc.X = true;
				if (crr.every((item) => currentPosition.O.includes(item))) acc.O = true;
				return acc;
			},
			{ X: false, O: false }
			
		);
		
		if (winner.X || winner.O){
			setIsGameOver(winner.X ? "X" : "O");
		}
		else{
			setIsGameOver("berabere")
		}
		
	};
	
	
	
	
	if(isGameOver){
		document.querySelector(".tabel").style.backgroundColor ="red";
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
		document.querySelector(".tabel").style.backgroundColor ="#76AFD6";
	  }

	return (
		<div>
			<body class="w-screen h-screen ctr">
  <div class="tabel ctr">
    <div class="board">{board.map((item, index) => (
					<div className="grid-item" key={index} onClick={() => handleTileClick(index)}>
						{item}
					</div>
				))}</div>
    <button id="reset"  onClick={() => handleReset()}>Reset</button>
	<div
				className="App"
				style={{ display: "flex", height: "100vh", justifyContent: "center", alignItems: "center" }}
			>
			 Winner is {isGameOver}
       
			</div>
  </div>
  
</body>
		</div>
	);
	}

export default App;
