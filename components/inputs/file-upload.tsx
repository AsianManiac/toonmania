import Image from "next/image";
import { useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { DownloadCloud, File, X } from "lucide-react";
import axios from "axios";

interface FileUploadProps {
  onChange: (value: string) => void;
  value: string;
  accept?: string;
  multiple?: boolean;
  endpoint?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onChange,
  value,
  accept = "image/*",
  multiple = false,
  endpoint = "/api/uploads/soundtracks",
}) => {
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>("");

  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState(0);
  // @ts-ignore
  const handleChange = ({ target }) => {
    if (target.files[0]) {
      const file = target.files[0];
      setSelectedImage(URL.createObjectURL(file));
      setSelectedFile(file);
      console.log("Selected file:", file);
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
      toast.error("Choose a valid file format for the soundtrack");
      //   console.error(e);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="relative cursor-pointer hover:opacity-70 mb-4 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
          {selectedImage ? (
            <div className="absolute inset-0 w-full h-full">
              <div className="flex flex-grow justify-start py-16">
                <Button onClick={clearImage} variant={"ghost"}>
                  <X className="h-6 w-6 font-bold" color="black" />
                </Button>
                <div className="flex flex-row items-center mr-6">
                  <File className="h-12 w-12" />
                  <div className="mr-3">
                    <p className="text-base font-semibold line-clamp-1">
                      Filename: {imageUrl}
                    </p>
                    <p className="text-sm ">Filesize: </p>
                  </div>
                </div>
                {!uploading && (
                  <Button type="submit" variant="default" size="sm">
                    Upload
                  </Button>
                )}
              </div>
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
            <>
              <input
                type="file"
                name="file"
                accept={accept}
                multiple
                onChange={handleChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />

              <TbPhotoPlus size={50} />
              <div className="font-semibold text-lg">Upload a File..</div>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default FileUpload;
