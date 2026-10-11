import React, { useState } from 'react'

export default function Textform(props) {

    const handleClick = () => {
        news(olds.toUpperCase());
    }

    const handleClickLower = () => {
        news(olds.toLowerCase());
    }

    const handleOnchange = (event) => {
        news(event.target.value)
    }

    const [olds, news] = useState('');
    return (<>
        <div className='component'>
            <h1>{props.title} </h1>
            <div className="mb-3">
                <textarea className="form-control" value={olds} onChange={handleOnchange} id="myBox" rows="5"
                    placeholder="Enter text here..."></textarea>
            </div>
            <button className='btn btn-primary' onClick={handleClick}>To Uppercase</button>
            <button className='btn btn-primary m-3' onClick={handleClickLower}>To Lowercase</button>
        </div>
        <div className="component">
            {olds.length > 0 && (
                <span>
                    <h1>
                        Details
                    </h1>
                    <p>{olds.split(" ").length} words and {olds.length} Character</p>
                    <p>{0.008 * olds.split(" ").length} mins Time to read</p>
                </span>
            )}
        </div>
    </>)
}
