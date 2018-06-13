import React, { Component } from 'react'

export default class Col extends Component {

    handleClick = (val) => {
        console.log('Click en:', val);
    }

    render() {
        return (
            <td onClick={() => this.handleClick(this.props.val)} className="cell" bgcolor={this.props.val}>
            </td>
        )
    }
}
