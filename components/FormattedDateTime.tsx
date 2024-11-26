import { formatDateTime } from "@/lib/utils";

const FormattedDateTime = ({ date }: { date: string }) => {
  return <p className="text-neutral-400">
    {formatDateTime(date)}
  </p>;
};
export default FormattedDateTime;
