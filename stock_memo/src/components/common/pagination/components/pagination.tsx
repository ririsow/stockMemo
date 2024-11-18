import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import type { PaginationProps } from '@/types/Pagination/Pagination'

import { usePagination } from "../hooks"

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  showPageNumbers = false,
  maxPageNumbers = 5,
  className = "",
  labels = {
    previous: "Previous page",
    next: "Next page",
    page: "Page"
  }
}: PaginationProps) {
  const { pageNumbers, canGoPrevious, canGoNext } = usePagination({
    currentPage,
    totalPages,
    maxPageNumbers
  })

  return (
    <nav className={cn("flex justify-center items-center space-x-2 mt-6", className)} aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrevious}
        aria-label={labels.previous}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {showPageNumbers ? (
        pageNumbers.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(pageNumber)}
            aria-label={`${labels.page} ${pageNumber}`}
            aria-current={pageNumber === currentPage ? "page" : undefined}
          >
            {pageNumber}
          </Button>
        ))
      ) : (
        <span className="text-sm" aria-current="page">
          {currentPage} / {totalPages}
        </span>
      )}
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
        aria-label={labels.next}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}