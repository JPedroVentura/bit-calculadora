import React from "react";
import './Button.css';


export default function Button(props) {
    let buttonClasses = 'button ';
    buttonClasses += props.operation ? 'operation' : '';
    buttonClasses += props.double ? 'double' : '';
    buttonClasses += props.triple ? 'triple' : '';

    return (
        <button className={buttonClasses}  onClick = {event => props.click && props.click(event.target.innerHTML)}>
            {props.lable}
        </button>
    )
}