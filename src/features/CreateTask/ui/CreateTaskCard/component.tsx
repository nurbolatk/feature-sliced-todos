import * as React from 'react'
import {useState} from 'react'
import {TaskCardFormElement} from "./types";
import {taskModel} from "entities/task";
import {useAppDispatch} from "shared/store";
import {firebaseApi} from 'shared/api'

export const CreateTaskCard = (): JSX.Element => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>()

    const dispatch = useAppDispatch()

    const handleSubmit = (event: React.FormEvent<TaskCardFormElement>) => {
        event.preventDefault()
        setLoading(true)
        const {title, completed} = event.currentTarget.elements
        const data = {title: title.value, completed: completed.value === 'COMPLETED'}
        firebaseApi.createTask(data).then((task) => {
            dispatch(taskModel.actions.addTask(task))
        }).finally(() => {
            setLoading(false)
        })
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