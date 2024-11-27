"use client";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import { useRouter } from "next/navigation";
import { useDebounce } from "use-debounce";

const Search = () => {
  const [query, setQuery] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const [debouncedQuery] = useDebounce(query, 300);

  const [results, setResults] = useState<Models.Document[]>([]);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    const fetchFiles = async () => {
      if (debouncedQuery.length === 0) {
        setResults([]);
        setOpen(false);
        return router.push(path.replace(searchParams.toString(), ""));
      }

      const files = await getFiles({ types: [], searchText: debouncedQuery });
      setResults(files.documents);
      setOpen(true);
    };
    fetchFiles();
  }, [debouncedQuery]);

  useEffect(() => {
    if (!searchQuery) {
      setQuery("");
    }
  }, [searchQuery]);

  const handleClickItem = (file: Models.Document) => {
    setOpen(false);
    setResults([]);
    router.push(
      `/${
        file.type === "video" || file.type === "video"
          ? "media"
          : file.type + "s"
      }?query=${query}`
    );
  };

  return (
    <div className="flex gap-2 items-center relative">
      <SearchIcon size={24} />
      <Input
        value={query}
        placeholder="Search..."
        className="border-2"
        onChange={(e) => setQuery(e.target.value)}
      />
      {open && (
        <ul className="absolute -bottom-16 left-10 bg-black p-4 rounded-lg border hover:cursor-pointer">
          {results.length > 0 ? (
            results.map((item) => (
              <li key={item.$id} onClick={() => handleClickItem(item)}>
                {item.name}
              </li>
            ))
          ) : (
            <p>No files found</p>
          )}
        </ul>
      )}
    </div>
  );
};
export default Search;
