'use client'

import { useCallback } from "react"
import { deleteClothingItem } from "@/hooks/useDeleteClothingItem" 

export const useDeleteHandler = (onSuccess: (id: string) => void) => {
  const handleDelete = useCallback(async (id: string) => {
    if (window.confirm('本当にこの商品を削除しますか？')) {
      try {
        // 削除処理を実行
        await deleteClothingItem(id)
        onSuccess(id) // 削除成功時にコールバックを呼び出す
        alert("削除OK")
      } catch (error) {
        console.error("Error deleting clothing item:", error)
        alert("削除NG")
      }
    }
  }, [onSuccess])

  return { handleDelete }
}
