'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'

const categories = ['testトップス', 'ボトムス', 'アウター', '靴', 'アクセサリー']
const colors = ['白', '黒', '赤', '青', '緑', '黄', 'ピンク', 'パープル', 'オレンジ', 'グレー']

export default function Register() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [clothingName, setClothingName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Firestoreの接続を確認
    const checkFirestoreConnection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'clothes'))
        console.log('Firestore connection successful', querySnapshot.size)
      } catch (error) {
        console.error('Firestore connection error:', error)
        setError('データベースへの接続に問題があります。')
      }
    }

    checkFirestoreConnection()
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    if (!clothingName || selectedCategories.length === 0 || selectedColors.length === 0) {
      setError("全ての必須項目を入力してください。")
      setIsSubmitting(false)
      return
    }

    try {
      console.log('Submitting data:', { clothingName, selectedCategories, selectedColors })
      const docRef = await addDoc(collection(db, "clothes"), {
        name: clothingName,
        categories: selectedCategories,
        colors: selectedColors,
        createdAt: new Date()
      })

      console.log('Document written with ID: ', docRef.id)
      // alert("衣類が正常に登録されました。")

      // Reset form
      setClothingName('')
      setSelectedCategories([])
      setSelectedColors([])

      // Navigate to confirmation page
      router.push('/register/confirmation')
    } catch (error) {
      console.error("Error adding document: ", error)
      setError("登録中にエラーが発生しました。もう一度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center bg-white border-b">
        <CardTitle className="text-2xl font-bold text-gray-800">衣類登録</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6 bg-white">
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="name">衣類名</Label>
            <Input 
              id="name" 
              placeholder="例: 白シャツ" 
              value={clothingName}
              onChange={(e) => setClothingName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2 mt-4">
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

          <div className="space-y-2 mt-4">
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

          <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
            {isSubmitting ? '登録中...' : '登録する'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}