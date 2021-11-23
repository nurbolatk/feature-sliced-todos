import cn from 'classnames'
import styles from './styles.module.scss'
import {ToggleTask} from "features/ToggleTask";

export type TaskRowProps = {
    data: import('shared/api').Task,
}

export const TaskRow = ({data}: TaskRowProps) => {
    return <div className={cn(styles['task-row'], {[styles.completed]: data.completed})}>
        <label className={styles.label}>
            <ToggleTask task={data}/>
            {data.title}
        </label>
    </div>
}