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
 
    renderSquare(i) {
      return ( 
        <Square 
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)} 
        />
      );
    }
  
    render() {
     // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
  
      return (
        <div>
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
    constructor(props) {
        super(props);  
        this.state = {
             history: [{
            squares: Array(9).fill(null),
            }],
        xIsNext: true,
        gameWon: false
        };
    }
    render() {
        const history = this.state.history;  
        const current = history[history.length-1];  
        const winner = calculateWinner(current.squares);
        const squares = current.squares.slice(); 

        let status;

        if (winner) {
          status = 'Winner: ' + winner;
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
      return (
        <div className="game">
          <div className="game-board">
            <Board 
                squares={current.squares}
                onClick={(i) => this.handleClick(i)} 
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{/* TODO */}</ol>
          </div>
        </div>
      );
    }
    handleClick(i) {
        //alert("You have clicked the board"); 
         const history = this.state.history; 
         const current = history[history.length -1]; 
         const squares = current.squares.slice();
         
         //if the game has not been won and the square is null allow for continued play.
         if(!this.state.gameWon && squares[i] == null) {
          //alert('registering click ' + this.state.xIsNext ? 'X' : 'O'); 
          console.log('registering click ', this.state.xIsNext ? 'X' : 'O', ' \r\n in square ' , i );
          squares[i] = this.state.xIsNext ? 'X' : 'O';  
          let gameWon = calculateWinner(squares);  
          this.setState({
             history: history.concat([{
                 squares: squares
             }]),
             xIsNext: !this.state.xIsNext,
             gameWon: gameWon
         }); 
        }
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
              //return squares[a]; 
              return true; 
          }
      }
      return false;
  }