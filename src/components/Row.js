import React, { Component } from 'react';

export default class Row extends Component {
    render() {
        return (
            <tr>{this.props.children}</tr>
        )
    }
}
