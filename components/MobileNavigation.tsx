"use client";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/constants";
import { LogOut, Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import FileUploader from "./FileUploader";
import { signOutUser } from "@/lib/actions/users.actions";

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <header className="hidden max-sm:flex justify-between px-4 py-2">
      <h1 className="text-xl font-black">FileBank</h1>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Menu size={24} />
        </SheetTrigger>
        <SheetContent>
          <SheetTitle>
            <div className="flex gap-2 items-center mb-6">
              <Image
                width={20}
                height={20}
                alt="avatar"
                src={avatar}
                className="rounded-2xl"
              />
              <div className="text-xs">
                <p>{fullName}</p>
                <p>{email}</p>
              </div>
            </div>
          </SheetTitle>
          <nav>
            <ul className="flex flex-col gap-5 text-sm">
              {navItems.map((item, index) => (
                <Link href={item.url} key={index}>
                  <li
                    className={`flex items-center gap-4 hover:underline rounded-full px-3 py-2 ${
                      path === item.url
                        ? "bg-white text-black"
                        : "border border-slate-700"
                    }`}
                  >
                    <item.icon size={20} />
                    {item.name}
                  </li>
                </Link>
              ))}
              <li>
                <FileUploader ownerId={ownerId} accountId={accountId} />
              </li>
              <li>
                <Button
                  type="submit"
                  variant="secondary"
                  onClick={async () => {
                    await signOutUser();
                  }}
                >
                  <LogOut />
                </Button>
              </li>
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
};
export default MobileNavigation;
