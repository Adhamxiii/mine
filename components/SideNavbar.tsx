"use client";

import { useWindowWidth } from "@react-hook/window-size";
import {
  BriefcaseBusiness,
  ChevronRight,
  FolderRoot,
  LayoutDashboard,
  SquareUserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Nav } from "./ui/nav";

const SideNavbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const onlyWidth = useWindowWidth();
  const mobileWidth = onlyWidth < 768;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative min-w-fit border-r px-3 pb-10 pt-24">
      {!mobileWidth && (
        <div className="absolute top-7 right-[-20px]">
          <Button
            variant="secondary"
            className="rounded-full p-2"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
      <Nav
        isCollapsed={mobileWidth ? true : isCollapsed}
        links={[
          {
            title: "Dashboard",
            href: "/admin/dashboard",
            icon: LayoutDashboard,
            variant: "default",
          },
          {
            title: "Projects",
            href: "/admin/projects",
            icon: FolderRoot,
            variant: "ghost",
          },
          {
            title: "Experience",
            href: "/admin/experience",
            icon: BriefcaseBusiness,
            variant: "ghost",
          },
        ]}
      />
    </div>
  );
};

export default SideNavbar;
