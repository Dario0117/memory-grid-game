import React, { Component } from 'react'

export default class Cell extends Component {

    render() {
        return (
            <td id={this.props.id} className="cell" bgcolor={this.props.color}></td>
        )
    }
}
