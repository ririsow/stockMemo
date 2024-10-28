'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

const categories = ['トップス', 'ボトムス', 'アウター', '靴', 'アクセサリー']
const colors = ['白', '黒', '赤', '青', '緑', '黄', 'ピンク', 'パープル', 'オレンジ', 'グレー']

export default function Register() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  const toggleColor = (color: string) => {
    setSelectedColors(prev => 
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center bg-white border-b">
        <CardTitle className="text-2xl font-bold text-gray-800">衣類登録</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6 bg-white">
        <div className="space-y-2">
          <Label htmlFor="name">衣類名</Label>
          <Input id="name" placeholder="例: 白シャツ" />
        </div>
        
        <div className="space-y-2">
          <Label>カテゴリー（複数選択可）</Label>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge 
                key={category} 
                variant={selectedCategories.includes(category) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>色（複数選択可）</Label>
          <div className="flex flex-wrap gap-2">
            {colors.map(color => (
              <Badge 
                key={color} 
                variant={selectedColors.includes(color) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleColor(color)}
              >
                {color}
              </Badge>
            ))}
          </div>
        </div>

        <Button className="w-full">登録する</Button>
      </CardContent>
    </Card>
  )
}