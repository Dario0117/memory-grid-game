import React, { Component } from 'react';
import Cell from './Cell';

export default class Row extends Component {
    render() {
        return (
            <tr>
                {this.props.cols.map((el, idx) => <Cell key={`${this.props.rowId}${idx}`} val={el || '#f8f8f8'}/>)}
            </tr>
        )
    }
}
