import React from 'react'
import "./Card.css";
const Card = (props) => {
    return (
        <>
            <div className={`card blue-bg ${props.className}`}>
                <h2 className="title">{props.title}</h2>
                <h4 className="value">{props.value}</h4>
            </div>
        </>
    )
}

export default Card
