import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import Search from "./Search";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/users.actions";

const Header = () => {
  return (
    <header className="hidden sm:flex justify-between items-center py-4 px-8">
      <Search />
      <div className="flex gap-2 items-center">
        <FileUploader />
        <form
          action={async () => {
            "use server";
            await signOutUser();
          }}
        >
          <Button type="submit" variant="secondary">
            <LogOut />
          </Button>
        </form>
      </div>
    </header>
  );
};
export default Header;
