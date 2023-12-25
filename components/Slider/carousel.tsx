'use client';
import Carousel from 'react-multi-carousel';
import {
  ButtonGroupProps,
  ResponsiveType,
} from 'react-multi-carousel/lib/types';

import 'react-multi-carousel/lib/styles.css';
import Button from '../Button';
import Icons from '@/lib/icons';

type Device = {
  breakpoint: { max: number; min: number };
  items: number;
  slidesToSlide: number;
};

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
  };
};

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
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
    customTransition: 'all .5',
    transitionDuration: 500,
    containerClass: 'carousel-container',
    dotListClass: 'custom-dot-list-style',
    itemClass: 'carousel-item-padding-40-px',
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
    <div className='absolute top-1/2 -translate-y-1/2 flex justify-between w-full'>
      <Button
        className={`bg-white bg-opacity-25 rounded-full hover:bg-opacity-60 group`}
        onClick={() => previous()}
      >
        <Icons.prev className='text-7xl opacity-50 group-hover:opacity-100' />
      </Button>
      <Button
        className={`bg-white bg-opacity-25 rounded-full hover:bg-opacity-60 group`}
        onClick={() => next()}
      >
        <Icons.next className='text-7xl opacity-50 group-hover:opacity-100' />
      </Button>
    </div>
  );
};
