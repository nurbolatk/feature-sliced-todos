import {useEffect} from "react";
import {fetchTaskList, selectTasks, TaskRow} from "entities/task";
import {useAppDispatch} from "shared/store";
import {useSelector} from "react-redux";
import {Checkbox, Col, Layout, Row, Spin, Typography} from "antd";

const TestPage = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTaskList())
    }, [dispatch])
    const {status, tasks} = useSelector(selectTasks)
    const isLoading = (status === 'idle' || status === 'pending')
    return <Layout>
        <Layout.Header>
            <Row justify="center">
                <Typography.Title level={1}>Tasks List</Typography.Title>
            </Row>
            {/* TODO: TasksFilters */}
        </Layout.Header>
        <Layout.Content>
            <Row gutter={[0, 20]} justify="center">
                {isLoading && <Spin size="large"/>}
                {
                    tasks?.map(task => (
                        <Col key={task.id} span={24}>
                            <TaskRow data={task} titleHref={`/${task.id}`} before={<Checkbox/>}/>
                        </Col>
                    ))
                }
            </Row>
        </Layout.Content>
    </Layout>;
};

export default TestPage;