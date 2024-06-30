import SideNavbar from "@/components/SideNavbar";
import { cn } from "@/lib/utils";
import ToasterProvider from "@/providers/ToasterProvider";
import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
};

export const metadata = {
  title: 'AdhamZ Portfolio - Admin',
  description: 'Admin dashboard for AdhamZ Portfolio.',
};

export default function Layout({ children }: LayoutProps) {
  return (
    <main className={cn("flex min-h-screen w-full")}>
      <ToasterProvider />
      <SideNavbar />
      <div className="p-8 w-full">{children}</div>
    </main>
  );
}
