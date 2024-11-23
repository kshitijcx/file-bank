import Header from "@/components/Header";
import MobileNavigation from "@/components/MobileNavigation";
import Sidebar from "@/components/Sidebar";
import { getCurrentUser } from "@/lib/actions/users.actions";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {

  const currentUser = await getCurrentUser();
  if(!currentUser) return redirect('/login')

  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser}/>
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser}/> <Header />
        <div className="">{children}</div>
      </section>
    </main>
  );
};
export default Layout;