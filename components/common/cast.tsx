import Person from "../Cards/person";
import CustomCarousel from "../Slider/carousel";
import SubHeading from "./sub-heading";

type Props = {
  casts: Cast[];
};

export default function Casts({ casts }: Props) {
  if (casts.length === 0) return null;
  return (
    <article className="my-7">
      <SubHeading text="top cast" />
      <div className="py-7">
        <CustomCarousel options={castOptions}>
          {casts.map(({ name, id, profile_path, character }) => {
            return (
              <Person
                key={id}
                name={name}
                character={character}
                picture={profile_path}
                id={id}
                styles="hover:scale-y-100"
              />
            );
          })}
        </CustomCarousel>
      </div>
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
  customTransition: "all .10 slide",
  transitionDuration: 500,
  containerClass: "carousel-container",
  itemClass: "carousel-item-padding-40-px carousel",
  responsive: {
    desktop: {
      breakpoint: { max: 4000, min: 1000 },
      items: 5,
      slidesToSlide: 4,
    },
    tablet: {
      breakpoint: { max: 1000, min: 790 },
      items: 4,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 790, min: 400 },
      items: 3,
      slidesToSlide: 2,
    },
    small: {
      breakpoint: { max: 400, min: 0 },
      items: 2,
      slidesToSlide: 2,
    },
  },
  keyboardControl: true,
  minimumTouchDrag: 80,
};
