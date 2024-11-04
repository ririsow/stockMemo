import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import Link from "next/link"

export function Header() {
  return (
    <header className="bg-white shadow-sm p-4">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <Link href="/" className="cursor-pointer">
          <h1 className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
            衣類管理アプリ
          </h1>
        </Link>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
          <User className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}