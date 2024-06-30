"use client";

import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Themebutton from "./Themebutton";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

const links = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
];

const Navbar = () => {
  const { data, status } = useSession();
  const pathname = usePathname();
  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center justify-between w-full">
                <Link href="/admin/dashboard">
                  <h1 className="text-2xl font-medium">
                    Adham <span className="text-red-500">Nasser</span>
                  </h1>
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8 sm:items-center">
                {links.map((link) => (
                  <Link
                    href={link.href}
                    key={link.name}
                    prefetch
                    className={`${
                      pathname === link.href
                        ? "border-red-500 dark:text-white h-full inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                        : "border-transparent text-gray-500 hover:text-red-500 dark:text-gray-300 dark:hover:text-white dark:hover:border-gray-300 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition duration-150 ease-in-out "
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <Themebutton />
                {status === "authenticated" && (
                  <Button
                    size="sm"
                    onClick={() =>
                      signOut({ redirect: true, callbackUrl: "/" })
                    }
                  >
                    Sign Out
                  </Button>
                )}
              </div>
              <div className="-mr-2 flex items-center sm:hidden">
                <Themebutton />
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 dark:hover:bg-gray-800">
                  {open ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18 18 6M6 6l12 12"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                      />
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <Link
                  href={link.href}
                  key={link.name}
                  prefetch
                  className={`${
                    pathname === link.href
                      ? " border-red-500 bg-red-50 text-red-500 block pl-3 pr-4 py-2 border-l-4 text-base font-medium dark:bg-gray-800"
                      : " border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-red-500 block pl-3 pr-4 py-2 dark:hover:bg-gray-700 dark:hover:text-white text-base font-medium border-l-4"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
