"use client";
import { navItems } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const path = usePathname();

  return (
    <nav className="py-4 px-8 space-y-16 border border-r-2 hidden sm:block">
      <Link href="/">
        <h1 className="font-black text-2xl hover:cursor-pointer text-center">
          FileBank
        </h1>
      </Link>
      <ul className="flex flex-col gap-6">
        {navItems.map((item, index) => (
          <Link href={item.url} key={index}>
            <li
              className={`flex items-center gap-4 hover:underline rounded-full px-4 py-3 ${
                path === item.url
                  ? "bg-white text-black"
                  : "border border-slate-700"
              }`}
            >
              <item.icon size={22} />
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
      <div className="flex gap-2 justify-center items-center">
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
    </nav>
  );
};
export default Sidebar;
