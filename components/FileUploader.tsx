"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "./ui/button";
import { Loader, UploadCloud, X } from "lucide-react";
import { getFileType } from "@/lib/utils";
import Thumbnail from "./Thumbnail";
import { MAX_FILE_SIZE } from "@/constants";
import { useToast } from "@/hooks/use-toast";
import { uploadFile } from "@/lib/actions/file.actions";
import { usePathname } from "next/navigation";

interface Props {
  ownerId: string;
  accountId: string;
}

const FileUploader = ({ ownerId, accountId}: Props) => {
  const path = usePathname();
  const { toast } = useToast();
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFiles(acceptedFiles);

      const uploadPromises = acceptedFiles.map(async (file) => {
        if (file.size > MAX_FILE_SIZE) {
          setFiles((prevFiles) =>
            prevFiles.filter((f) => f.name !== file.name)
          );
          return toast({
            description: (
              <p>
                <span>{file.name + " "}</span> is too large. Max file size is 50
                MB
              </p>
            ),
          });
        }
        return uploadFile({ file, ownerId, accountId, path }).then(
          (uploadedFile) => {
            if (uploadedFile) {
              setFiles((prevFiles) =>
                prevFiles.filter((f) => f.name !== file.name)
              );
            }
          }
        );
      });
      await Promise.all(uploadPromises);
    },
    [ownerId, accountId, path]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleRemoveFile = (
    e: React.MouseEvent<SVGElement, MouseEvent>,
    fileName: string
  ) => {
    e.stopPropagation();
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  return (
    <div {...getRootProps()} className="cursor-pointer">
      <input {...getInputProps()} />
      <Button type="button" className="">
        <UploadCloud size={30} />
        <p>Upload</p>
      </Button>
      {files.length > 0 && (
        <ul className="absolute bottom-5 right-10 space-y-2 w-48">
          <h4>Uploading</h4>
          {files.map((file, index) => {
            const { type, extension } = getFileType(file.name);
            return (
              <li
                key={`${file.name}-${index}`}
                className="flex gap-2 text-xs items-center"
              >
                <Thumbnail type={type} extension={extension} />
                <p className="w-28 whitespace-nowrap overflow-hidden text-ellipsis">
                  {file.name}
                </p>
                <Loader size={20} className="animate-spin" />
                <X
                  size={20}
                  className="cursor-pointer"
                  onClick={(e) => handleRemoveFile(e, file.name)}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default FileUploader;
