import React, { Component } from 'react';
import './styles.css';
import Row from './Row';
import Cell from './Cell';

export default class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            mode: 'start',
            message: 'Get ready...'
        }

        this.attempts = 2;
        this.remaningCells = this.props.maxPairs;

        this.grid = new Array(this.props.rows)
            .fill(0)
            .map(el => new Array(this.props.cols).fill(0));
        this.realGrid = new Array(this.props.rows)
            .fill(0)
            .map(el => new Array(this.props.cols).fill(0));
    }

    generateColors = () => {
        let availablePositions = this.grid.reduce((acc, val, idx) => acc.concat(val.map((e, i) => `${idx}${i}`)), []);
        for (let pair = 0; pair < this.props.maxPairs; pair++) {
            // let color = this.getRandomColor();
            // for(let i = 0; i < 2; i++){
            let re = this.randomElement(availablePositions);
            let p = re.element.split('');
            this.grid[+p[0]][+p[1]] = 'green';
            this.realGrid[+p[0]][+p[1]] = 'green';
            availablePositions.splice(re.index, 1);
            // }
        }
        this.setState({
            mode: 'memorize',
            message: 'Memorize...'
        });
    }

    getRandomColor = () => {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    randomElement = array => {
        let random = Math.floor(Math.random() * array.length)
        return {
            element: array[random],
            index: random
        };
    }

    hideAllColors = () => {
        for (let row = 0; row < this.props.rows; row++) {
            for (let col = 0; col < this.grid[row].length; col++) {
                this.grid[row][col] = 'grey';
            }
        }
    }

    handleCellclick = (e) => {
        let isTD = e.target.tagName === 'TD';
        if (!isTD) {
            return;
        }

        let [row, col] = e.target.id.split('');
        let isOnRecall = this.state.mode === 'recall';
        let isGreen = this.realGrid[+row][+col] === 'green';
        let isRed = this.grid[+row][+col] === 'red';
        let isNowGreen = this.grid[+row][+col] === 'green';

        if (isOnRecall) {
            if (!isGreen && !isRed) {
                this.grid[+row][+col] = 'red';
                this.attempts--;
            } else if (!isNowGreen && !isRed) {
                this.grid[+row][+col] = 'green';
                this.remaningCells--;
            }
            this.forceUpdate();
            this.checkGameStatus();
        }
    }

    checkGameStatus = () => {
        if (this.attempts === 0) {
            this.setState({
                mode: 'loose',
                message: 'You loose :c'
            });
        }
        if (this.remaningCells === 0) {
            this.setState({
                mode: 'win',
                message: 'You win!!!!'
            });
        }
    }

    resetGame = () => {
        this.attempts = 2;
        this.remaningCells = this.props.maxPairs;
        this.setState({
            mode: 'start',
            message: 'Get ready...'
        });
    }

    render() {
        let retry = null;
        switch (this.state.mode) {
            case 'start':
                this.hideAllColors();
                setTimeout(this.generateColors, 2000);
                break;
            case 'memorize':
                setTimeout(() => {
                    this.hideAllColors();
                    this.setState({
                        mode: 'recall',
                        message: 'Recall!!!'
                    });
                }, 5000);
                break;
            case 'win':
            case 'loose':
                retry = <button onClick={this.resetGame}>Play again?</button>;
                break;
            default:
                break;
        }
        return (
            <center>
                <table onClick={this.handleCellclick}>
                    <tbody>
                        {this.grid.map((row, irow) => {
                            return (<Row key={irow}>
                                {row.map((cell, icell) => {
                                    return (
                                        <Cell
                                            key={`${irow}${icell}`}
                                            id={`${irow}${icell}`}
                                            color={this.grid[irow][icell]}
                                        />)
                                })}
                            </Row>)
                        })}
                    </tbody>
                </table>
                <h2>{this.state.message}</h2>
                <p>Remaining cells: {this.remaningCells} | Remaining attempts: {this.attempts}</p>
                {retry}
            </center>
        )
    }
}
