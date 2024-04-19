"use client";
import Icons from "@/lib/icons";
import { useEffect, useState } from "react";
import Button from "../Button";

export default function BackToTop() {
  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => window.removeEventListener("scroll", handleScroll, true);
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {showButton ? (
        <Button
          className="fixed bottom-20 md:bottom-10 right-1 sl:right-2 md:right-3 hover:scale-105 hover:text-accent  transition-colors duration-150 ease-in-out z-[1000] border  rounded-full p-2 hover:border-accent animate-slideIn"
          onClick={scrollToTop}
        >
          <Icons.top className="text-4xl" />
          <span className="sr-only">top</span>
        </Button>
      ) : null}
    </>
  );
}
