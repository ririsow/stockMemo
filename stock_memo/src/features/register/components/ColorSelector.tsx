import { Badge } from "@/components/ui/badge"
import { colors } from "@/constants/clothingOptions"

interface ColorSelectorProps {
  selectedColors: string[]
  toggleColor: (color: string) => void
}

export function ColorSelector({ selectedColors, toggleColor }: ColorSelectorProps) {
  return (
    <div className="space-y-2 mt-4">
      <div>色（複数選択可）</div>
      <div className="flex flex-wrap gap-2">
        {colors.map((color) => (
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
  )
}
