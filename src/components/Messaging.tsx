import '../stylesheets/Body.css'
import { Display } from './Body'

export default function Messaging({display}: {display: Display}) {
    return (
        <div style={{ display: display === Display.Messaging ? "inherit" : "none" }}>

        </div>
    )
}