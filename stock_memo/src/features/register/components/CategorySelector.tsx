import { Badge } from "@/components/ui/badge"
import { CATEGORIES } from "@/constants/clothingOptions"

interface CategorySelectorProps {
  selectedCategories: string[]
  toggleCategory: (category: string) => void
}

export function CategorySelector({ selectedCategories, toggleCategory }: CategorySelectorProps) {
  return (
    <div className="space-y-2 mt-4">
      <div>カテゴリー（複数選択可）</div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
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
  )
}
