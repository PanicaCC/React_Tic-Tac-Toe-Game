import React from "react"
import "./game.scss"
import Board from "../Board/board";

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="container">
                    <div className="game-board">
                        <Board />
                    </div>
                    <div className="game-info">
                        <div>{/* status */}</div>
                        <ol>{/* TODO */}</ol>
                    </div>
                </div>
            </div>
        );
    }
}

export default Game