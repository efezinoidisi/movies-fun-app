export const API_BASE_URL = 'https://api.themoviedb.org/3/';

export const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export const OPTIONS = {
  Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  'Content-Type': 'application/json',
};

export const NAVIGATION = [
  {
    id: 0,
    href: '/',
    name: 'home',
  },
  {
    id: 1,
    href: '/movies',
    name: 'movies',
  },
  {
    id: 2,
    href: '/tv',
    name: 'series',
  },
  {
    id: 3,
    href: '/about',
    name: 'about',
  },
];

// all oficial genres from the tmbd api
export const GENRES: { [key: number]: string } = {
  12: 'adventure',
  14: 'fantasy',
  16: 'animation',
  18: 'drama',
  27: 'horror',
  28: 'action',
  35: 'comedy',
  36: 'history',
  37: 'western',
  53: 'thriller',
  80: 'Crime',
  99: 'documentary',
  878: 'science fiction',
  9648: 'mystery',
  10402: 'music',
  10749: 'romance',
  10751: 'family',
  10752: 'war',
  10759: 'action & adventure',
  10762: 'kids',
  10763: 'news',
  10764: 'reality',
  10765: 'sci-fi & fantasy',
  10766: 'soap',
  10767: 'talk',
  10768: 'war & politics',
  10770: 'tv movie',
};

export const popularMoviesOptions = {
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
  dotListClass: 'custom-dot-list-style',
  itemClass: 'carousel-item-padding-40-px',
  responsive: {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1200 },
      items: 4,
      itemsToSlide: 2,
    },
    desktop: {
      breakpoint: { max: 1200, min: 900 },
      items: 3,
      slidesToSlide: 2,
    },
    tablet: {
      breakpoint: { max: 900, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  },
};
