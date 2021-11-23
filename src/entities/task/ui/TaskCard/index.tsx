import {Task} from "shared/api";
import {HTMLAttributes, useCallback} from "react";
import {ToggleTask} from "../../../../features/ToggleTask";

type TaskCardProps = {
    data: Task,
    loading?: boolean
} & HTMLAttributes<HTMLDivElement>

export const TaskCard = ({data, loading, children, ...cardProps}: TaskCardProps): JSX.Element => {
    const handleDelete = useCallback(() => {
        const res = window.confirm('Are you sure you want to delete this task?')
        console.log(res)
    }, [])
    return <div
        {...cardProps}
    >
        <ToggleTask task={data}/>
        {loading ? 'Loading...' : `${data.title}`}
        <button onClick={handleDelete}>delete</button>
    </div>
}