import {taskModel, TaskRow} from "entities/task";
import {useAppSelector} from "shared/store";
import {TaskFilters} from "features/TaskFilters";
import {CreateTaskCard} from "features/CreateTask";
import {ToggleTask} from "features/ToggleTask";

const TaskListPage = () => {
    const {status, tasks, error} = useAppSelector(taskModel.selectors.selectTasks)
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
            {error && <p style={{color: 'red'}}>{error}</p>}
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