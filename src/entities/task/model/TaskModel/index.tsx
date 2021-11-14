import {
    AsyncThunkAction,
    createAsyncThunk,
    createDraftSafeSelector,
    createSlice,
    PayloadAction
} from "@reduxjs/toolkit";
import {firebaseApi, NewTask, Status, Task} from 'shared/api'
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
    '[tasks] fetch all',
    async (): Promise<Task[]> => {
        return await firebaseApi.getTaskList()
    }
)

const createTask = createAsyncThunk(
    '[tasks] create',
    async (newTask: NewTask) => {
        return await firebaseApi.createTask(newTask)
    }
)

const updateTask = createAsyncThunk(
    '[tasks] update',
    async ({newTask}: { oldTask: Task, newTask: Task }): Promise<void> => {
        return await firebaseApi.updateTask(newTask)
    }
)

const toggleTask = (task: Task): AsyncThunkAction<void, { oldTask: Task, newTask: Task }, {}> => {
    return updateTask({
        oldTask: task, newTask: {...task, completed: !task.completed}
    })
}

const slice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<FILTER_OPTIONS>) => {
            state.filter = action.payload
        },
        addTask: (state, action: PayloadAction<Task>) => {
            if (state.tasks) {
                const {id} = action.payload
                state.tasks[id] = action.payload
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
        builder.addCase(updateTask.pending, (state, action) => {
            const {newTask} = action.meta.arg
            if (state.tasks?.[newTask.id]) {
                state.tasks[newTask.id] = newTask
            }
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            state.error = undefined
        })
        builder.addCase(updateTask.rejected, (state, action) => {
            if (state.tasks) {
                const {oldTask, newTask} = action.meta.arg
                state.tasks[newTask.id] = oldTask
            }
            state.error = action.error.message
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
const actions = {...slice.actions, fetchTaskList, createTask, updateTask, toggleTask}
const selectors = {selectTasks, selectTaskById}
export {reducer, actions, selectors}
