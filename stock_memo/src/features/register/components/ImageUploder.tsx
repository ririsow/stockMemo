import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageUploaderProps} from "@/types/Clothes/ImageUploaderProps"


export const ImageUploader: React.FC<ImageUploaderProps> = ({ imageFile, setImageFile }) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="image">画像アップロード</Label>
      <Input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files?.[0]) {
            setImageFile(e.target.files[0]);
          } else {
            setImageFile(null);
          }
        }}
      />
      {imageFile && (
        <p className="text-sm text-gray-600">
          選択されたファイル: <strong>{imageFile.name}</strong>
        </p>
      )}
    </div>
  );
};
