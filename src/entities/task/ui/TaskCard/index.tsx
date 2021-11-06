import {Task} from "shared/api";
import {Link} from "react-router-dom";
import {HTMLAttributes} from "react";

type TaskCardProps = {
    data?: Task,
    titleHref?: string,
    loading?: boolean
} & HTMLAttributes<HTMLDivElement>

export const TaskCard = ({data, titleHref, loading, children, ...cardProps}: TaskCardProps): JSX.Element => {
    return <div
        {...cardProps}
    >
        {loading ? 'Loading...' : `Task #${data?.id}`}
        {titleHref ? <Link to={titleHref}>{data?.title}</Link> : data?.title}
        {children}
    </div>
}