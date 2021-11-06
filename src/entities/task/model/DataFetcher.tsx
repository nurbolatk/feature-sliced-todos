import {useAppDispatch} from "shared/store";
import {useEffect} from "react";
import * as taskModel from "./TaskModel";

export const DataFetcher = (): null => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(taskModel.actions.fetchTaskList())
    }, [dispatch])
    return null
}