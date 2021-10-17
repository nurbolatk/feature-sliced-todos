import {configureStore} from "@reduxjs/toolkit";
import taskModel from "entities/task";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        tasks: taskModel.reducer
    },
    devTools: true
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;