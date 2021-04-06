//create an array to store player input as indexes

//game grid indexes:
//it starts with 0 as in arrays starts from index 0
// 0 | 1 | 2
// 3 | 4 | 5
// 6 | 7 | 8

let play_board = ["", "", "", "", "", "", "", "", ""];
// create players
const player = "O";
const computer = "X";

//create a function to render the board on the DOM. || render_board()
const board_container = document.querySelector(".game-grid");

//create a winner function to render the winner on the DOM
const winner_statement = document.getElementById("winner");

const render_board = () => {
	board_container.innerHTML = "";

	play_board.forEach((e, i) => {
		board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${play_board[i]}</div>`;
		if (e == player || e == computer) {
			document.querySelector(`#block_${i}`).classList.add("occupied");
		}
	});
};

//adding player move.
const addPlayerMove = (element) => {
	if (!isBoardFull && play_board[element] === "") {
		// assign the value of the player in our Array
		play_board[element] = player;
		//re-rendering the board with the updated inputs.
		game_loop();
		//function that will execute the computer's move
		addComputerMove();
	}
};

//function will make a random move as first implementation.
const addComputerMove = () => {
	if (!isBoardFull) {
		do {
			selected = Math.floor(Math.random() * 9);
		} while (play_board[selected] !== "");
		//update the value of that input in our array
		play_board[selected] = computer;
		//re-rendering the board with updated values
		game_loop();
	}
};

//fixing the computer moves || infinite looping even if the board is full.
let isBoardFull = false;

const check_board_complete = () => {
	let flag = true;
	play_board.forEach((element) => {
		if (element != player && element != computer) {
			flag = false;
		}
	});
	isBoardFull = flag;
};

//staying dry and invoking one function at once rather than invoking the re-rendering at after every function.
const game_loop = () => {
	render_board();
	check_board_complete();
};

//create reset function. once clicked it will reset the game board or refreshes the page to clear the game submission at least

const reset_board = () => {
	play_board = ["", "", "", "", "", "", "", "", ""];
	isBoardFull = false;
	render_board();
};
render_board();
