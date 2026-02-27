'use client';
import { useState, useRef, ChangeEvent, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import CircularProgressBar from "./ProgressBar/CircularProgressBar";
import { IAvatar } from "@/lib/interfaces";

interface ImageUploadCardProps {
  avatar?: IAvatar;
  setAvatar: React.Dispatch<React.SetStateAction<IAvatar>>;
}

const ImageUploadCard: React.FC<ImageUploadCardProps> = ({
  avatar,
  setAvatar,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUploading, setimageUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  useEffect(() => {
    if(avatar) setPreviewUrl(avatar.url);
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const uploadToCloudinary = async (
    file: File,
    onProgress: (percent: number) => void // Progress callback pass karein
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);
    formData.append("tags", "temporary");

    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    try {
      console.log("uploading image")
      const res = await axios.post(url, formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress(percentCompleted);
          }
        },
      });
      console.log(res)
      return {
        url: res.data.secure_url,
        publicId: res.data.public_id
      };

    } catch (error: any) {
      console.error("Cloudinary Upload Error:", error.response?.data || error.message);
      throw new Error("Upload failed. Please try again.");
    }
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    try {
      if(file === undefined) return;
      setimageUploading(true);
      setUploadProgress(0);

      const result = await uploadToCloudinary(file, (percent) => {
        setUploadProgress(percent);
      });

      setAvatar({ url: result.url, publicId: result.publicId });
      setPreviewUrl(result.url);

    } catch (error) {
      console.error("Upload Error:", error);
      alert("Kucch gadbad ho gayi!");
    } finally {
      setimageUploading(false);
      setUploadProgress(0)
    }
  }

  return (
    <div className="flex items-center gap-6 mb-8">
      <div className="relative">
        <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-3xl font-bold overflow-hidden">
          {previewUrl === "" ? "GL" : (
            <Image src={previewUrl} width={500} height={500} alt="avatar" className="w-full h-full object-cover"/>
          )}
          {imageUploading === true && <span className="absolute">
            <CircularProgressBar value={uploadProgress} color="#ff0000" size="2rem" />
          </span>}
        </div>

        {/* Hidden Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
        <motion.button
          type='button'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleButtonClick}
          className="absolute -bottom-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg"
        >
          <Camera className="w-4 h-4" />
        </motion.button>
      </div>
      <div>
        <p className="font-medium text-foreground">Upload Barber Image</p>
        <p className="text-sm text-muted-foreground">
          JPG, PNG or SVG. Max 2MB.
        </p>
      </div>
    </div>
  )
}

export default ImageUploadCard;