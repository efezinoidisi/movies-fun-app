'use client';

import Slider, { CustomArrowProps } from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Card from '../Cards/Card';

type SliderProps = {
  children?: React.ReactNode;
  items?: MovieList[];
  type: 'movie' | 'tv';
};

export default function SimpleSlider({ children, items, type }: SliderProps) {
  const sliderSettings = {
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 3,
    infinite: false,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 1000,
    focusOnSelect: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    nextArrow: <ArrowRight />,
    prevArrow: <ArrowLeft />,
  };

  return (
    <div className='h-full px-7'>
      <Slider {...sliderSettings} className=''>
        {items
          ? items.map((movie) => {
              return <Card key={movie.id} {...movie} type={type} />;
            })
          : children}
      </Slider>
    </div>
  );
}

const ArrowLeft = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => {
  return (
    <button
      className={`${currentSlide === 0 ? 'slick-disabled' : ''}`}
      {...props}
    >
      <FaArrowLeft />
    </button>
  );
};
const ArrowRight = ({
  currentSlide,
  slideCount,
  ...props
}: CustomArrowProps) => {
  const count = slideCount as number;
  return (
    <button
      className={`${currentSlide === count - 1 ? 'slick-disabled' : ''}`}
      {...props}
    >
      <FaArrowRight />
    </button>
  );
};
