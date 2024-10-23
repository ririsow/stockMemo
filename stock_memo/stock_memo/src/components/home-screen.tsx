import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShirtIcon, ClipboardList, Layers, Heart } from "lucide-react"

export function HomeScreenComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-pink-100">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader className="text-center bg-white">
          <CardTitle className="text-3xl font-bold text-gray-800">衣類管理アプリ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 p-6 bg-white">
          <Button className="w-full h-20 text-xl" variant="outline">
            <ShirtIcon className="mr-2 h-6 w-6 text-green-500" />
            登録
          </Button>
          <Button className="w-full h-20 text-xl" variant="outline">
            <ClipboardList className="mr-2 h-6 w-6 text-blue-500" />
            棚卸し
          </Button>
          <Button className="w-full h-20 text-xl" variant="outline">
            <Layers className="mr-2 h-6 w-6 text-orange-500" />
            カテゴリー別
          </Button>
          <Button className="w-full h-20 text-xl" variant="outline">
            <Heart className="mr-2 h-6 w-6 text-red-500" />
            お気に入り
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}