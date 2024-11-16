'use client'

import { useState, useEffect } from 'react'
import { collection, query, orderBy, getDocs, deleteDoc, doc, limit, startAfter } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from 'lucide-react'
import { Pagination } from '@/components/pagination/pagination'
import { usePagination } from '@/hooks/usePagination'
import { ClothingItem } from '@/types/ClothingItem'
import { ITEMS_PER_PAGE } from '@/constants/itemsPerPage'


export default function ProductList() {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalItems, setTotalItems] = useState(0)
  const [lastVisible, setLastVisible] = useState<any>(null)

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const { currentPage, goToPage } = usePagination({ totalPages })

  useEffect(() => {
    fetchClothingItems()
  }, [currentPage])

  async function fetchClothingItems() {
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

  const handleDelete = async (id: string) => {
    if (window.confirm('本当にこの商品を削除しますか？')) {
      try {
        await deleteDoc(doc(db, 'clothes', id))
        setClothingItems(prevItems => prevItems.filter(item => item.id !== id))
        setTotalItems(prevTotal => prevTotal - 1)
        alert("削除OK")
      } catch (err) {
        console.error("Error deleting clothing item: ", err)
        alert("削除NG")
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">登録済み衣類一覧</h1>
      {clothingItems.length === 0 ? (
        <p className="text-center text-gray-500">登録された衣類はありません。</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clothingItems.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-2">
                    <strong>カテゴリー：</strong>
                    {item.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="mr-1">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <div className="mb-2">
                    <strong>色：</strong>
                    {item.colors.map((color) => (
                      <Badge key={color} variant="outline" className="mr-1">
                        {color}
                      </Badge>
                    ))}
                  </div>
                  <div>
                    <strong>登録日：</strong> {item.createdAt.toLocaleDateString()}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(item.id)}
                    className="w-full"
                  >
                    <Trash2 className="mr-2 h-4 w-4" /> 削除
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            showPageNumbers={true}
            maxPageNumbers={5}
            labels={{
              previous: "前のページ",
              next: "次のページ",
              page: "ページ"
            }}
            className="mt-8"
          />
        </>
      )}
    </div>
  )
}