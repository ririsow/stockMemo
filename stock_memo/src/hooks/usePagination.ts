import { useState, useCallback } from 'react'
import type { UsePaginationProps, UsePaginationReturn } from '@/hooks/pagination'

export function usePagination({ totalPages, initialPage = 1 }: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage)

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }, [totalPages])

  const goToPreviousPage = useCallback(() => {
    goToPage(currentPage - 1)
  }, [currentPage, goToPage])

  const goToNextPage = useCallback(() => {
    goToPage(currentPage + 1)
  }, [currentPage, goToPage])

  return {
    currentPage,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    canGoPrevious: currentPage > 1,
    canGoNext: currentPage < totalPages
  }
}
