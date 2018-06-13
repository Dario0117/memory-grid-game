import React, { Component } from 'react';
import Row from './Row';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.grid = new Array(this.props.rows)
            .fill(0)
            .map(el => new Array(this.props.cols).fill(0));
    }

    render() {
        this.grid[4][2] = 1;
        this.grid[4][3] = 1;
        this.grid[4][4] = 1;
        console.log(this.grid);
        return (
            <table>
                <tbody>
                    {this.grid.map((row, idx) => <Row key={idx} row={idx} cols={row} />)}
                </tbody>
            </table>
        )
    }
}
