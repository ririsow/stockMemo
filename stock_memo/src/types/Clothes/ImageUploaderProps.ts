export interface ImageUploaderProps {
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
}