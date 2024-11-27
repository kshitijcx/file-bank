import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { getFileTypesParams } from "@/lib/utils";
import { Models } from "node-appwrite";

const page = async ({ searchParams, params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const types = getFileTypesParams(type) as FileType[];
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";

  const files = await getFiles({ types, searchText, sort });
  return (
    <div className="px-8 pb-4">
      <section className="mb-3">
        <h1 className="capitalize text-xl font-black mb-3">{type}</h1>
        <div className="w-fit">
          <Sort />
        </div>
      </section>
      {files.total > 0 ? (
        <section className="flex flex-wrap gap-2">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p>No Files Uploaded</p>
      )}
    </div>
  );
};
export default page;
