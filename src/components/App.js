import React, { Component } from 'react';
import Row from './Row';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.grid = new Array(this.props.rows)
            .fill(0)
            .map(el => new Array(this.props.cols).fill(0));
    }

    generateColors = () => {
        let avalidablePositions = this.grid.reduce((acc, val, idx) => acc.concat(val.map((e, i) => `${idx}${i}`)), []);
        for (let pair = 0; pair < this.props.maxPairs; pair++) {
            let color = this.getRandomColor();
            for(let i = 0; i < 2; i++){
                let re = this.randomElement(avalidablePositions);
                let p = re.element.split('');
                this.grid[+p[0]][+p[1]] = color;
                avalidablePositions.splice(re.index, 1);
            }
        }
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

    render() {
        this.generateColors();
        return (
            <table>
                <tbody>
                    {this.grid.map((row, idx) => <Row key={idx} rowId={idx} cols={row} />)}
                </tbody>
            </table>
        )
    }
}
