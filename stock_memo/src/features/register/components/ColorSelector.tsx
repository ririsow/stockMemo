import { Badge } from "@/components/ui/badge"
import { COLORS } from "@/constants/clothingOptions"

interface ColorSelectorProps {
  selectedColors: string[]
  toggleColor: (color: string) => void
}

export function ColorSelector({ selectedColors, toggleColor }: ColorSelectorProps) {
  return (
    <div className="space-y-2 mt-4">
      <div>色（複数選択可）</div>
      <div className="flex flex-wrap gap-2 max-w-md">
        {COLORS.map((color) => (
          <Badge
            key={color}
            variant={selectedColors.includes(color) ? "default" : "outline"}
            className="cursor-pointer inline-flex items-center justify-center px-2 py-1 text-xs font-semibold whitespace-nowrap"
            onClick={() => toggleColor(color)}
          >
            <span
              className="w-3 h-3 rounded-full inline-block mr-1"
              style={{ backgroundColor: color }}
              aria-hidden="true"
            />
            {color}
          </Badge>
        ))}
      </div>
    </div>
  )
}