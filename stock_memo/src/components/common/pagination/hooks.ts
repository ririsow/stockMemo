import { useMemo } from 'react'

interface UsePaginationProps {
  currentPage: number
  totalPages: number
  maxPageNumbers?: number
}

export function usePagination({ currentPage, totalPages, maxPageNumbers = 5 }: UsePaginationProps) {
  const pageNumbers = useMemo(() => {
    const numbers = []
    const halfMax = Math.floor(maxPageNumbers / 2)
    let start = Math.max(1, currentPage - halfMax)
    let end = Math.min(totalPages, start + maxPageNumbers - 1)

    if (end - start + 1 < maxPageNumbers) {
      start = Math.max(1, end - maxPageNumbers + 1)
    }

    for (let i = start; i <= end; i++) {
      numbers.push(i)
    }

    return numbers
  }, [currentPage, totalPages, maxPageNumbers])

  const canGoPrevious = currentPage > 1
  const canGoNext = currentPage < totalPages

  return {
    pageNumbers,
    canGoPrevious,
    canGoNext
  }
}