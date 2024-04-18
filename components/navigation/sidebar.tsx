"use client";
import Icons from "@/lib/icons";
import { merge } from "@/utils/merge";
import Link from "next/link";
import { usePathname } from "next/navigation";

const iconStyles =
  "group-hover:md:animate-bounce-once duration-500 transition-transform ease-linear md:hover:scale-105";

export default function Sidebar() {
  const pathname = usePathname();
  const content = sidebarItems.map(({ title, icon, href }) => {
    const active = href === pathname;

    return (
      <Link
        href={href}
        key={title}
        className={merge(
          "flex flex-col md:flex-row gap-2 items-center md:pl-3 py-2 hover:bg-white/20 rounded-t-2xl md:rounded-tr-none md:rounded-s-2xl transition-colors ease-in-out duration-300 group md:px-5 justify-start",
          active ? "md:bg-white/60 md:text-background " : ""
        )}
      >
        {icon}
        <span className="text-sm md:text-base lg:text-lg capitalize">
          {title}
        </span>
      </Link>
    );
  });
  return (
    <nav className="fixed md:sticky bottom-0 w-full sm:px-20 md:top-0 md:h-screen bg-primary z-50 flex md:flex-col md:justify-start md:py-20 pt-3 md:gap-4 justify-between px-5 md:px-0 md:pl-1 lg:pl-2 rounded-t-xl md:rounded-tl-none md:rounded-e-xl text-white md:max-w-40 lg:max-w-44">
      {content}
    </nav>
  );
}

const sidebarItems: {
  title:
    | "home"
    | "movies"
    | "series"
    | "people"
    | "search"
    | "genres"
    | "profile";
  href: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "home",
    href: "/",
    icon: <Icons.home className={iconStyles} size={20} />,
  },
  {
    title: "movies",
    href: "/movies",
    icon: <Icons.movie className={iconStyles} size={20} />,
  },
  {
    title: "series",
    href: "/tv",
    icon: <Icons.tv className={iconStyles} size={20} />,
  },
  {
    title: "people",
    href: "/people",
    icon: <Icons.people className={iconStyles} size={20} />,
  },
  {
    title: "search",
    href: "/search",
    icon: <Icons.search className={iconStyles} size={20} />,
  },
  // {
  //   title: "genres",
  //   href: "/genres",
  //   icon: <Icons.genre className={iconStyles} size={20}/>,
  // },
];
