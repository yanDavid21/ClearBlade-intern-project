import Body from './components/Body';
import Header from './components/Header'
import { ClearBlade } from 'clearblade-js-client';
import {Task} from './components/ToDo';
import './App.css';
import { useEffect, useState} from 'react'

/**
 * This functional component contains the entire application's components (header, body) and the body's components (ToDo container and ToDo's).
 * @returns the parent component of the app
 */
function App(): JSX.Element {

  //this state represents the list of tasks in the collection
  const [tasksState, setTasks] = useState<Task[]>([]); 
  //this object contains the total of tasks in Collection (and as bonus the number of tasks that are done)
  const [taskData, setTasksData] = useState({ tasks_done: 0, tasks_total: 0 });  

  //initiate collection connection and fetch data in component initialization 
  useEffect(() => {
    const cb = new ClearBlade();


    //TODO: add .env file to hide secrets and user data
    cb.init({ 
      systemKey: '98c8db850cb4b3d5a2f7e8d798bd01',
      systemSecret: '98C8DB850CC0A4F29286B7E888CB01',
      useUser: {email: "yan.da@northeastern.edu", authToken: 
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI5MGIxZGY4NTBjZTZlZmQwYjNhN2ZlYmU5MTVkIiwic2lkIjoiZDVjMDU5ZjctYzIyMC00NmZmLWEwZWMtMTRlM2JmMGQyMDc0IiwidXQiOjIsInR0Ij" + 
      "oxLCJleHAiOi0xLCJpYXQiOjE2MTY2MzgyMjZ9.Ruhv2MsJLeD2ftznFPwelPazBPDi9uZ9bTFghSxkh4M"},
      callback: initCallback
    });
  
    const collection = cb.Collection({collectionName:'Clearblade_Task_TODO'});
    const query = cb.Query({collectionName:'Clearblade_Task_TODO'});
    query.ascending("due_date");
  
    collection.fetch(query, (err, dataArray) => {
      if (err) {
        alert("An error occurred in fetching data :(");
      } else {
        dataArray.forEach((collectionRow : any) => {
          let data: any = {}
          for(const key in collectionRow.data) {
            data[key] = collectionRow.data[key];
          }
          setTasks(tasksState => [...tasksState, data]);
          setTasksData(prevState => ({
            ...prevState,
            tasks_total: prevState.tasks_total + 1
          }))
          if (data.is_done) {
            setTasksData(prevState => ({
              ...prevState,
              tasks_done: prevState.tasks_done + 1
            }))
          }
        })
      }
    })
  }, [])
  
  return (
    <div className="App">
      <Header></Header>
      <Body taskData={taskData} tasks={tasksState}></Body>
    </div>
  );
}

/**
 * This callback function is used when connecting to the collection in the mounting of the App component.
 * @param err whether the mounting of the component failed
 */
function initCallback(err: boolean) {
  if (err) {
    alert("Error connecting to collection :(");
  }
}




export default App;
