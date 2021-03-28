import '../stylesheets/Body.css'
import { Display } from './Body'
import { useState } from 'react'

//this type represents a message in a message board
export type Message = {
    sender: string
    body: string
}

/**
 * Sends the message to the platform for the form 'message-input'
 * @param e form event
 */
function submitMessage(e: React.FormEvent<HTMLFormElement>, input: string, setInput: React.Dispatch<React.SetStateAction<string>>):void {
    e.preventDefault();
    console.log(input);
    setInput("");
}

function renderMessages(messages: Message[]):JSX.Element[] {
    let renderedMessages = messages.map((message: Message, index:number):JSX.Element => {
        return <div key={index}>{message.sender}: {message.body} </div>
    })
    return renderedMessages;
}

export default function Messaging({ display, messages}: { display: Display, messages : Message[]}): JSX.Element {
    const [input, setInput] = useState("")


    return (
        <div style={{
            display: display === Display.Messaging ? "inherit" : "none",
            opacity: display === Display.Messaging ? 1 : 0
        }}
            className="messaging">
            <div className="message-display">
                {renderMessages(messages)}
            </div>
            <form className="message-input" onSubmit = {(e) => {submitMessage(e, input, setInput)}}>
                <input type="text" className = "input-field" value = {input} onChange={(e) => setInput(e.target.value)}/>
                <input type="submit" value="Submit" className ="submit-button"/>
                <input type="submit" className="small-submit" value = {""}/>
            </form>
        </div>
    )
}