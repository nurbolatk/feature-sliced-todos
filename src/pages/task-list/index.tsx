import {selectTasks, TaskRow} from "entities/task";
import {useAppSelector} from "shared/store";
import {Col, Layout, Row, Spin, Typography} from "antd";
import {TaskFilters} from "features/TaskFilters";
import {ToggleTask} from "features/ToggleTask";

const TaskListPage = () => {
    const {status, tasks} = useAppSelector(selectTasks)
    const isLoading = (status === 'idle' || status === 'pending')
    return <Layout>
        <Layout.Header>
            <Row justify="center">
                <Typography.Title level={1}>Tasks List</Typography.Title>
            </Row>
            <Row>
                <TaskFilters/>
            </Row>
        </Layout.Header>
        <Layout.Content>
            <Row gutter={[0, 20]} justify="center">
                {isLoading && <Spin size="large"/>}
                {
                    tasks?.map(task => (
                        <Col key={task.id} span={24}>
                            <TaskRow data={task} titleHref={`/${task.id}`} before={<ToggleTask task={task}/>}/>
                        </Col>
                    ))
                }
            </Row>
        </Layout.Content>
    </Layout>;
};

export default TaskListPage;