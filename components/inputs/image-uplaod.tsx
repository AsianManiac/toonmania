import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  onChange: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  const handleUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const imageUrl = e.target?.result as string;

        // Upload the image file to the public/uploads directory
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const uploadedImageUrl = `/uploads/${data.filename}`; // Relative path to the uploaded image
          onChange(uploadedImageUrl);
        } else {
          console.error("Error uploading image");
        }
      };

      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }, [onChange]);

  return (
    <div className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
      <TbPhotoPlus />
      <div className="font-semibold text-lg">Upload Image</div>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
};

export default ImageUpload;
