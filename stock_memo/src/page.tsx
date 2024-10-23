import InventoryList from '@/components/InventoryList'
import AddItemForm from '@/components/AddItemForm'

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">家庭用在庫管理</h1>
      <AddItemForm />
      <InventoryList />
    </div>
  )
}