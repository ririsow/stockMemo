import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export async function deleteClothingItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'clothes', id))
  } catch (err) {
    console.error("Error deleting clothing item: ", err)
    throw new Error("削除に失敗しました")
  }
}
