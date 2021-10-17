import {useEffect} from "react";
import {fetchTaskList, selectTasks, TaskRow} from "entities/task";
import {useAppDispatch, useAppSelector} from "shared/store";
import {Col, Layout, Row, Spin, Typography} from "antd";
import {TaskFilters, ToggleTask} from "features";

const TaskListPage = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTaskList())
    }, [dispatch])
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