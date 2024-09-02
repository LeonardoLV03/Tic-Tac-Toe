document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const newGameButton = document.getElementById('newGame');
    let currentPlayer = 'X';
    let gameState = Array(9).fill(null);
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    function checkWinner() {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                alert(`${gameState[a]} gana!`);
                resetGame();
                return;
            }
        }

        if (!gameState.includes(null)) {
            alert('¡Empate!');
            resetGame();
        }
    }

    function handleClick(event) {
        const index = event.target.getAttribute('data-index');
        if (gameState[index] === null) {
            gameState[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            saveGame(); // Guardar automáticamente después de cada movimiento
            checkWinner();
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }

    function resetGame() {
        gameState = Array(9).fill(null);
        cells.forEach(cell => cell.textContent = '');
        localStorage.removeItem('ticTacToeState');
        localStorage.removeItem('currentPlayer');
    }

    function saveGame() {
        localStorage.setItem('ticTacToeState', JSON.stringify(gameState));
        localStorage.setItem('currentPlayer', currentPlayer);
    }

    function loadGame() {
        const savedState = JSON.parse(localStorage.getItem('ticTacToeState'));
        const savedPlayer = localStorage.getItem('currentPlayer');
        if (savedState && savedPlayer) {
            gameState = savedState;
            currentPlayer = savedPlayer;
            cells.forEach((cell, index) => {
                cell.textContent = gameState[index];
            });
        }
    }

    cells.forEach(cell => cell.addEventListener('click', handleClick));
    newGameButton.addEventListener('click', resetGame);

    // Cargar automáticamente el juego al abrir la página
    loadGame();
});
