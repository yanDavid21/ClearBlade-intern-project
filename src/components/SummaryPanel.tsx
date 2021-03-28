import '../stylesheets/Body.css'
import { Display } from './Body';

//This type represents the expected properties for the summary section of the component (due to time constraint, total is only used)
export type SummaryProps = {
    tasks_done: number,
    tasks_total: number,
    messages: number
}

export default function SummaryPanel({summary, setDisplay}: {summary: SummaryProps, setDisplay:React.Dispatch<React.SetStateAction<Display>>}): JSX.Element {
    return (
        <div className="to-do-summary">
                <h2>Welcome back!</h2>
                <div>
                    <button onClick={() => {setDisplay(Display.TaskBoard)}}>
                        <span className="summary-message">View your tasks</span> <span className="summary-number"> ({summary.tasks_total})</span>
                    </button>
                    <button onClick={() => {setDisplay(Display.Messaging)}}>
                        <span className="summary-message">View your messages</span> <span className="summary-number"> ({summary.messages})</span>
                    </button>
                </div>
            </div>
    )
}