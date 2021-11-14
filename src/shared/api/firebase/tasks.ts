import {addDoc, collection, doc, Firestore, getDocs, getFirestore, setDoc} from 'firebase/firestore'
import {NewTask, Task} from "./models";


const db: Firestore = getFirestore()

const tasksCollectionRef = collection(db, 'tasks')

export const getTaskList = async (): Promise<Task[]> => {
    const snapshot = await getDocs(tasksCollectionRef)
    return snapshot.docs.map<Task>(doc => {
        return {
            ...(doc.data() as Task),
            id: doc.id,
        }
    })
}

export const updateTask = async (task: Task): Promise<void> => {
    const taskRef = doc(tasksCollectionRef, task.id)
    await setDoc(taskRef, task)
}

export const createTask = async (newTask: NewTask): Promise<Task> => {
    const docRef = await addDoc(tasksCollectionRef, newTask)
    const id = docRef.id
    return {id, ...newTask}
}