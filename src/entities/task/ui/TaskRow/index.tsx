import {Link} from 'react-router-dom'
import cn from 'classnames'
import styles from './styles.module.scss'
import {ReactNode} from "react";

export type TaskRowProps = {
    data: import('shared/api').Task,
    titleHref: string
    before: ReactNode
}

export const TaskRow = ({data, before, titleHref}: TaskRowProps) => {
    return <div className={cn(styles['task-row'], {[styles.completed]: data.completed})}>
        {before}
        {titleHref ? <Link to={titleHref}>{data.title}</Link> : data.title}
    </div>
}