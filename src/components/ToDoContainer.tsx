import '../stylesheets/Body.css';
import ToDo, { Task } from './ToDo';

//This type represents the expected properties for the summary section of the component (due to time constraint, total is only used)
export type SummaryProps = {
    tasks_done: number,
    tasks_total: number,
}

/**
 * Renders a ToDo component for every task in the given list of Task objects.
 * @param tasks a list of Task objects
 * @returns a list of ToDo components
 */
function renderRows(tasks: Task[]): JSX.Element[] {
    return (
        tasks.map((task: Task, index: number) => {
            return (
                <ToDo task={task} key={index}></ToDo>
            );
        })
    );
}

/**
 * This functional component represents the main component of the app holding the tasks to be done.
 * @param param0 an object that has SummaryProps and a list of tasks
 * @returns a component with a summary component and displays a list of tasks
 */
function ToDoContainer({ summary, tasks}: { summary: SummaryProps, tasks: Task[]}): JSX.Element {

    //let the content display tasks if the number of tasks > 0, otherwise have some text about the lack of tasks!
    let content = summary.tasks_total > 0 ?
        <div className="to-do-taskboard">
            {renderRows(tasks)}
        </div> :
        <div className="to-do-taskboard empty">
            You don't have any tasks! Visit your Clearblade System to add to the database!
        </div>

    return (
        <div className="to-do-container">
            <div className="to-do-summary">
                <h2>Welcome back!</h2>
                <p>
                    {summary.tasks_total} tasks left
                </p>
                <p>
                    Keep it up!
                </p>
            </div>
            {content}
        </div>
    );
}

export default ToDoContainer;