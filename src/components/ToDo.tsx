import '../stylesheets/Body.css'
import { ClearBlade } from 'clearblade-js-client';

//this type represents the shape of a "Task" object, which represents a row in the Task Collection
export type Task = {
    label: string,
    due_date: string,
    is_done: boolean,
    item_id: string
}

/**
 * Updates collection based on the checked value of the checkbox from which this function is invoked.
 * @param event the event object from which this function is called
 * @param item_id the item id of the Task for which this function is invoked in
 */
function updateCollections(event: React.ChangeEvent<HTMLInputElement>, item_id: string): void {
    const cb = new ClearBlade();

    //TODO: better design is to reuse the same collection and clearblade object, this is just working POC
    cb.init({
      systemKey: '98c8db850cb4b3d5a2f7e8d798bd01',
      systemSecret: '98C8DB850CC0A4F29286B7E888CB01',
      useUser: {email: "yan.da@northeastern.edu", authToken: 
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI5MGIxZGY4NTBjZTZlZmQwYjNhN2ZlYmU5MTVkIiwic2lkIjoiZDVjMDU5ZjctYzIyMC00NmZmLWEwZWMtMTRlM2JmMGQyMDc0IiwidXQiOjIsInR0Ij" + 
      "oxLCJleHAiOi0xLCJpYXQiOjE2MTY2MzgyMjZ9.Ruhv2MsJLeD2ftznFPwelPazBPDi9uZ9bTFghSxkh4M"}
    });

    const collection = cb.Collection({collectionName:'Clearblade_Task_TODO'});

    //identifies the tuple to be modified by looking up the item_id
    let query = cb.Query();
    query.equalTo('item_id', item_id);

    //changes to be made in this update
    let changes = {
        is_done: event.target.checked
    };

    collection.update(query, changes, (err: boolean, data) => {
        if(err) {
            alert("Something went wrong with the collection updating :(")
            console.log(data);
        }
    });
}

/**
 * Trims the date time to just MM:DD:YYYY.
 * @param datetime raw datetime string
 * @returns formatted date time in form MM:DD:YYYY
 */
function trimDateTime(datetime: string): string {
    return datetime.substr(0, 10);
}

/**
 * This functional component represents a Task, displaying its label, whether its done or not, and its due date.
 * @param param0 a Task object
 * @returns a component representing a task object
 */
export default function ToDo({task}: { task: Task }) {
    return (
        <div className="task">
            <div className = "task-label">
                <div>{task.label}</div>
                <input
                    name="is_done"
                    type="checkbox"
                    checked={task.is_done}
                    onChange={(e) => updateCollections(e, task.item_id)} />
            </div>
            <div>{trimDateTime(task.due_date)}</div>
        </div>
    );
}