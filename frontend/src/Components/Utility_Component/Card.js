import React from 'react'
import "./Card.css";
const Card = (props) => {
    return (
        <>
            <div className={`card blue-bg ${props.className}`}>
                <h3 className="title">{props.title}</h3>
                <h3 className="value">{props.value}</h3>
            </div>
        </>
    )
}

export default Card
