import Heading from "@/components/common/heading";
import {
  default as MoviePoster,
  default as Poster,
} from "@/components/common/poster";
import SubHeading from "@/components/common/sub-heading";
import Tab from "@/components/common/tab";
import { fetchList } from "@/utils/fetchList";
import { getReleaseDate } from "@/utils/helpers";
import Link from "next/link";

type Props = {
  params: { id: string };
  searchParams: {
    tab?: "movies" | "television" | "production";
  };
};

type Item = Crew & CastTv & CastMovie;

export const revalidate = 86400; // revalidate after 24 hours(1 day)

const tabItems = [
  {
    query: "movies",
    title: "movies",
  },
  {
    query: "television",
    title: "television",
  },
  {
    query: "production",
    title: "production",
  },
];

export async function generateMetadata({ params: { id } }: Props) {
  const person = await fetchList(`person/${id}`);

  return {
    title: person.name,
    description: `explore public information about ${person.name}`,
  };
}

export default async function page({
  params: { id },
  searchParams: { tab = "movies" },
}: Props) {
  const endpoint = `person/${id}?append_to_response=images,tv_credits,movie_credits`;

  const person: Promise<PersonDetail> = await fetchList(endpoint);

  const {
    name,
    tv_credits,
    movie_credits,
    images,
    profile_path,
    place_of_birth,
    also_known_as,
    deathday,
    biography,
    birthday,
    gender,
    known_for_department,
  } = await person;

  const movieCredits = movie_credits?.cast;

  movieCredits.sort((a, b) => {
    const dateA = +getReleaseDate(a.release_date, "short");

    const dateB = +getReleaseDate(b.release_date, "short");

    return dateB - dateA;
  });

  const tvCredits = tv_credits?.cast;

  tvCredits.sort((a, b) => {
    const dateA = +getReleaseDate(a.first_air_date, "short");

    const dateB = +getReleaseDate(b.first_air_date, "short");

    return dateB - dateA;
  });

  const productionCredits = [...tv_credits?.crew, ...movie_credits?.crew];

  productionCredits.sort((a, b) => {
    const dateA = +getReleaseDate(a.first_air_date || a.release_date, "short");

    const dateB = +getReleaseDate(b.first_air_date || a.release_date, "short");

    return dateB - dateA;
  });

  const details = [
    {
      title: "also known as",
      value: also_known_as.toString(),
    },
    {
      title: "birthday",
      value: getReleaseDate(birthday),
    },
    {
      title: "deathday",
      value: deathday ? getReleaseDate(deathday) : null,
    },
    {
      title: "birth place",
      value: place_of_birth,
    },
  ];

  const profiles = images?.profiles?.slice(0, 10);

  let filmography = null;
  if (tab === "television") {
    filmography =
      tvCredits?.length > 0 ? (
        <Table items={tvCredits as Item[]} caption="television" />
      ) : null;
  } else if (tab === "production") {
    filmography =
      productionCredits?.length > 0 ? (
        <Table items={productionCredits as Item[]} caption="production" />
      ) : null;
  } else {
    filmography =
      movieCredits?.length > 0 ? (
        <Table items={movieCredits as Item[]} caption="movies" />
      ) : null;
  }

  return (
    <section className="px-5 md:px-10 lg:px-16 pb-5">
      <div className="py-16"></div>
      <Heading text={name || ""} styles="text-3xl md:text-4xl lg:text-5xl" />
      <div className="grid md:grid-cols-3 gap-y-4 md:place-items-start gap-x-6 mb-3 overflow-x-hidden place-items-center">
        <div className="md:col-span-2">
          <p className="mb-4 tracking-wide leading-loose text-base md:text-lg">
            {biography}
          </p>

          {details?.map(({ title, value }) => {
            if (!value) return null;
            return (
              <div className="flex items-start py-2" key={title}>
                <p className="min-w-[8.5rem] md:min-w-[12rem] capitalize">
                  {title}
                </p>
                <p className="min-w-min capitalize">{value}</p>
              </div>
            );
          })}
        </div>
        <MoviePoster
          posterPath={profile_path}
          className="w-full border border-accent rounded-lg max-w-xs row-start-1 md:col-start-3 md:col-span-1"
          imageStyles="w-full h-full rounded-lg"
        />
      </div>
      {images?.profiles?.length > 0 && (
        <section className="flex flex-col gap-3 my-5 md:my-10 ">
          <SubHeading text="featured images" />
          <div className="flex gap-3 flex-wrap mb-3 justify-center gap-y-14">
            {profiles?.length > 0 &&
              profiles?.map((profile) => {
                return (
                  <Poster
                    type="person"
                    posterPath={profile.file_path}
                    key={profile.iso_639_1}
                    className="w-full sm:w-64 md:w-52"
                    imageStyles="border border-dull w-full rounded-lg"
                  />
                );
              })}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-y-5 w-full md:5/6 lg::w-3/4 mx-auto py-5 ">
        <SubHeading text="filmography" />

        <Tab
          tabItems={tabItems}
          defaultTab={"movies"}
          styles="self-center bg-text text-background bg-opacity-90 py-2 rounded"
          activeStyles="border-0  text-accent"
          scroll={false}
          buttonStyles="border-r last:border-r-0 px-3 border-body hover:border-b-0"
        />

        {filmography}
      </section>
    </section>
  );
}

type TableProps = {
  items: Item[];
  caption: string;
};

const Table = (props: TableProps) => {
  const { items, caption } = props;

  const content = items.map((item) => {
    const release = getReleaseDate(
      item.first_air_date || item.release_date,
      "short"
    );
    return (
      <Credit
        key={item.id}
        character={item.character || item.job}
        name={item.name || item.title}
        overview={item.overview}
        id={item.id}
        credit_id={item.credit_id}
        release={release}
        type={item.name ? "tv" : "movies"}
      />
    );
  });
  return (
    <section className=" md:w-3/4 mx-auto">
      <h3 className="text-center uppercase  border-b-4 border overflow-hidden py-4   border-text font-medium tracking-wider rounded-t text-lg relative after:content[''] after:absolute after:block after:bg-accent after:h-4 after:w-1/2 after:rounded-bl-[65%] after:-z-[1] after:top-0 after:right-0">
        {caption}
      </h3>

      <div className="">{content}</div>
    </section>
  );
};

type CreditProps = {
  id: number;
  name: string;
  release: string;
  overview: string;
  character: string;
  credit_id: string;
  type: "movies" | "tv";
};
const Credit = (props: CreditProps) => {
  const { id, name, release, overview, character, credit_id, type } = props;

  const path = `/${type}/${id}`;

  return (
    <div className="border border-b-accent/40 grid grid-cols-4 w-full border-text/80 border-t-0 border-b-2">
      <p className="col-span-1 border-r border-text/50 text-center py-2">
        {release}
      </p>
      <p className="col-span-3 flex flex-col text-center py-2">
        <span>(character)</span>
        <span>{character || "-"}</span>
      </p>

      <p className="col-span-4 border-t border-text/50 text-center py-2 md:text-lg">
        <Link
          href={path}
          className="text-accent underline hover:underline visited:text-secondary/80"
        >
          {name}
        </Link>
      </p>
      <p className="col-span-5 border-t border-text/50 px-5 pt-2 leading-8 line-clamp-5 py-3 overflow-hidden">
        {overview}
      </p>
    </div>
  );
};
