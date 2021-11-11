import {collection, Firestore, getDocs, getFirestore} from 'firebase/firestore'
import {Task} from "./models";


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