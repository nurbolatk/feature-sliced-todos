import {createAsyncThunk, createDraftSafeSelector, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {jsonPlaceholderApi, Status, Task} from 'shared/api'
import {RootState} from "shared/store";

type ReduxTask = {
    [id: string]: Task
}

export type FILTER_OPTIONS = 'ALL' | 'COMPLETED' | 'NOT_COMPLETED'

type TaskList = {
    status: Status
    tasks?: ReduxTask,
    error?: string
    filter: FILTER_OPTIONS
}
const initialState = {
    status: 'idle',
    tasks: undefined,
    error: undefined,
    filter: 'ALL'
} as TaskList

const fetchTaskList = createAsyncThunk(
    '[tasks] fetch all tasks',
    async () => {
        const response = await jsonPlaceholderApi.getTaskList()
        return response.data
    }
)

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        toggleTask: (state, action: PayloadAction<number>) => {
            if (state.tasks) {
                state.tasks[action.payload].completed = !state.tasks[action.payload].completed
            }
        },
        setFilter: (state, action: PayloadAction<FILTER_OPTIONS>) => {
            state.filter = action.payload
        },
        addTask: (state, action: PayloadAction<{ title: string, completed: boolean }>) => {
            console.log(state.tasks, action.payload)
            if (state.tasks) {
                const id = Date.now()
                const {title, completed} = action.payload
                state.tasks[id] = {id, title, completed}
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTaskList.pending, (state) => {
            state.status = 'pending'
            state.tasks = undefined
            state.error = undefined
        })
        builder.addCase(fetchTaskList.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            const tasks: ReduxTask = {}
            action.payload.forEach((task: Task) => {
                tasks[task.id] = task
            })
            state.tasks = tasks
            state.error = undefined
        })
        builder.addCase(fetchTaskList.rejected, (state, action) => {
            state.status = 'rejected'
            state.tasks = undefined
            state.error = action.error.message ?? 'error when fetching todo list'
        })
    }
})
const selectSelf = (state: RootState): TaskList => state.tasks as TaskList
const selectTasks = createDraftSafeSelector(selectSelf, (state: TaskList) => {
    const allTasks = Object.values(state.tasks ?? {})
    const tasks = state.filter === 'COMPLETED' ? allTasks.filter(task => task.completed) : state.filter === 'NOT_COMPLETED' ? allTasks.filter(task => !task.completed) : allTasks
    return {
        ...state,
        tasks,
    }
})
const selectTaskById = (id: string) => createDraftSafeSelector(selectSelf, (state: TaskList) => {
    const task = state.tasks?.[id]
    const {status, error} = state
    return {
        status, task, error
    }
})

const {reducer} = slice
const actions = {...slice.actions, fetchTaskList}
const selectors = {selectTasks, selectTaskById}
export {reducer, actions, selectors}
