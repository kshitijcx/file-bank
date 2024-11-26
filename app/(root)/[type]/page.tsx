import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";

const page = async ({ params }: SearchParamProps) => {
  const type = ((await params)?.type as string) || "";
  const files = await getFiles();
  return (
    <div className="px-10">
      <section>
        <h1 className="capitalize">{type}</h1>
        <div className="flex justify-between">
          <p>
            Total: <span>0 MB</span>
          </p>
          <div className="flex gap-2">
            Sort By:
            <Sort />
          </div>
        </div>
      </section>
      {files.total > 0 ? (
        <section>
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file}/>
          ))}
        </section>
      ) : (
        <p>No Files Uploaded</p>
      )}
    </div>
  );
};
export default page;
