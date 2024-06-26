"use client";

import { merge } from "@/utils/merge";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button from "../Button";

type Props = {
  tabItems: { query: string; title: string }[];
  defaultTab: string;
  styles?: string;
  activeStyles?: string;
  scroll?: boolean;
  buttonStyles?: string;
};

export default function Tab({
  tabItems,
  defaultTab,
  styles = "",
  activeStyles = "",
  scroll = true,
  buttonStyles = "",
}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const tab = searchParams.get("tab") ?? defaultTab;

  const updateTab = (newtab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", newtab);
    router.replace(`${pathname}?${params.toString()}`, { scroll });
  };

  return (
    <div
      className={merge("flex items-center  px-5 gap-2 md:gap-4 mb-5", styles)}
    >
      {tabItems.map(({ title, query }) => {
        const activeTab = query === tab;
        return (
          <Button
            key={title}
            onClick={() => updateTab(query)}
            className={merge(
              "uppercase hover:text-accent hover:opacity-70 text-sm  md:text-base min-w-max py-4 lg:text-lg",
              activeTab
                ? `border-b-4  transition-colors duration-200 ease-in-out font-bold  ${activeStyles}`
                : "",
              buttonStyles
            )}
          >
            {title}
          </Button>
        );
      })}
    </div>
  );
}
