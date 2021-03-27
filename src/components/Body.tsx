import '../stylesheets/Body.css';
import ToDoContainer from './ToDoContainer';
import { SummaryProps } from './SummaryPanel';
import {Task} from './ToDo'
import 'clearblade-js-client/lib/mqttws31'; 
import 'clearblade-js-client';

export enum Display {
  TaskBoard,
  Messaging
}

/**
 * This functional component represents the body of the app. Currently the body contains just a ToDoContainer.
 * @param param0 object containing SummaryProps and Task[]
 * @returns a component representing the body
 */
function Body({taskData, tasks, display, setDisplay}: {taskData: SummaryProps, tasks: Task[], display: Display, setDisplay: any}): JSX.Element {
  return (
    <ToDoContainer summary = {taskData} tasks={tasks} display = {display} setDisplay = {setDisplay}/>
  );
}

export default Body;
