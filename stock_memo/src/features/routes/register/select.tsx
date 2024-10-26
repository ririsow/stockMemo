// src/components/ui/select.tsx
import React from 'react';
import { Label } from "@/components/ui/label"

interface SelectProps {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({ id, label, options, onChange }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full border border-gray-300 rounded-md p-2"
      >
        <option value="">選択してください</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
