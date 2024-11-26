import { Models } from "node-appwrite";
import FormattedDateTime from "./FormattedDateTime";
import { convertFileSize } from "@/lib/utils";

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
