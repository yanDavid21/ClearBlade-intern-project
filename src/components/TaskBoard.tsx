import '../stylesheets/Body.css';
import { Display } from './Body';
import ToDo, { Task } from './ToDo';


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

export default function TaskBoard({ display, tasks }: { display: Display, tasks: Task[] }):JSX.Element {
    return (
        <div className="to-do-taskboard" style={{ display: display === Display.TaskBoard ? "inherit" : "none" }}>
            {renderRows(tasks)}
        </div> 
    )
}