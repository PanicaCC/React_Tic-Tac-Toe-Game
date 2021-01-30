import React from "react"
import "./square.scss"

const Square = props => {
    return (
        <button
            className="square"
            onClick = { (event) => props.renderValueHandler(event) }
        >
            { props.value }
        </button>
    );
}

export default Square