import {Card, CardProps, Spin} from 'antd'
import {Task} from "shared/api";
import {Link} from "react-router-dom";

type TaskCardProps = {
    data?: Task,
    titleHref?: string,
} & CardProps

export const TaskCard = ({data, titleHref, children, ...cardProps}: TaskCardProps): JSX.Element => {
    return <Card
        title={cardProps.loading ? <Spin size="small"/> : `Task #${data?.id}`}
        {...cardProps}
    >
        {titleHref ? <Link to={titleHref}>{data?.title}</Link> : data?.title}
        {children}
    </Card>
}