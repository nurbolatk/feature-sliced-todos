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
        dispatch(taskModel.actions.toggleTask(task))
    }, [dispatch, task])
    return <Checkbox checked={task.completed} onChange={toggleCheckbox}/>
}