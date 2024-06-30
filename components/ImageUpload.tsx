import { Plus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";

import Image from "next/image";
import { Button } from "./ui/button";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
}) => {
  const onUpload = (result: any, { widget }: { widget: any }) => {
    onChange(result.info.secure_url);
    widget.close();
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative h-[200px] w-[200px]">
            <div className="absolute right-0 top-0 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-1 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="rounded-lg object-cover"
              fill
            />
          </div>
        ))}
      </div>

      <CldUploadWidget uploadPreset="ro9w55cq" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button
              type="button"
              onClick={() => open()}
              className="dark:bg-grey-1 text-white "
            >
              <Plus className="mr-2 h-4 w-4" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
