export type Task = {
    id: string,
    title: string,
    completed: boolean,
}

export type NewTask = Omit<Task, 'id'>