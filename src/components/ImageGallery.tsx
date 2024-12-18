import React from 'react';
import { X, ZoomIn } from 'lucide-react';
import { UploadedImage } from '../services/image/types';

interface ImageGalleryProps {
  images: UploadedImage[];
  onRemoveImage: (id: string) => void;
  onImageClick: (image: UploadedImage) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onRemoveImage,
  onImageClick,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Context Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <div key={image.id} className="relative group">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={image.url}
                alt={image.name}
                className="w-full h-full object-cover cursor-pointer transition-transform group-hover:scale-105"
                onClick={() => onImageClick(image)}
              />
            </div>
            <button
              onClick={() => onRemoveImage(image.id)}
              className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => onImageClick(image)}
              className="absolute bottom-2 right-2 p-1.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ZoomIn className="w-4 h-4 text-gray-600" />
            </button>
            <p className="mt-2 text-sm text-gray-600 truncate">{image.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;