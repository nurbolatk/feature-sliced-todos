import {taskModel, TaskRow} from "entities/task";
import {useAppSelector} from "shared/store";
import {ToggleTask} from "features/ToggleTask";
import {TaskFilters} from "features/TaskFilters";
import {CreateTaskCard} from "features/CreateTask";

const TaskListPage = () => {
    const {status, tasks} = useAppSelector(taskModel.selectors.selectTasks)
    const isLoading = (status === 'idle' || status === 'pending')

    if (isLoading) {
        return <div>
            <p>Loading...</p>
        </div>
    }
    return <div>
        <div>App Header</div>
        <div><TaskFilters/></div>
        <CreateTaskCard/>
        <div>
            {
                tasks?.map(task => (
                    <div key={task.id}>
                        <TaskRow data={task} titleHref={`/${task.id}`} before={<ToggleTask task={task}/>}/>
                    </div>
                ))
            }
        </div>
    </div>
};

export default TaskListPage;