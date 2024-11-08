import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShirtIcon, ClipboardList, Layers, Heart } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center bg-white border-b">
        <CardTitle className="text-2xl font-bold text-gray-800">メインメニュー</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6 bg-white">
        <Button className="w-full h-16 text-lg justify-start px-4" variant="outline" asChild>
          <Link href="/clothes/register">
            <ShirtIcon className="mr-3 h-6 w-6 text-green-500" />
            <span className="flex-grow text-left">登録</span>
          </Link>
        </Button>
        <Button className="w-full h-16 text-lg justify-start px-4" variant="outline" asChild>
        <Link href="/clothes/list">
            <ClipboardList className="mr-3 h-6 w-6 text-blue-500" />
            <span className="flex-grow text-left">棚卸し</span>
          </Link>
        </Button>
        <Button className="w-full h-16 text-lg justify-start px-4" variant="outline">
          <Layers className="mr-3 h-6 w-6 text-orange-500" />
          <span className="flex-grow text-left">カテゴリー別</span>
        </Button>
        <Button className="w-full h-16 text-lg justify-start px-4" variant="outline">
          <Heart className="mr-3 h-6 w-6 text-red-500" />
          <span className="flex-grow text-left">お気に入り</span>
        </Button>
      </CardContent>
    </Card>
  )
}