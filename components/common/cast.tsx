import Image from 'next/image';
import CustomCarousel from '../Slider/carousel';
import { IMG_URL } from '@/constants/data';
import Link from 'next/link';
import Icons from '@/lib/icons';

type Props = {
  casts: Cast[];
};

export default function Casts({ casts }: Props) {
  if (casts.length === 0) return null;
  return (
    <article>
      <h4 className='capitalize text-xl font-semibold py-3 text-white'>cast</h4>
      <CustomCarousel options={castOptions}>
        {casts.map(({ name, id, profile_path, character }) => {
          const picture = profile_path ? (
            <Image
              src={`${IMG_URL}${profile_path}`}
              width={200}
              height={200}
              className=' w-full h-52 md:h-44 overflow-x-hidden rounded-t-lg'
              alt={`profile of ${name}`}
            />
          ) : (
            <Icons.person className=' w-full h-52 md:h-44 overflow-x-hidden rounded-t-lg' />
          );
          return (
            <Link href={`/people/${id}`} key={id} className='w-full block'>
              <div
                className=' flex flex-col items-center gap-1 pb-7 md:pb-2 rounded-lg mr-2 snap-start whitespace-normal  border-text h-max bg-body border-b-[.2rem] border-l-[.1rem] border-t-[.1rem]
              border-r-[.2rem]  border-opacity-60  hover:border-opacity-100 transition-colors ease-in-out duration-200'
              >
                <div className='w-full'>{picture}</div>
                <div className='flex flex-col'>
                  <p className='font-semibold text-base text-center min-w-min'>
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
  partialVisible: true,
  keyBoardControl: true,
  customTransition: 'all .5',
  transitionDuration: 500,
  containerClass: 'carousel-container',
  itemClass: 'carousel-item-padding-40-px',
  responsive: {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1300 },
      items: 6,
      itemsToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1300, min: 1000 },
      items: 5,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 1000, min: 790 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 790, min: 400 },
      items: 3,
    },
    small: {
      breakpoint: { max: 400, min: 0 },
      items: 2,
    },
  },
};
