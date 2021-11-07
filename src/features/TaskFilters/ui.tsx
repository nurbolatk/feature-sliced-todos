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
        <label>
            <input type="radio" name="filter" value="all" checked={filter === "ALL"}
                   onChange={handleRadioChange}/>
            ALL
        </label>
        <label>
            <input type="radio" name="filter" value="completed" checked={filter === 'COMPLETED'}
                   onChange={handleRadioChange}/>
            COMPLETED
        </label>
        <label>
            <input type="radio" name="filter" value="not_completed" checked={filter === 'NOT_COMPLETED'}
                   onChange={handleRadioChange}/>
            NOT COMPLETED
        </label>
    </div>
}