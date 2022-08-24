import React, { useState } from 'react'


export default function TextForm1(props) {
    const handleUpClick = ()=>{
        console.log('Uppercase was clicked' + text)
        let newText = text.toUpperCase(); 
        setText(newText)
    }
    const handleLoClick = ()=>{
        console.log('Uppercase was clicked' + text)
        let newText = text.toLowerCase(); 
        setText(newText)
    }
    const handleOnChange = (event)=>{
        console.log('Onchange')
        setText(event.target.value)

    }
    
    const [text, setText] = useState('Enter text here2');
    // # Introducing Hook from this data come 
    // setText('sdfdagfggf')

    return (
        <>
        <div className='container'>
            <div className="mb-3">
                <h1>{props.heading}</h1>
                <textarea type="text" className="form-control" value ={text} onChange = {handleOnChange}  id="myBox"  placeholder="Enter your text here" />
            <button className="btn btn-primary my-2 mx-2" onClick={handleUpClick}>Convert to upper case</button>
            <button className="btn btn-primary my-2" onClick={handleLoClick}>Convert to upper case</button>
            </div>
        </div>
        <div className="container my-2">
            <h1>Your Text Summary</h1>
            <p>{text.split(' ').length} Words, {text.length} charectors</p>
            <p>{0.008 *text.split(' ').length} Minutes read</p>
            <h2>Preview</h2>
            <p>{text}</p>
        </div>
        </>
    )
}
