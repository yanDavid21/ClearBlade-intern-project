import '../stylesheets/Body.css';
import ToDoContainer from './ToDoContainer';
import { SummaryProps } from './SummaryPanel';
import { Task } from './ToDo'
import 'clearblade-js-client/lib/mqttws31';
import 'clearblade-js-client';
import { Message } from './Messaging'

// The 2 states the body can show: the taskboard, or the messaging board
export enum Display {
  TaskBoard,
  Messaging
}

/**
 * This functional component represents the body of the app. Currently the body contains just a ToDoContainer.
 * @param param0 object containing SummaryProps and Task[]
 * @returns a component representing the body
 */
function Body({ taskData, tasks, display, setDisplay, messages }: {
  taskData: SummaryProps, tasks: Task[], display: Display,
  setDisplay: any, messages: Message[]
}): JSX.Element {
  return (
    <ToDoContainer summary={taskData} tasks={tasks} display={display} setDisplay={setDisplay} messages={messages} />
  );
}

export default Body;
