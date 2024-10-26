'use client'

import { useState } from 'react'
import { Plus, Minus, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type InventoryItem = {
  id: number;
  name: string;
  quantity: number;
}

export function HomeInventory() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [newItemName, setNewItemName] = useState('')

  const addItem = () => {
    if (newItemName.trim()) {
      setItems([...items, { id: Date.now(), name: newItemName, quantity: 1 }])
      setNewItemName('')
    }
  }

  const updateQuantity = (id: number, change: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
    ))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>家庭用在庫管理</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            type="text"
            placeholder="新しいアイテム"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <Button onClick={addItem}>追加</Button>
        </div>
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item.id} className="flex items-center justify-between bg-secondary p-2 rounded">
              <span>{item.name}</span>
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, -1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span>{item.quantity}</span>
                <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="destructive" onClick={() => removeItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}