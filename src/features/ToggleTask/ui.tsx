import {Checkbox} from "shared/ui/checkbox";
import {taskModel} from "entities/task";
import {Task} from "shared/api";
import {useCallback} from "react";
import {useAppDispatch} from "shared/store";

type ToggleTaskProps = {
    task: Task
}

export const ToggleTask = ({task}: ToggleTaskProps): JSX.Element => {
    const dispatch = useAppDispatch()
    const toggleCheckbox = useCallback(() => {
        dispatch(taskModel.actions.toggleTask(task.id))
    }, [dispatch, task])
    // return <Checkbox onChange={toggleCheckbox} checked={task.completed}/>
    return <Checkbox checked={task.completed} onChange={toggleCheckbox}/>
}