import { Models } from "node-appwrite";
import FormattedDateTime from "./FormattedDateTime";
import { convertFileSize } from "@/lib/utils";
import React from "react";
import { Input } from "./ui/input";
import { X } from "lucide-react";

export const FileDetails = ({ file }: { file: Models.Document }) => {
  return (
    <div>
      <h1>{file.name}</h1>
      <div className="text-neutral-400 flex gap-1">
        Created At:
        <FormattedDateTime date={file.$createdAt} />
      </div>
      <p className="text-neutral-400">Format: {file.extension}</p>
      <p className="text-neutral-400">Size: {convertFileSize(file.size)}</p>
      <p className="text-neutral-400">Owner: {file.owner.fullName}</p>
      <div className="text-neutral-400 flex gap-1">
        Last Edit:
        <FormattedDateTime date={file.$updatedAt} />
      </div>
    </div>
  );
};

interface Props {
  file: Models.Document;
  onInputChange: React.Dispatch<React.SetStateAction<string[]>>;
  onRemove: (email: string) => void;
}

export const ShareInput = ({ file, onInputChange, onRemove }: Props) => {
  return (
    <div className="space-y-2">
      <p>Share file with other users</p>
      <Input
        type="email"
        placeholder="Enter email"
        onChange={(e) => onInputChange(e.target.value.trim().split(","))}
      />
      <div className="flex justify-between">
        <p>Shared with</p>
        <p>{file.users.length + " "}users</p>
      </div>
      <ul>
        {file.users.map((email: string) => (
          <li key={email} className="flex items-center justify-between">
            {email}
            <X
              size={20}
              onClick={() => onRemove(email)}
              className="hover:cursor-pointer"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
