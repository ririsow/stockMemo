'use client'

import { useRouter, usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export function Navigation() {
  const router = useRouter()
  const pathname = usePathname()

  const handleBack = () => {
    if (pathname === '/') {
      // If we're already at the home page, we can't go back further
      return
    }
    router.back()
  }

  const handleNext = () => {
    // This is a simplified example. You might want to define a more specific navigation flow
    if (pathname === '/') {
      router.push('/register')
    } else if (pathname === '/register') {
      router.push('/register/review')
    } else if (pathname === '/register/review') {
      router.push('/register/confirmation')
    }
    // Add more conditions as needed
  }

  return (
    <div className="flex justify-between w-full max-w-md mx-auto mt-4">
      <Button variant="outline" className="flex items-center gap-2" onClick={handleBack}>
        <ChevronLeft className="w-4 h-4" />
        戻る
      </Button>
      <Button className="flex items-center gap-2" onClick={handleNext}>
        進む
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}