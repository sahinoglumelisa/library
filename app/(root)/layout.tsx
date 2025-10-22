import { ReactNode } from "react";
import Header from "@/components/header";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

const Layout = async ({ children }: { children: ReactNode }) => {

  const session = await auth();
  if (!session) {
    // send unauthenticated users to the app-router sign-in page
    redirect("/sign-in");
  }
  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
