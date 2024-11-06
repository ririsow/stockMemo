'use client'

import { useState, useEffect } from 'react'
import { collection, query, orderBy, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from 'lucide-react'

interface ClothingItem {
  id: string
  name: string
  categories: string[]
  colors: string[]
  createdAt: Date
}

export default function ProductList() {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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

    fetchClothingItems()
  }, [])

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
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}