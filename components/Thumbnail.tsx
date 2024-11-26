import { getFileIcon } from "@/lib/utils";

interface Props {
  type: string;
  extension: string;
  size?: string;
}

const Thumbnail = ({ type, extension, size = "22" }: Props) => {
  const Icon = getFileIcon(extension, type);
  return (
    <div>
      <Icon size={size} />
    </div>
  );
};
export default Thumbnail;
