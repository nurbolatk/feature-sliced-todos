import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {jsonPlaceholderApi, Task} from 'shared/api'
import {RootState} from "shared/store";

type TaskList = {
    status: 'idle' | 'pending' | 'fulfilled' | 'rejected'
    tasks: Task[] | null,
    error: string | null
}
const initialState = {
    status: 'idle',
    tasks: null,
    error: null,
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
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchTaskList.pending, (state, action) => {
            state.status = 'pending'
            state.tasks = null
            state.error = null
        })
        builder.addCase(fetchTaskList.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.tasks = action.payload
            state.error = null
        })
        builder.addCase(fetchTaskList.rejected, (state, action) => {
            state.status = 'rejected'
            state.tasks = null
            state.error = action.error.message ?? 'error when fetching todo list'
        })
    }
})

const {reducer: TaskReducer} = slice
const selectTasks = (state: RootState) => state.tasks
export {fetchTaskList, TaskReducer, selectTasks}
