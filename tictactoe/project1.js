const WinConditions = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let gameBoard = ['', '', '', '', '', '', '', '', '']; 
let currentPlayer = "X"; 
let gameOn = true;
let gameMode = "player";
let isFirstGame = true; 

const statDis = document.getElementById("message");
const cells = document.querySelectorAll(".cell");
const PlayAgainBtn = document.getElementById("reset");
const friendOrCom = document.getElementById("mode");

const checkWinner = () => {
    for (let i = 0; i < WinConditions.length; i++) {
        const WinTrio = WinConditions[i];
        const [a, b, c] = WinTrio;
        if (gameBoard[a] !== '' && 
            gameBoard[a] === gameBoard[b] && 
            gameBoard[a] === gameBoard[c]) {
            return WinTrio; 
        }
    }
    return null;
};
const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameOn = true;
    currentPlayer = 'X';
    
    cells.forEach(cell => {
        cell.innerHTML = '';
        cell.classList.remove('win-cell'); 
    });
    statDis.style.color = " rgb(114, 53, 4)"; 
    
    statDis.innerHTML =` is the turn of ${currentPlayer}`;

    if (isFirstGame) {
        PlayAgainBtn.innerHTML = "play again ";
        isFirstGame = false;
    }
};

const ComputerMoveFun = () => {
    const emptyIndices = gameBoard.reduce((acc, cell, index) => {
        if (cell === '') {
            acc.push(index);
        }
        return acc;
    }, []);

    if (emptyIndices.length > 0 && gameOn) {
        const randomIndex = Math.floor(Math.random() * emptyIndices.length);
        const computerMoveIndex = emptyIndices[randomIndex];
        const cellElement = cells[computerMoveIndex]; 
        
        setTimeout(() => {
            updateCell(cellElement, computerMoveIndex);
        }, 500); 
    }
};
const updateCell = (cell, index) => {
    if (!gameOn || gameBoard[index] !== '') {
        alert("Sorry the slot that you pressed already used");
        return;
    }
    
    gameBoard[index] = currentPlayer;
    cell.innerHTML = currentPlayer;
 
    const WinTrio = checkWinner(); 

    if (WinTrio) { 
        gameOn = false;
        const [a, b, c] = WinTrio;
        cells[a].classList.add('win-cell');
        cells[b].classList.add('win-cell');
        cells[c].classList.add('win-cell');

        if (gameMode === 'computer') {
           
            if (currentPlayer === 'O') {
                statDis.innerHTML = "YOU LOSE!!! 👎"; 
                statDis.style.color = "#ff0800"; 
                statDis.style.fontWeight="bold"
            } else {
                statDis.innerHTML = "YOU WIN!!! 👍"; 
                statDis.style.color = "green";
                statDis.style.fontWeight="bold"
            }
        } else {
          
            statDis.innerHTML = `the player of ${currentPlayer} win 🏆`;
            statDis.style.color = " rgb(114, 53, 4)";
        }
        return;
    }

    if (!gameBoard.includes('')) {
        statDis.innerHTML = "well done is a tie!!! 🤝";
        statDis.style.color = "#000000ff"; 
        gameOn = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statDis.innerHTML =` is the turn of  ${currentPlayer}`;

    if (gameMode === 'computer' && currentPlayer === 'O' && gameOn) {
       ComputerMoveFun();
    }
};

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        updateCell(cell, index);
    });
});

PlayAgainBtn.addEventListener('click', resetGame);

friendOrCom.addEventListener('change', (e) => {
    if (e.target.name === 'game-mode') {
        gameMode = e.target.value;
        resetGame(); 
        if (gameMode === 'computer' && currentPlayer === 'O') {
            ComputerMoveFun();
       }
    }
});

