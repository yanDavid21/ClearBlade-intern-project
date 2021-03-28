import Body, { Display } from './components/Body';
import Header from './components/Header'
import { ClearBlade } from 'clearblade-js-client';
import { Task } from './components/ToDo';
import './App.css';
import { useEffect, useState } from 'react'
import { SummaryProps } from './components/SummaryPanel';
import { Message } from './components/Messaging'

/**
 * This functional component contains the entire application's components (header, body) and the body's components (ToDo container and ToDo's).
 * @returns the parent component of the app
 */
function App(): JSX.Element {

  //this state represents the list of tasks in the collection
  const [tasksState, setTasks] = useState<Task[]>([]);

  //this state represents the current messsages in the chat
  const [messages, setMessages] = useState<Message[]>([{sender:"Clearblade Platform", body: "Welcome!"}])

  //this object contains the total of tasks in Collection (and as bonus the number of tasks that are done)
  const [taskData, setTasksData] = useState({ tasks_done: 0, tasks_total: 0, messages: messages.length});

  //this state represents what component should be displayed
  const [display, setDisplay] = useState(Display.TaskBoard);



  //initiate collection connection and fetch data in component initialization 
  useEffect(() => {
    const cb = initializeClearBlade();
    fetchTasksFromCollection(cb, setTasks, setTasksData);
    //subscribeToCollectionUpdates(cb);
  }, [])

  return (
    <div className="App">
      <Header></Header>
      <Body taskData={taskData} tasks={tasksState} display={display} setDisplay={setDisplay} messages = {messages}></Body>
    </div>
  );
}

/**
 * This callback function is used when connecting to the collection in the mounting of the App component.
 * @param err whether the mounting of the component failed
 */
function initCallback(err: boolean, cb:IClearBlade): void {
  if (err) {
    alert("Error connecting to collection :(");
  }
}

/**
 * Initializes and returns a ClearBlade object.
 * @returns a clearblade object pointing to David Yan's system
 */
function initializeClearBlade(): IClearBlade {
  const cb = new ClearBlade();

  //TODO: add .env file to hide secrets and user data
  cb.init({
    systemKey: '98c8db850cb4b3d5a2f7e8d798bd01',
    systemSecret: '98C8DB850CC0A4F29286B7E888CB01',
    useUser: {
      email: "yan.da@northeastern.edu", authToken:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI5MGIxZGY4NTBjZTZlZmQwYjNhN2ZlYmU5MTVkIiwic2lkIjoiZDVjMDU5ZjctYzIyMC00NmZmLWEwZWMtMTRlM2JmMGQyMDc0IiwidXQiOjIsInR0Ij" +
        "oxLCJleHAiOi0xLCJpYXQiOjE2MTY2MzgyMjZ9.Ruhv2MsJLeD2ftznFPwelPazBPDi9uZ9bTFghSxkh4M"
    },
    callback: initCallback
  });

  return cb;
}

/**
 * Fetch Task data from the Clearblade_Task_TODO collection from the given Clearblade System
 * @param cb a Clearblade object 
 * @param setTasks setState method for a list of Tasks
 * @param setTasksData setState method for task data (SummaryProps)
 */
function fetchTasksFromCollection(cb: IClearBlade, setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  setTasksData: React.Dispatch<React.SetStateAction<SummaryProps>>): void {
  const collection = cb.Collection({ collectionName: 'Clearblade_Task_TODO' });
  const query = cb.Query({ collectionName: 'Clearblade_Task_TODO' });
  query.ascending("due_date");

  //fetches the collection and includes every element into the task state
  collection.fetch(query, (err, dataArray) => {
    if (err) {
      alert("An error occurred in fetching data :(");
    } else {
      let taskArray:Task[] = []
      let numberOfTasksDone = 0;
      dataArray.forEach((collectionRow: any) => {
        let data: any = {}
        for (const key in collectionRow.data) {
          data[key] = collectionRow.data[key];
        }

        //appends data to array that will be taskState
        taskArray.push(data);
        //if the data is completed, add 1
        if (data.is_done) {
          numberOfTasksDone++;
        }
      })

      //after loop, update state
      setTasks(taskArray);
      setTasksData((prevState: SummaryProps) => ({
        ...prevState,
        tasks_total: taskArray.length
      }))
      setTasksData((prevState: SummaryProps) => ({
        ...prevState,
        tasks_done: numberOfTasksDone
      }))
    }
  })
}

/**
 * Subscribes to topic 'collection/to_do'
 * @param cb clearblade object
 */
function subscribeToCollectionUpdates(cb: IClearBlade) {
  const messaging = cb.Messaging({}, err => {
    if(err) {
      console.log(err);
    }
  });
  messaging.subscribe("collection/to_do", {},  function (err, payload) {
    if (err) {
      alert("Something went wrong with connecting to messaging server.");
    } else {
      console.log(payload);
    }
  });

}



export default App;


