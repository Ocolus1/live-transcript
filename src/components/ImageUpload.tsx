import React, { useCallback } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { useStore } from '../store';

interface ImageUploadProps {
  onImageAnalyzed: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageAnalyzed }) => {
  const { addImage } = useStore();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          addImage({
            id: Date.now().toString(),
            url: e.target?.result as string,
            name: file.name,
            timestamp: Date.now()
          });
          onImageAnalyzed();
        };
        reader.readAsDataURL(file);
      }
    });
  };

  return (
    <div className="relative">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-500 transition-colors"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          multiple
        />
        <div className="flex flex-col items-center">
          <Upload className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm text-gray-600">
            Drop images here or click to upload
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Supports PNG, JPG up to 10MB
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;