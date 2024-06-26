import { getReleaseDate, numberToDollarString } from "@/utils/helpers";
import Favourite from "../Buttons/Favourite";
import GenreList from "./genre-list";
import MoviePoster from "./poster";
import Rating from "./rating";

type Common = {
  runtime: string;
  overview: string;
  language: string;
  genres: Genre[];
  poster: string;
  name: string;
  rating: number;
  payload: MediaItem;
};

type Tv = Common & {
  type: "tv";
  first_episode: string;
  last_episode: string;
  status: string;
  seasons: number;
  episodes: number;
  creator: React.ReactNode;
};

type Movie = Common & {
  type: "movie";
  release: string;
  director: React.ReactNode;
  budget: number;
  revenue: number;
};

type Props = Movie | Tv;

export default function Details(props: Props) {
  const {
    overview,
    type,
    language,
    genres,
    runtime,
    poster,
    name,
    rating,
    payload,
  } = props;
  let items: { name: string; value: string | React.ReactNode | number }[] = [
    {
      name: "language",
      value: language,
    },
    {
      name: "runtime",
      value: runtime || "-",
    },
    {
      name: "rating",
      value: <Rating rating={rating} />,
    },
  ];
  if (type === "movie") {
    const { release, director, budget, revenue } = props;
    items = [
      ...items,
      {
        name: "director",
        value: director,
      },
      {
        name: "release",
        value: getReleaseDate(release) || "-",
      },

      {
        name: "budget",
        value: budget ? numberToDollarString(budget) : "-",
      },
      {
        name: "revenue",
        value: revenue ? numberToDollarString(revenue) : "-",
      },
    ];
  } else {
    const { seasons, status, episodes, first_episode, last_episode, creator } =
      props;
    items = [
      ...items,
      {
        name: "creator",
        value: creator,
      },
      {
        name: "first episode",
        value: getReleaseDate(first_episode),
      },
      {
        name: "last episode",
        value: getReleaseDate(last_episode),
      },
      {
        name: "seasons",
        value: seasons,
      },
      {
        name: "episodes",
        value: episodes,
      },
      {
        name: "status",
        value: status,
      },
    ];
  }

  return (
    <article className=" flex flex-col gap-y-3 md:gap-y-5 justify-start items-start">
      <div className=" py-3  flex items-center justify-between w-full">
        <h2 className=" capitalize text-xl md:text-2xl lg:text-4xl font-semibold">
          overview
        </h2>
        <Favourite
          movie={payload}
          position="relative"
          extraStyles="bg-inherit w-fit  hover:text-accent"
          useIcon="like"
        />
      </div>
      <p
        className="text-lg tracking-wide leading-loose "
        style={{ lineHeight: "2" }}
      >
        {overview}
      </p>
      <GenreList genres={genres} type="with-id" page={type} />
      <div className="grid md:grid-cols-2 justify-items-center md:justify-items-stretch gap-y-5 w-full mt-4 gap-x-2">
        <div className="">
          {items.map(({ name, value }) => {
            return (
              <div className="py-2 flex gap-x-10 items-start" key={name}>
                <p className={`min-w-[6rem] md:min-w-[8rem] capitalize`}>
                  {name}
                </p>
                <div>{value}</div>
              </div>
            );
          })}
        </div>

        <MoviePoster
          posterPath={poster}
          className="w-full border border-accent rounded-lg max-w-xs row-start-1 md:col-start-2"
          imageStyles="w-full h-full rounded-lg"
          alt={`poster for ${name}`}
        />
      </div>
    </article>
  );
}
