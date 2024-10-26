import { Button } from "@/components/ui/button"
import { User } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white shadow-sm p-4">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">衣類管理アプリ</h1>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
          <User className="h-6 w-6" />
        </Button>
      </div>
    </header>
  )
}