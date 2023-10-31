import Image from "next/image";
import avatar from "@/assets/avatar.jpg";
import Link from "next/link";
const LayoutSidebar = () => (
  <aside className="sidebar bg-black h-full w-full flex flex-col items-center p-8">
    <Link href="/">
      <Image
        src={avatar}
        alt="Falconiere Avatar"
        className="inline-block h-20 w-20 rounded-full ring-2 ring-white mx-auto"
      />
    </Link>
    <p className="text-white text-center text-lg font-medium mt-4">
      Hi, my name is Falconiere R. Barbosa and I am a senior software engineer.
      Welcome to my website!
    </p>
  </aside>
);

export { LayoutSidebar };
