import '../stylesheets/Body.css';
import { Task } from './ToDo';
import { Display } from './Body';
import Messaging from './Messaging';
import TaskBoard from './TaskBoard';
import SummaryPanel, { SummaryProps } from './SummaryPanel';
import { Message } from './Messaging'

/**
 * This functional component represents the main component of the app holding a summary panel, the tasks to be done, and messaging.
 * @param param0 an object that has SummaryProps and a list of tasks, a flag to determine what the body should show, a function that sets the state
 * @returns a component with a summary component and displays a list of tasks or a messaging board
 */
function ToDoContainer({ summary, tasks, display, setDisplay, messages}: { summary: SummaryProps, tasks: Task[], display: Display,
     setDisplay: React.Dispatch<React.SetStateAction<Display>>, messages: Message[]}): JSX.Element {
    return (
        <div className="to-do-container">
           <SummaryPanel summary= {summary} setDisplay = {setDisplay}></SummaryPanel>
            <div className="to-do-body">
                <TaskBoard display={display} tasks={tasks}/>
                <Messaging display={display} messages = {messages} />
            </div>
        </div>
    );
}

export default ToDoContainer;