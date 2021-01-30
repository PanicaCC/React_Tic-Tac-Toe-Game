import React from "react"
import "./game.scss"
import Board from "../Board/board";

class Game extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            nextPlayer: true
        }
    }

    renderValueHandler = i => {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.nextPlayer ? '✕' : 'O';
        this.setState({
            history: history.concat([{
                squares,
            }]),
            stepNumber: history.length,
            nextPlayer: !this.state.nextPlayer
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner player: ' + winner;
        } else {
            status = 'Next player is: ' + (this.state.nextPlayer ? 'X' : 'O');
        }

        const moves = history.map((step, move) => {
            const desc = move ?
                'Move to step -' + move :
                'Lets start !';
            return (
                <li key={`step-${move}`}>
                    <button
                        onClick={() => this.jumpTo(move)}
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="container">
                    <div className="game-board">
                        <Board
                            squares = { current.squares }
                            renderValueHandler = { this.renderValueHandler }
                        />
                    </div>
                    <div className="game-info">
                        <div className={'status'}>
                            { status }
                        </div>
                        <ul>{ moves }</ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}