import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//todo - add a button that becomes clickable to clear the board when game state is done or stalemate 
//todo - add text fields to allow for name entry for X and name entry for O


function Square(props) {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
  
  class Board extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { 
            squares: Array(9).fill(null),
            xIsNext: true,
            gameWon: false,
        };  
    
    }
    handleClick(i) {
        //alert("You have clicked the board"); 
         const squares = this.state.squares.slice();  
         if(!this.state.gameWon && squares[i] == null) {
         squares[i] = this.state.xIsNext ? 'X' : 'O';  
            this.setState({
             squares: squares,
             xIsNext: !this.state.xIsNext,
         }); 
        }
    }
    
    renderSquare(i) {
      return ( <Square value={this.state.squares[i]}
      onClick={() => this.handleClick(i)} />);
    }
  
    render() {
     // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
     const winner = calculateWinner(this.state.squares);
     if(winner !== null) {
        this.state.gameWon = true;  
     }
     let status;
     if (winner) {
       status = 'Winner: ' + winner;
     } else {
       status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
     }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }
  
  class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board />
          </div>
          <div className="game-info">
            <div>{/* status */}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
  }
  
  // ========================================
  
  ReactDOM.render(
    <Game />,
    document.getElementById('root')
  );
  
  //TODO: Determine a way for it to calculate and display "stalemate" when all squares are taken up but nobody has won.

  function calculateWinner(squares) {
      const lines = [
          //win all ways across/horizontal
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8], 
          //win all ways vertically
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          //win all ways diagnonally
          [0, 4, 8],
          [2, 4, 6],
      ];
      for(let i=0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a]; 
          }
      }
      return null; 
  }