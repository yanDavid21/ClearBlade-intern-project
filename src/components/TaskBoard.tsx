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

/**
 * Renders the task board with the tasks displayed.
 * @param param0 an object with attributes denoting whether the taskboard is displayed and a list of tasks to be displayed
 * @returns a task board containing rendered tasks
 */
export default function TaskBoard({ display, tasks }: { display: Display, tasks: Task[] }): JSX.Element {
    return (
        <div className="to-do-taskboard" style={{
            display: display === Display.TaskBoard ? "inherit" : "none",
            opacity: display === Display.TaskBoard ? 1 : 0
        }}>
            {renderRows(tasks)}
        </div>
    )
}