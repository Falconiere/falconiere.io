import Image from "next/image";
import Link from "next/link";
import avatar from "@/assets/avatar.jpg";
const LayoutHeader = () => (
  <div className="pt-8 pb-4 w-full sticky">
    <div className="w-full h-full max-w-6xl mx-auto px-8 flex justify-between items-center">
      <Link href="/" className="flex gap-4 items-center">
        <Image
          src={avatar}
          alt="Falconiere Avatar"
          className="block h-8 sm:h-10 w-8 sm:w-10 rounded-full ring-2 ring-white mx-auto"
        />
        <div className="leading-[12px]">
          <h2 className="text-sm sm:text-lg">Falconiere Barbosa</h2>
          <span className="text-[14px] sm:text-lg text-pink-500">
            Senior Software Engineer
          </span>
        </div>
      </Link>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link
              href="/about"
              className="text-pink-500 dark:hover:text-pink-400"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-pink-500 dark:hover:text-pink-400"
            >
              Blog
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);
export { LayoutHeader };
