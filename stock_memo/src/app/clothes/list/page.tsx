'use client'

import { useFetchClothingItems } from "@/components/routes/clothes/list/useFechClothingItems" 
import { useDeleteHandler } from "@/components/routes/clothes/list/useDeleteClothingItem"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from 'lucide-react'
import { Pagination } from '@/components/common/pagination/components/pagination'
import { usePagination } from '@/hooks/usePagination'

export default function ProductList() {
  const { currentPage, goToPage } = usePagination({ totalPages: 10 })
  const { clothingItems, loading, error, totalItems } = useFetchClothingItems(currentPage)

  const { handleDelete } = useDeleteHandler((id: string) => {
    // 
  })

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
            totalPages={Math.ceil(totalItems / 10)}
            onPageChange={goToPage}
          />
        </>
      )}
    </div>
  )
}
