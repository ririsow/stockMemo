'use client'

import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from 'lucide-react'

export default function RegistrationComplete() {
  const router = useRouter()

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold">登録完了</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-600">
            衣類の登録が正常に完了しました。ありがとうございます。
          </p>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button 
            className="w-full" 
            onClick={() => router.push('/')}
          >
            ホームページへ戻る
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => router.push('/clothes/register')}
          >
            新しい衣類を登録する
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}