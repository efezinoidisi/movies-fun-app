import Image from 'next/image';
import CustomCarousel from '../Slider/carousel';
import { IMG_URL } from '@/constants/data';
import Link from 'next/link';

type Props = {
  casts: Cast[];
};

export default function Casts({ casts }: Props) {
  if (casts.length === 0) return null;
  return (
    <article>
      <h4 className='capitalize text-xl font-semibold py-3'>cast</h4>
      <CustomCarousel options={castOptions}>
        {casts.map(({ name, id, profile_path, character }) => {
          const picture = profile_path
            ? `${IMG_URL}${profile_path}`
            : '/default_pic.png';
          return (
            <Link href={``} key={id} className=' block w-fit'>
              <div
                className='w-56 h-full md:w-44 flex flex-col items-center gap-1 pb-7 md:pb-2 rounded-lg border-b-[.4rem] border-l-[.1rem] border-t-[.1rem]
              border-r-[.4rem]  border-opacity-60 border-[#F21364]  mr-2 hover:border-opacity-100 transition-colors ease-in-out duration-200'
              >
                <div className='w-full'>
                  <Image
                    src={picture}
                    width={300}
                    height={300}
                    className=' w-full h-52 md:h-44 overflow-x-hidden rounded-t-lg'
                    alt={`profile of ${name}`}
                  />
                </div>
                <div className='flex flex-col'>
                  <p className='font-semibold text-base text-center min-w-max'>
                    {name}
                  </p>
                  <p className='text-sm text-center'>{character}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </CustomCarousel>
    </article>
  );
}

const castOptions = {
  swipeable: true,
  draggable: false,
  showDots: false,
  ssr: true,
  infinite: false,
  autoPlay: false,
  autoPlaySpeed: 1000,
  keyBoardControl: true,
  customTransition: 'all .5',
  transitionDuration: 500,
  containerClass: 'carousel-container',
  itemClass: 'carousel-item-padding-40-px',
  responsive: {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1300 },
      items: 5,
      itemsToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1300, min: 1000 },
      items: 4,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1000, min: 790 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 790, min: 500 },
      items: 2,
    },
    small: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    },
  },
};
