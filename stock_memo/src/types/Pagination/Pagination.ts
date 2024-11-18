export interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  showPageNumbers?: boolean
  maxPageNumbers?: number
  className?: string
  labels?: {
    previous: string
    next: string
    page: string
  }
}

export interface UsePaginationProps {
  totalPages: number
  initialPage?: number
}

export interface UsePaginationReturn {
  currentPage: number
  goToPage: (page: number) => void
  goToPreviousPage: () => void
  goToNextPage: () => void
  canGoPrevious: boolean
  canGoNext: boolean
}