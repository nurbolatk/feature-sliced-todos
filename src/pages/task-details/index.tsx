import {useParams} from "react-router-dom";
import {useAppSelector} from "shared/store";
import {TaskCard, taskModel} from "entities/task";

const TaskDetailsPage = (): JSX.Element => {
    const {id} = useParams<{ id: string }>()

    const task = useAppSelector(taskModel.selectors.selectTaskById(id))

    const isLoading = task.status === 'idle' || task.status === 'pending'
    
    return <div>
        <TaskCard data={task.task} loading={isLoading}/>
    </div>
}

export default TaskDetailsPage