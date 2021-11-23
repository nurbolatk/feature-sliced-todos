import {taskModel, TaskRow} from "entities/task";
import {useAppSelector} from "shared/store";
import {TaskFilters} from "features/TaskFilters";
import {CreateTaskCard} from "features/CreateTask";
import styles from './styles.module.scss'

const TaskListPage = () => {
    const {status, tasks, error} = useAppSelector(taskModel.selectors.selectTasks)
    const isLoading = (status === 'idle' || status === 'pending')

    if (isLoading) {
        return <div>
            <p>Loading...</p>
        </div>
    }
    return <div className={styles.container}>
        <div className={styles.header}>App Header</div>
        <div className={styles.body}>
            <TaskFilters/>
            <CreateTaskCard className="mb-6"/>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {
                tasks?.map(task => (
                    <TaskRow key={task.id} data={task}/>
                ))
            }
        </div>
    </div>
};

export default TaskListPage;