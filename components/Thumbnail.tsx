import { getFileIcon } from "@/lib/utils";

interface Props {
  type: string;
  extension: string;
}

const Thumbnail = ({ type, extension }: Props) => {
  const Icon = getFileIcon(extension, type);
  return <div>
    <Icon size={22}/>
  </div>;
};
export default Thumbnail;
