import React, { Component } from 'react';
import Board from './Board';

export default class Game extends Component {
    
    constructor(props) {
        super(props);

        this.minValues = {
            rows: 3,
            cols: 3
        };

        this.state = {
            showGameConfig: true,
            rows: 5,
            cols: 10,
            recallCells: 10,
            attempts: 2,
            message: null
        }
    }

    showReconfigureGame = () => {
        this.setState({
            showGameConfig: true
        });
    }

    hideReconfigureGame = () => {
        this.setState({
            showGameConfig: false
        });
    }

    handleFormChange = e => {

        e.preventDefault();
        let { name, value } = e.target;
        let message = '';
        let recallCells = this.state.recallCells;
        let maxRecallCells = 0;
        switch (name) {
            case 'cols':
                maxRecallCells = ((this.state.rows * value) - 3);
                break;
            case 'rows':
                maxRecallCells = ((this.state.cols * value) - 3);
                break;
            default:
                maxRecallCells = ((this.state.rows * this.state.cols) - 3);
                break;
        }
        switch (name) {
            case 'cols':
            case 'rows':
                if (value < this.minValues[name]) {
                    message = `Can't start the game with ${value} ${name}`;
                } else {
                    this.setState({
                        [name]: Number(value)
                    });
                    if (this.state.recallCells > maxRecallCells) {
                        recallCells = maxRecallCells;
                    }
                }
                break;
            case 'recallCells':
                if (value > maxRecallCells) {
                    message = `The number of recall cells can't be greater than ${maxRecallCells}`;
                }else {
                    recallCells = value;
                }
                break;
            default:
                return;
        }

        this.setState({
            message,
            recallCells
        });
    }

    handleFormSubmit = e => {
        this.hideReconfigureGame();
        e.preventDefault();
    }

    render() {
        if (this.state.showGameConfig) {
            return (
                <div>
                    <h1>Memory Grid Game</h1>
                    <form onSubmit={this.handleFormSubmit}>
                        <label htmlFor="rows">Rows:
                            <input
                                type="number"
                                name="rows"
                                id="rows"
                                value={this.state.rows}
                                onChange={this.handleFormChange}
                                required
                            />
                        </label>
                        <br />
                        <label htmlFor="cols">Cols:
                            <input
                                type="number"
                                name="cols"
                                id="cols"
                                value={this.state.cols}
                                onChange={this.handleFormChange}
                                required
                            />
                        </label>
                        <br />
                        <label htmlFor="recallCells">Recall cells:
                            <input
                                type="number"
                                name="recallCells"
                                id="recallCells"
                                value={this.state.recallCells}
                                onChange={this.handleFormChange}
                                required
                            />
                        </label>
                        <br />
                        <input type="submit" value="Start game!" />
                    </form>
                    <h2>{this.state.message}</h2>
                </div>
            )
        } else {
            return (
                <Board
                    rows={this.state.rows}
                    cols={this.state.cols}
                    recallCells={this.state.recallCells}
                    attempts={this.state.attempts}
                    reconfigure={this.showReconfigureGame}
                />
            )
        }
    }
}
