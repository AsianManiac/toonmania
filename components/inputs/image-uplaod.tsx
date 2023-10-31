import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { DownloadCloud, File, X } from "lucide-react";
import axios from "axios";

interface ImageUploadProps {
  onChange: (value: string) => void;
  value: string;
  accept?: string;
  multiple?: boolean;
  endpoint?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  value,
  accept = "image/*",
  multiple = false,
  endpoint = "/api/uploads",
}) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [fileType, setFileType] = useState<
    "image" | "video" | "document" | "other"
  >("other");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [progress, setProgress] = useState(0);
  // @ts-ignore
  const handleChange = ({ target }) => {
    if (target.files[0]) {
      const file = target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
      console.log("Selected file:", file);

      if (accept.startsWith("image/")) {
        setFileType("image");
        setSelectedImage(URL.createObjectURL(file));
      } else if (accept.startsWith("video/")) {
        setFileType("video");
        const blobUrl = URL.createObjectURL(file);
        setSelectedImage(blobUrl);
      } else if (accept === "application/pdf") {
        setFileType("document");
      } else {
        setFileType("other");
      }
    }
  };

  const clearImage = () => {
    setSelectedImage("");
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await axios.post(`${endpoint}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (ProgressEvent) => {
          const percentageCompleted = Math.round(
            ((ProgressEvent.loaded ?? 0) * 100) / (ProgressEvent.total ?? 1)
          );

          setProgress(percentageCompleted);
        },
      });

      if (res.status === 200) {
        toast.success("Image uploaded successfully!");
        const responseJson = await res.data;
        const uploadedImage = responseJson.source;
        setImageUrl(uploadedImage);
        onChange(uploadedImage);
        console.log("Successful Upload", responseJson.source);
      } else {
        toast.error("Error uploading image");
      }
    } catch (error: any) {
      toast.error("Choose a valid image format");
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="relative cursor-pointer hover:opacity-70 mb-4 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Upload a File..</div>

          {selectedImage ? (
            <div className="absolute inset-0 w-full h-full">
              <Button
                onClick={clearImage}
                className="absolute top-3 right-4"
                variant={"ghost"}
              >
                <X className="h-9 w-9 z-40 font-bold" color="black" />
              </Button>
              {fileType === "image" ? (
                <Image
                  fill
                  style={{ objectFit: "cover" }}
                  src={selectedImage}
                  alt="Upload Image"
                />
              ) : (
                <span className="p-16 text-red-500 italic font-bold">
                  Unsupported File Type
                </span>
              )}
              {!uploading && (
                <Button
                  type="submit"
                  variant="destructive"
                  size="sm"
                  className={`absolute top-[50%] left-[40%]`}
                >
                  Upload
                </Button>
              )}
              {uploading && (
                <div className="h-[10px] absolute top-[50%] left-[30%] m-auto w-56 border rounded overflow-hidden">
                  <div
                    className="transition-all duration-1300 bg-white h-full"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <input
              type="file"
              name="file"
              accept={accept}
              multiple
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          )}
        </div>
      </form>
      {/* {imageUrl && (
        <Image
          src={`/images/${imageUrl}`}
          className="w-20 h-20 rounded-full cursor-pointer"
          alt="Images"
          width={100}
          height={100}
        />
      )} */}
    </div>
  );
};

export default ImageUpload;
