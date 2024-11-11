'use client'

import { useState, useEffect } from 'react'
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { ClothingItem } from "@/types/ClothingItem"

export function useClothingList() {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchClothingItems()
  }, [])

  async function fetchClothingItems() {
    try {
      const q = query(collection(db, 'clothes'), orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      const items: ClothingItem[] = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate()
      } as ClothingItem))
      setClothingItems(items)
    } catch (err) {
      console.error("Error fetching clothing items: ", err)
      setError("商品の取得中にエラーが発生しました。")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('本当にこの商品を削除しますか？')) {
      try {
        await deleteDoc(doc(db, 'clothes', id))
        setClothingItems(prevItems => prevItems.filter(item => item.id !== id))
        alert("削除OK")
      } catch (err) {
        console.error("Error deleting clothing item: ", err)
        alert("削除NG")
      }
    }
  }

  return { clothingItems, loading, error, handleDelete }
}