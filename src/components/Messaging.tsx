import '../stylesheets/Body.css'
import { Display } from './Body'

function submitMessage(e: React.FormEvent<HTMLFormElement>):void {
    e.preventDefault();
}

export default function Messaging({ display }: { display: Display }): JSX.Element {
    return (
        <div style={{
            display: display === Display.Messaging ? "inherit" : "none",
            opacity: display === Display.Messaging ? 1 : 0
        }}
            className="messaging">
            <div className="message-display">

            </div>
            <form className="message-input" onSubmit = {(e) => {submitMessage(e)}}>
                <input type="text" className = "input-field"/>
                <input type="submit" value="Submit" className ="submit-button"/>
            </form>
        </div>
    )
}