import {Layout} from "antd";
import styles from "./styles.module.scss";
import {Link, useParams} from "react-router-dom";
import {useAppSelector} from "shared/store";
import {selectTaskById, TaskCard} from "entities/task";
import {ToggleTask} from "features/ToggleTask";

const TaskDetailsPage = (): JSX.Element => {
    const {id} = useParams<{ id: string }>()

    const task = useAppSelector(selectTaskById(id))

    const isLoading = task.status === 'idle' || task.status === 'pending'
    return (
        <Layout className={styles.root}>
            <Layout.Content className={styles.content}>
                {task.status === 'rejected' ? <p style={{color: 'red'}}>{task.error}</p> : (
                    <TaskCard
                        data={task.task}
                        size="default"
                        loading={isLoading}
                        className={styles.card}
                        bodyStyle={{height: 400}}
                        extra={<Link to="/">Back to TasksList</Link>}
                        actions={[
                            !isLoading && <ToggleTask key="toggle" task={task.task!}/>,
                        ]}
                    />
                )}
            </Layout.Content>
        </Layout>
    )
}

export default TaskDetailsPage