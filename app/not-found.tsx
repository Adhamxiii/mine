import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="text-center pt-20 relative">
      <div className="text-9xl font-bold text-red-700 dark:text-red-500 flex justify-center items-center">
        4
        <span>
          <Image
            src="/404.png"
            alt="404"
            width={200}
            height={200}
            className="inline"
          />
        </span>
        4
      </div>

      <p className="text-2xl font-bold">Page Not Found</p>

      <p className="text-lg">The page you are looking for does not exist.</p>

      <p className="text-lg">Please check the URL and try again.</p>

      <Link
        href="/"
        className="text-lg text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-500"
      >
        Back to Home
      </Link>

      <Image
        src="/404-red.png"
        alt="404"
        width={200}
        height={200}
        className="absolute right-0 size-64"
      />
    </div>
  );
}
