import {Checkbox} from "antd";
import * as taskModel from "entities/task";
import {Task} from "shared/api";
import {useCallback} from "react";
import {useAppDispatch} from "../../shared/store";

type ToggleTaskProps = {
    task: Task
}

export const ToggleTask = ({task}: ToggleTaskProps): JSX.Element => {
    const dispatch = useAppDispatch()
    const toggleCheckbox = useCallback(() => {
        dispatch(taskModel.toggleTask(task.id))
    }, [dispatch, task])
    return <Checkbox onChange={toggleCheckbox} checked={task.completed}/>
}