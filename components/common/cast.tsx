import CustomCarousel from '../Slider/carousel';
import Person from '../Cards/person';
import SubHeading from './sub-heading';

type Props = {
  casts: Cast[];
};

export default function Casts({ casts }: Props) {
  if (casts.length === 0) return null;
  return (
    <article className=''>
      <SubHeading text='top cast' />
      <CustomCarousel options={castOptions}>
        {casts.map(({ name, id, profile_path, character }) => {
          return (
            <Person
              key={id}
              name={name}
              character={character}
              picture={profile_path}
              id={id}
            />
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
    desktop: {
      breakpoint: { max: 4000, min: 1000 },
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
