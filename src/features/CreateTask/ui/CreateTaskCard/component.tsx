import * as React from 'react'
import {HTMLAttributes, useState} from 'react'
import cn from 'classnames';
import {TaskCardFormElement} from "./types";
import {taskModel} from "entities/task";
import {useAppDispatch} from "shared/store";
import {firebaseApi} from 'shared/api'
import {Checkbox} from "shared/ui/checkbox";
import styles from './styles.module.scss'

export const CreateTaskCard = ({className, ...props}: HTMLAttributes<HTMLFormElement>): JSX.Element => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string>()

    const dispatch = useAppDispatch()

    const handleSubmit = (event: React.FormEvent<TaskCardFormElement>) => {
        event.preventDefault()
        setLoading(true)
        const form = event.currentTarget
        const {title, completed} = form.elements
        const data = {title: title.value, completed: completed.checked}
        firebaseApi.createTask(data).then((task) => {
            dispatch(taskModel.actions.addTask(task))
            form.reset()
        }).finally(() => {
            setLoading(false)
        })
    }

    return <form onSubmit={handleSubmit} className={cn("flex flex-center", className)} {...props}>
        <Checkbox name="completed"/>
        <input type="text" name="title" id="taskTitle" placeholder='Task' className={styles.input}/>
    </form>

}