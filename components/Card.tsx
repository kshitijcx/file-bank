import Link from "next/link";
import { Models } from "node-appwrite";
import Thumbnail from "./Thumbnail";
import { convertFileSize } from "@/lib/utils";
import FormattedDateTime from "./FormattedDateTime";
import ActionDropdown from "./ActionDropdown";

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <div className="relative">
      <Link
        href={file.url}
        target="_blank"
        className="border-2 w-40 h-40 text-xs flex flex-col justify-between p-3"
      >
        <div>
          <Thumbnail type={file.type} extension={file.extension} size="40" />
        </div>
        <div className="flex flex-col gap-1">
          <p className="whitespace-nowrap overflow-hidden text-ellipsis">
            {file.name}
          </p>
          <p className="text-neutral-400">{convertFileSize(file.size)}</p>
          <FormattedDateTime date={file.$createdAt} />
          <p className="text-neutral-400">By: {file.owner.fullName}</p>
        </div>
      </Link>
      <div className="absolute right-3 top-3">
        <ActionDropdown file={file} />
      </div>
    </div>
  );
};
export default Card;
