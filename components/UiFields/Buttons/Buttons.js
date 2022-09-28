import React, {useState} from 'react'

const Buttons = ({ type, title, active, isActive}) => {

    return (
        <div className={`button-wrap ${active? 'active': ''}`}>
            <button type={type} onClick={isActive} >{title}</button>
        </div>
    )
}

export default Buttons
