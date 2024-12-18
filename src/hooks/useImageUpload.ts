import { useStore } from '../store';

export const useImageUpload = () => {
  const { images, addImage, removeImage } = useStore();

  const handleImageUpload = (file: File) => {
    const newImage = {
      id: Date.now().toString(),
      url: URL.createObjectURL(file),
      name: file.name,
      timestamp: Date.now(),
    };
    addImage(newImage);
  };

  return {
    images,
    uploadImage: handleImageUpload,
    removeImage,
  };
};