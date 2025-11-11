import React, { useState } from 'react'

// state


export default function Textform(props) {

    const handleClick = () => {
        //    console.log("clicked" + olds);
        // news(olds.toLocaleUpperCase);
        // let txt = olds.toUpperCase(); 
        news(olds.toUpperCase());
    }

    const handleClickLower = () => {
        //    console.log("clicked" + olds);
        // news(olds.toLocaleUpperCase);
        // let txt = olds.toUpperCase();
        news(olds.toLowerCase());
    }

    const handleOnchange = (event) => {
        //    console.log("clicked2");
        news(event.target.value)
    }

    const [olds, news] = useState('Enter text');
    return (
        <>
            <div className='component'>
                <h1>{props.title} </h1>
                <div className="mb-3">
                    <textarea className="form-control" value={olds} onChange={handleOnchange} id="myBox" rows="3"></textarea>
                </div>
                <button className='btn btn-primary' onClick={handleClick}>To Uppercase</button>
                <button className='btn btn-primary m-3' onClick={handleClickLower}>To Lowercase</button>
            </div>
            <div className="component">
                <h1>
                    Deatils
                </h1>
                <p>{olds.split(" ").length} words and {olds.length} Character</p>
                <p>{0.008 * olds.split(" ").length} mins Time to read</p>

            </div>
        </>
    )
}
