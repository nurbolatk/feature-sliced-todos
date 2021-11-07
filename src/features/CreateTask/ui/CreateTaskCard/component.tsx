import * as React from 'react'
import {TaskCardFormElement} from "./types";

export const CreateTaskCard = (): JSX.Element => {
    const handleSubmit = (event: React.FormEvent<TaskCardFormElement>) => {
        event.preventDefault()
        const {title, completed} = event.currentTarget.elements
        console.log({title: title.value, completed: completed.value})
    }
    return <div>
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" id="taskTitle" placeholder='buy iPhone'/>
            <div>
                <label>
                    <input type="radio" name="completed" value="COMPLETED"/>
                    Completed</label>
                <label>
                    <input type="radio" name="completed" value="NOT_COMPLETED"/>
                    Not Completed</label>
            </div>
            <button type="submit">Create</button>
        </form>
    </div>
}