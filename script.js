let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = false;
let winner = null;
let player1Name = '';

function startGame(){
    player1Name = document.getElementById('player-name').value;
    player2Name = document.getElementById('player2-name').value;
    if (player1Name === '' || player2Name === ''){
        alert('please enter both players\' names.');
        return;
    }
    gameActive = true;

    document.getElementById('sign-in').style.display = 'none';
    document.getElementById('board').style.display = 'grid';
    document.getElementById('messages').innerHTML = `${player1Name} (X) vs ${player2Name} (O)`;
    updateBoard();
}

function handleMove(cell) {
    const cellIndex =
    parseInt(cell.dataset.index);

    if (board[cellIndex] !== '' || !gameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        gameActive = false;

        document.getElementById('messages').innerHTML =`Winner: ${winner === 'X' ? player1Name : player2Name}`;
    } else if(checkDraw()){
        gameActive = false;

        document.getElementById('messages').innerHTML = 'Draw!';
    } else {
        currentPlayer = currentPlayer === 'X' ?  'O' : 'X';
        document.getElementById('messages').innerHTML = `${currentPlayer === 'X' ? player1Name : player2Name}'s Turn`;
    }
}

function checkWin(){
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]    
    ];

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            winner = board[a];
            return true;
        }
    }
    return false;
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach((cell, index) => {
        cell.textContent = board[index];
    });
}

document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', () => {
        handleMove(cell);
    })
})

document.getElementById('start-game').addEventListener('click', startGame);
