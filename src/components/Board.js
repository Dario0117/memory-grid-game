import React, { Component } from 'react';
import Row from './Row';

export default class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            attempts: 2,
            mode: 'start',
            message: 'Get ready...'
        }

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

    render() {
        if (this.state.mode === 'start') {
            this.hideAllColors();
            setTimeout(this.generateColors, 2000);
        } else if (this.state.mode === 'memorize') {
            setTimeout(() => {
                this.hideAllColors();
                this.setState({
                    mode: 'recall',
                    message: 'Recall!!!'
                });
            }, 5000);
        }
        return (
            <center>
                <table>
                    <tbody>
                        {
                            this.grid
                                .map((row, idx) =>
                                    <Row
                                        key={idx}
                                        rowId={idx}
                                        cols={row}
                                        rCols={this.realGrid[idx]}
                                    />
                                )
                        }
                    </tbody>
                </table>
                <h1>{this.state.message}</h1>
            </center>
        )
    }
}
