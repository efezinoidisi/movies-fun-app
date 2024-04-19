"use client";

import Carousel from "react-multi-carousel";
import {
  ButtonGroupProps,
  ResponsiveType,
} from "react-multi-carousel/lib/types";

import Icons from "@/lib/icons";
import "react-multi-carousel/lib/styles.css";
import Button from "../Button";

type CarouselProps = {
  children: React.ReactNode;
  options?: null | {
    swipeable: boolean;
    draggable: boolean;
    showDots: boolean;
    responsive: ResponsiveType;
    ssr: boolean;
    infinite: boolean;
    autoPlay: boolean;
    autoPlaySpeed: number;
    keyBoardControl: boolean;
    customTransition: string;
    transitionDuration: number;
    containerClass: string;
    dotListClass?: string;
    itemClass?: string;
    pauseOnHover?: boolean;
    keyboardControl: boolean;
    minimumTouchDrag: number;
  };
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 6,
  },
  miniDesktop: {
    breakpoint: { max: 1200, min: 1100 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1100, min: 900 },
    items: 4,
  },

  mini: {
    breakpoint: { max: 800, min: 600 },
    items: 3,
  },

  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

export default function CustomCarousel(props: CarouselProps) {
  const { children, options = null } = props;
  const defaultOptions = {
    swipeable: true,
    draggable: false,
    showDots: false,
    responsive,
    ssr: true,
    infinite: true,
    autoPlay: false,
    autoPlaySpeed: 1000,
    keyBoardControl: true,
    customTransition: "all .5",
    transitionDuration: 500,
    containerClass: "carousel-container container",
    dotListClass: "custom-dot-list-style",
    itemClass: "carousel-item-padding-40-px carousel",
    partialVisible: true,
    keyboardControl: true,
    minimumTouchDrag: 80,
  };

  const usedOption = options ? options : defaultOptions;
  return (
    <Carousel
      {...usedOption}
      arrows={false}
      customButtonGroup={<ButtonGroup />}
    >
      {children}
    </Carousel>
  );
}

const ButtonGroup = ({
  previous = () => {},
  next = () => {},
}: ButtonGroupProps) => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full">
      <Button
        className={`bg-black bg-opacity-30 rounded-full hover:bg-opacity-60 group`}
        onClick={() => previous()}
      >
        <Icons.prev className="text-7xl opacity-50 text-white group-hover:opacity-100" />
      </Button>
      <Button
        className={`bg-black bg-opacity-30 rounded-full hover:bg-opacity-60 group`}
        onClick={() => next()}
      >
        <Icons.next className="text-7xl opacity-50 text-white group-hover:opacity-100" />
      </Button>
    </div>
  );
};
