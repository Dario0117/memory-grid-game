import React, { Component } from 'react'

export default class Col extends Component {

    constructor(props) {
        super(props)

        this.state = {
            color: ''
        }
    }


    handleClick = (val) => {
        if(val !== this.props.rValue){
            this.setState({
                color: this.props.rValue
            })
        }
    }

    render() {
        return (
            <td onClick={() => this.handleClick(this.props.val)} className="cell" bgcolor={this.state.color || this.props.val}>
            </td>
        )
    }
}
