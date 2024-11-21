import { useClothingRegister } from "../hooks/useClothingRegister"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CategorySelector } from "./CategorySelector"
import { ColorSelector } from "./ColorSelector"
import { ImageUploader } from "./ImageUploder"
import { ImageUploaderProps} from "@/types/Clothes/ImageUploaderProps"

export function RegisterForm() {
  const {
    clothingName,
    setClothingName,
    selectedCategories,
    toggleCategory,  // 追加
    selectedColors,
    toggleColor,     // 追加
    imageFile, // 追加
    setImageFile, // 追加
    error,
    isSubmitting,
    handleSubmit,
  } = useClothingRegister()

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center bg-white border-b">
        <CardTitle className="text-2xl font-bold text-gray-800">RegisterForm衣類登録</CardTitle>
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

          {/* toggleCategory を渡す */}
          <CategorySelector 
            selectedCategories={selectedCategories} 
            toggleCategory={toggleCategory} 
          />

          {/* toggleColor を渡す */}
          <ColorSelector 
            selectedColors={selectedColors} 
            toggleColor={toggleColor} 
          />
          {/* 画像アップロード */}
          <ImageUploader imageFile={imageFile} setImageFile={setImageFile} />

          <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
            {isSubmitting ? '登録中...' : '登録する'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
