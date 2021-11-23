import {useParams} from "react-router-dom";
import {useAppSelector} from "shared/store";
import {TaskCard, taskModel} from "entities/task";
import {ToggleTask} from "../../features/ToggleTask";

const TaskDetailsPage = (): JSX.Element => {
    const {id} = useParams<{ id: string }>()

    const {task, status} = useAppSelector(taskModel.selectors.selectTaskById(id))

    const isLoading = status === 'idle' || status === 'pending'

    return <div>
        {task && <TaskCard data={task} loading={isLoading}>
            <ToggleTask task={task}/>
        </TaskCard>}
    </div>
}

export default TaskDetailsPage