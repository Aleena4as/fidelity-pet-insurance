import React, {useState} from 'react'

const ButtonSwitch = ({ title1, title2 }) => {
    
    const [buttonState, setButtonState] = useState({ option1: true, option2: false });
    const { option1, option2 } = buttonState;
    return (
        <div className="switchButton">
            <div className={`switchButton-btn ${option1 ? "btn-active":''}`}
                onClick={() => setButtonState({ option1: true, option2: false })}
            >
                {title1}
            </div>
            <div className={`switchButton-btn ${option2 ? "btn-active":''}`}
                onClick={() => setButtonState({ option1: false, option2: true })}
                 >
                {title2}
            </div>
        </div>
    )
}

export default ButtonSwitch
