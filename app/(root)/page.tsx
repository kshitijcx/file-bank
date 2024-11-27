import Card from "@/components/Card";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";

const Home = async () => {
  const types = [];
  const files = await getFiles({ types });
  return (
    <div className="px-8 pb-4">
      <section>
        <h1 className="capitalize text-xl font-black mb-3">All Files</h1>
      </section>
      {files.total > 0 ? (
        <section className="flex flex-wrap gap-2 max-sm:flex-col max-sm:gap-4">
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
export default Home;
