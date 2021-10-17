import {AxiosPromise} from "axios";
import {apiInstance} from "./base";
import type {Task} from "./models";

const BASE_URL = '/todos'

type GetTodoListParams = {
    completed?: boolean
}

export const getTaskList = (params?: GetTodoListParams): AxiosPromise<Task[]> => {
    return apiInstance.get(BASE_URL, {params})
}

export const getTaskById = (id: string): AxiosPromise<Task> => {
    return apiInstance.get(`${BASE_URL}/${id}`)
}