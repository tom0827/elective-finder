import { db } from '@/firebase/clientApp';
import { collection, getDocs } from 'firebase/firestore';

export async function getCourses() {
    try{
        const courseCollection = collection(db, 'course_offerings');
        const snapshot = await getDocs(courseCollection);
        const courses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return courses;
    } catch (err) {
        console.log(err)
    }
}