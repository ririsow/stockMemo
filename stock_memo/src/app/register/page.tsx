// src/app/Register.tsx
"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/features/routes/register/select" // Selectをインポート


export default function Register() {
  const categories = [
    { value: 'tops', label: 'トップス' },
    { value: 'bottoms', label: 'ボトムス' },
    { value: 'outerwear', label: 'アウター' },
  ];

  const sizes = [
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
  ];

  const brands = [
    { value: 'brandA', label: 'ブランドA' },
    { value: 'brandB', label: 'ブランドB' },
    { value: 'brandC', label: 'ブランドC' },
  ];

  return (
    <Card className="w-full max-w-md mx-auto shadow-md">
      <CardHeader className="text-center bg-white border-b">
        <CardTitle className="text-2xl font-bold text-gray-800">衣類登録</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-6 bg-white">
        <div className="space-y-2">
          <Label htmlFor="name">衣類名</Label>
          <Input id="name" placeholder="例: 白シャツ" />
        </div>
        <Select 
          id="category" 
          label="カテゴリー" 
          options={categories} 
          onChange={(value) => console.log(value)} 
        />
        <Select 
          id="size" 
          label="サイズ" 
          options={sizes} 
          onChange={(value) => console.log(value)} 
        />
        <Select 
          id="brand" 
          label="ブランド" 
          options={brands} 
          onChange={(value) => console.log(value)} 
        />
        <div className="space-y-2">
          <Label htmlFor="color">色</Label>
          <Input id="color" placeholder="例: 白" />
        </div>
        <Button className="w-full">登録する</Button>
      </CardContent>
    </Card>
  );
}
