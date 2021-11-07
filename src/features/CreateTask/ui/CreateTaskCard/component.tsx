import * as React from 'react'
import {TaskCardFormElement} from "./types";
import {taskModel} from "entities/task";
import {useAppDispatch} from "shared/store";

export const CreateTaskCard = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const handleSubmit = (event: React.FormEvent<TaskCardFormElement>) => {
        event.preventDefault()
        const {title, completed} = event.currentTarget.elements
        const data = {title: title.value, completed: completed.value === 'COMPLETED'}
        console.log(data)
        dispatch(taskModel.actions.addTask(data))
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