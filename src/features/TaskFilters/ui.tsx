import {Radio} from 'antd'
import {useAppDispatch, useAppSelector} from "shared/store";
import {selectTasks, setFilter} from "entities/task";

export const TaskFilters = (): JSX.Element => {
    const {filter} = useAppSelector(selectTasks)
    const dispatch = useAppDispatch()

    return <Radio.Group value={filter}>
        <Radio.Button value={'ALL'} onClick={() => dispatch(setFilter('ALL'))}>
            All
        </Radio.Button>
        <Radio.Button value={'COMPLETED'} onClick={() => dispatch(setFilter('COMPLETED'))}>
            Completed
        </Radio.Button>
        <Radio.Button value={'NOT_COMPLETED'} onClick={() => dispatch(setFilter('NOT_COMPLETED'))}>
            Not Completed
        </Radio.Button>
    </Radio.Group>
}