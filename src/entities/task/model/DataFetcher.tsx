import {useAppDispatch} from "../../../shared/store";
import {useEffect} from "react";
import {fetchTaskList} from "./TaskList";

export const DataFetcher = (): null => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchTaskList())
    }, [dispatch])
    return null
}