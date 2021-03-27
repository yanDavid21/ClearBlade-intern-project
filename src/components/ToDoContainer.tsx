import '../stylesheets/Body.css';
import { Task } from './ToDo';
import { Display } from './Body';
import Messaging from './Messaging';
import TaskBoard from './TaskBoard';
import SummaryPanel, { SummaryProps } from './SummaryPanel';

/**
 * This functional component represents the main component of the app holding the tasks to be done.
 * @param param0 an object that has SummaryProps and a list of tasks
 * @returns a component with a summary component and displays a list of tasks
 */


function ToDoContainer({ summary, tasks, display, setDisplay }: { summary: SummaryProps, tasks: Task[], display: Display, setDisplay: any }): JSX.Element {
    return (
        <div className="to-do-container">
           <SummaryPanel summary= {summary}></SummaryPanel>
            <div className="to-do-body">
                <TaskBoard display={display} tasks={tasks} />
                <Messaging display={display} />
            </div>
        </div>
    );
}

export default ToDoContainer;