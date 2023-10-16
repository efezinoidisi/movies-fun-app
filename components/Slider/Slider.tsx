'use client';

import Slider, { CustomArrowProps } from 'react-slick';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import PopularMovieCard from '../Cards/PopularMovieCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Card from '../Cards/Card';
import NewReleaseCard from '../Cards/NewRelease';

type SliderProps = {
  slideItems: MovieList[];
  variant: string;
  type?: 'movie' | 'tv';
};

export default function Carousel({
  slideItems,
  variant,
  type = 'movie',
}: SliderProps) {
  const sliderSettings = {
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    infinite: false,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 1000,
    focusOnSelect: true,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
      <Slider {...sliderSettings} className='h-full'>
        {slideItems.map((result, index) => {
          const card =
            variant === 'popular' ? (
              <PopularMovieCard index={index} key={result.id} {...result} />
            ) : variant === 'new' ? (
              <NewReleaseCard key={result.id} {...result} />
            ) : (
              <Card key={result.id} {...result} type={type} />
            );
          return <div key={result.id}>{card}</div>;
        })}
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
