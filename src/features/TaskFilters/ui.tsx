import {useAppDispatch, useAppSelector} from "shared/store";
import {FILTER_OPTIONS, taskModel} from "entities/task";
import {ChangeEventHandler} from "react";

export const TaskFilters = (): JSX.Element => {
    const {filter} = useAppSelector(taskModel.selectors.selectTasks)
    const dispatch = useAppDispatch()
    const handleRadioChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const {value} = e.target
        dispatch(taskModel.actions.setFilter(value.toUpperCase() as FILTER_OPTIONS))
    }

    return <div>
        <label htmlFor="all">
            <input type="radio" name="filter" value="all" checked={filter === "ALL"} id="all"
                   onChange={handleRadioChange}/>
            ALL
        </label>
        <label htmlFor="completed">
            <input type="radio" name="filter" value="completed" checked={filter === 'COMPLETED'} id="completed"
                   onChange={handleRadioChange}/>
            COMPLETED
        </label>
        <label htmlFor="not-completed">
            <input type="radio" name="filter" value="not_completed" checked={filter === 'NOT_COMPLETED'}
                   id="not-completed" onChange={handleRadioChange}/>
            NOT COMPLETED
        </label>
    </div>
}