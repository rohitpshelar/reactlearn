import React, {useState} from 'react'

// state


export default function Textform(props) {

const handleClick = ()=>{
    console.log("clicked" + olds);
    // news(olds.toLocaleUpperCase);
    // let txt = olds.toUpperCase(); 
    news(olds.toUpperCase());
}

const handleOnchange = (event)=>{
    console.log("clicked2");
    news(event.target.value)
}

    const [olds, news] = useState('Enter text');
  return (
    <div>
        <h1>{props.title} </h1>
        <div className="mb-3">
            <textarea className="form-control" value={olds} onChange={handleOnchange} id="myBox" rows="3"></textarea>
        </div>
        <button className='btn btn-primary' onClick={handleClick}>To Uppercase</button>
  </div>
  )
}
