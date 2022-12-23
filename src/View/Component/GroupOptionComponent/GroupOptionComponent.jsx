import React from 'react'
import "./GroupOptionComponent.css"

function GroupOptionComponent(props) {
  return (
    <div className='group-option-container'>
        <div className="group-option-title">
            <p><b>{props.group.groupName}</b></p>
            {props.group.isRequired ? <p>Required <span>• Select 1</span></p> : <p>Optional</p>}
        </div>
        {
            props.group.options.map((option) => 
                <div className="option-container">
                    <p>{option.optionName}</p>
                    <div className="option-container-left">
                        <p>{option.optionPrice != 0 ? "+ IDR. " + option.optionPrice : "Free"}</p>
                        <input type="radio" name={props.group.groupName} value={props.group.groupName}/>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default GroupOptionComponent