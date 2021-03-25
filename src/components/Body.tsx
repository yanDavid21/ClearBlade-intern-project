import '../stylesheets/Body.css';
import ToDoContainer, {SummaryProps} from './ToDoContainer';
import {Task} from './ToDo'
import 'clearblade-js-client/lib/mqttws31'; 
import 'clearblade-js-client';

/**
 * This functional component represents the body of the app. Currently the body contains just a ToDoContainer.
 * @param param0 object containing SummaryProps and Task[]
 * @returns a component representing the body
 */
function Body({taskData, tasks}: {taskData: SummaryProps, tasks: Task[]}): JSX.Element {
  return (
    <ToDoContainer summary = {taskData} tasks={tasks} />
  );
}

export default Body;
