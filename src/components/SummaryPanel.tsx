import '../stylesheets/Body.css'

//This type represents the expected properties for the summary section of the component (due to time constraint, total is only used)
export type SummaryProps = {
    tasks_done: number,
    tasks_total: number,
}

export default function SummaryPanel({summary}: {summary: SummaryProps}) {
    return (
        <div className="to-do-summary">
                <h2>Welcome back!</h2>
                <div>
                    <button>
                        <span className="summary-message">View your tasks</span> <span className="summary-number"> ({summary.tasks_total})</span>
                    </button>
                    <button>
                        <span className="summary-message">View your messages</span> <span className="summary-number"> (2)</span>
                    </button>
                </div>
            </div>
    )
}