import AddressContainer from "./addressCheck"
import React, { useRef } from "react"

export default function DialogueBox({children}) {
    const divRefs = useRef([]);
    return (
        <>
            <div className="dialogueBackgroundCover"></div>
            <div className='DialogueBox'>               
                <div className="DialogueBoxHeading"></div>
                {React.Children.map(children, (child, index) => (
                <div className='DialogueHolder' ref={el => divRefs.current[index] = el}>{child}</div>
                 ))}
                <div className="DialogueBoxBottom"></div>
            </div>
        </>     
    )
}