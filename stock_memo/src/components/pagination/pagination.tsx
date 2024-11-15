import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from "@/lib/utils"
import type { PaginationProps } from '@/types/Pagination'

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
  const getPageNumbers = () => {
    const pageNumbers = []
    const halfMax = Math.floor(maxPageNumbers / 2)
    let start = Math.max(1, currentPage - halfMax)
    let end = Math.min(totalPages, start + maxPageNumbers - 1)

    if (end - start + 1 < maxPageNumbers) {
      start = Math.max(1, end - maxPageNumbers + 1)
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i)
    }

    return pageNumbers
  }

  return (
    <nav className={cn("flex justify-center items-center space-x-2 mt-6", className)} aria-label="Pagination">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label={labels.previous}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {showPageNumbers ? (
        getPageNumbers().map((pageNumber) => (
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
        disabled={currentPage === totalPages}
        aria-label={labels.next}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </nav>
  )
}