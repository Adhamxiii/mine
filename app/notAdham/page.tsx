import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotAdhamPage = () => {
  return (
    <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
      <div className="space-y-4 flex items-center justify-center gap-12 max-md:flex-col max-md:gap-6">
        <Image
          src="https://i.pinimg.com/564x/15/cf/1a/15cf1ab04741f0356a5d66d5c67992f5.jpg"
          alt=""
          width={400}
          height={400}
          className="rounded-full shadow-lg dark:shadow-gray-800 max-md:size-52"
        />
        <div className="space-y-6 max-md:text-center max-md:space-y-4">
          <h1 className="text-7xl font-bold max-md:text-5xl">Oops!</h1>
          <h2 className="text-5xl font-bold max-md:text-3xl">
            You are Not <span className="text-red-500">Adham</span>
          </h2>
          <p className="text-xl max-md:text-sm">
            You are not allowed to visit this page
          </p>
          <p className="text-xl max-md:text-sm">Thank you</p>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="text-lg text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
            >
              <Button variant="outline" size="sm">
                Go Back Home
              </Button>
            </Link>
            <p className="text-lg">or</p>
            <Link
              href="mailto:adhamxiii22@gmail.com"
              className="text-lg text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500 max-md:text-sm"
            >
              Contact with Adham
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotAdhamPage;
