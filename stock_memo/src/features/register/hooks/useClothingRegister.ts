import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { db } from '@/lib/firebase'
import { collection, addDoc, getDocs } from 'firebase/firestore'

export function useClothingRegister() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])
  const [clothingName, setClothingName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
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
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    )
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
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
        createdAt: new Date(),
      })

      console.log('Document written with ID: ', docRef.id)
      setClothingName('')
      setSelectedCategories([])
      setSelectedColors([])
      router.push('/clothes/register/confirmation')
    } catch (error) {
      console.error("Error adding document: ", error)
      setError("登録中にエラーが発生しました。もう一度お試しください。")
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    clothingName,
    setClothingName,
    selectedCategories,
    setSelectedCategories,
    selectedColors,
    setSelectedColors,
    error,
    isSubmitting,
    handleSubmit,
    toggleCategory,
    toggleColor,
  }
}