import React, { useState } from 'react';
import './App.css';

// Constants for players and winning lines
const PLAYER_X = 'X';
const PLAYER_O = 'O';
const EMPTY_BOARD = Array(9).fill(null);
const WINNING_COMBOS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],            // diagonals
];

// Helper function to calculate winner
function calculateWinner(squares) {
  for (let [a, b, c] of WINNING_COMBOS) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

// PUBLIC_INTERFACE
function App() {
  // Game state
  const [squares, setSquares] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);

  // Derived state
  const winner = calculateWinner(squares);
  const isBoardFull = squares.every(Boolean);
  const isDraw = !winner && isBoardFull;
  const currentPlayer = xIsNext ? PLAYER_X : PLAYER_O;

  // PUBLIC_INTERFACE
  const handleClick = idx => {
    if (winner || squares[idx]) return; // Ignore if already filled or game over
    const newSquares = squares.slice();
    newSquares[idx] = currentPlayer;
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  // PUBLIC_INTERFACE: Resets the game state
  const handleRestart = () => {
    setSquares(EMPTY_BOARD);
    setXIsNext(true);
  };

  // PUBLIC_INTERFACE: Renders a game square
  function Square({ value, onClick }) {
    return (
      <button
        className="ttt-square"
        onClick={onClick}
        aria-label={value ? `Cell with ${value}` : "Empty cell"}
      >
        {value}
      </button>
    );
  }

  // PUBLIC_INTERFACE: Renders the player indicators
  function PlayerIndicator({ player, isActive }) {
    return (
      <span
        className={`ttt-player-indicator${isActive ? ' active' : ''}`}
        style={{
          color: isActive ? 'var(--accent)' : 'var(--secondary)',
        }}
      >
        {player}
      </span>
    );
  }

  // PUBLIC_INTERFACE: Render game status message
  function Status() {
    if (winner) return (
      <div className="ttt-status ttt-status-winner">
        <span style={{ color: 'var(--accent)' }}>{winner}</span> wins!
      </div>
    );
    if (isDraw) return <div className="ttt-status ttt-status-draw">It's a draw.</div>;
    return (
      <div className="ttt-status">
        <span style={{ color: 'var(--secondary)' }}>
          Next:
           <b style={{ color: 'var(--primary)', marginLeft: 4 }}>{currentPlayer}</b>
        </span>
      </div>
    );
  }

  // MAIN UI
  return (
    <div className="App ttt-bg">
      <div className="ttt-container">
        <div className="ttt-player-row">
          <PlayerIndicator player={PLAYER_X} isActive={xIsNext && !winner && !isDraw} />
          <span className="ttt-vs">vs</span>
          <PlayerIndicator player={PLAYER_O} isActive={!xIsNext && !winner && !isDraw} />
        </div>
        <div className="ttt-board" role="region" aria-label="Tic Tac Toe board">
          {squares.map((sq, i) => (
            <Square key={i} value={sq} onClick={() => handleClick(i)} />
          ))}
        </div>
        <Status />
        <button className="ttt-reset-btn" onClick={handleRestart}>
          Restart Game
        </button>
      </div>
      <footer className="ttt-footer">
        <span>
          Modern Tic Tac Toe - <a href="https://reactjs.org/" rel="noopener noreferrer" target="_blank">React</a>
        </span>
      </footer>
    </div>
  );
}

export default App;
