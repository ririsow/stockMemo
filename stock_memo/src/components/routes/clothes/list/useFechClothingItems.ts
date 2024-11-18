import { useState, useEffect } from 'react'
import { collection, query, orderBy, getDocs, limit, startAfter } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { ClothingItem } from '@/types/ClothingItem'
import { ITEMS_PER_PAGE } from '@/constants/itemsPerPage'

export function useFetchClothingItems(currentPage: number) {
  // 衣類アイテムのリストを保持
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([])
  
  // データのロード中かどうかを追跡
  const [loading, setLoading] = useState(true)
  
  // データ取得中にエラーが発生した場合のエラーメッセージを保持
  const [error, setError] = useState<string | null>(null)
  
  // 全体のアイテム数（ページネーション計算などに使用）
  const [totalItems, setTotalItems] = useState(0)
  
  // Firebaseのクエリで使用する「最後に取得したドキュメント」を保持（次のページ取得用）
  const [lastVisible, setLastVisible] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        let q = query(
          collection(db, 'clothes'),
          orderBy('createdAt', 'desc'),
          limit(ITEMS_PER_PAGE)
        )

        if (currentPage > 1 && lastVisible) {
          q = query(q, startAfter(lastVisible))
        }

        const querySnapshot = await getDocs(q)
        const items: ClothingItem[] = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate()
        } as ClothingItem))

        setClothingItems(items)
        setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1])

        if (currentPage === 1) {
          const totalQuery = await getDocs(collection(db, 'clothes'))
          setTotalItems(totalQuery.size)
        }
      } catch (err) {
        console.error("Error fetching clothing items: ", err)
        setError("商品の取得中にエラーが発生しました。")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [currentPage])

  return { clothingItems, loading, error, totalItems }
}
