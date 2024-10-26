import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white shadow-sm p-4 mt-auto">
      <div className="max-w-md mx-auto flex justify-between items-center">
        <span className="text-sm text-gray-600">© 2024 衣類管理アプリ</span>
        <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
          <Settings className="h-6 w-6" />
        </Button>
      </div>
    </footer>
  )
}