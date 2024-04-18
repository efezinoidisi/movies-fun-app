"use client";
import Button from "@/components/Button";
import { IMG_URL } from "@/constants/data";
import Icons from "@/lib/icons";
import { fetchClientList } from "@/utils/fetchList";
import { checkTrimString } from "@/utils/helpers";
import { merge } from "@/utils/merge";
import { sanitize } from "isomorphic-dompurify";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState } from "react";
import Rating from "./rating";
import SubHeading from "./sub-heading";

type Props = {
  reviews: Review[] | null;
  pages: number;
  movieId: number;
};

export default function Review(props: Props) {
  const { reviews, pages, movieId } = props;

  const [movieReviews, setMovieReviews] = useState<Review[] | null>(reviews);

  const [currentPage, setCurrentPage] = useState(1);

  const updateCurrentPage = (num: number) => {
    setCurrentPage(num);
    getPage(num);
  };

  const getPage = useCallback(
    async (num: number) => {
      const res = await fetchClientList(`movie/${movieId}/reviews`, num);
      setMovieReviews(res?.results);
      ref.current?.scrollIntoView({ behavior: "smooth" });
    },
    [movieId]
  );

  const ref = useRef<HTMLDivElement | null>(null);

  if (!movieReviews || movieReviews.length === 0) return null;
  return (
    <section className="">
      <SubHeading text="IMDB reviews" />
      <div ref={ref}>
        {movieReviews.map(
          ({ id, author, content, author_details, created_at }) => {
            const sanitizedReview = sanitize(content);
            return (
              <ReviewCard
                key={id}
                author={author}
                content={sanitizedReview}
                rating={author_details.rating}
                image={author_details.avatar_path}
                created={created_at}
              />
            );
          }
        )}
      </div>

      {pages > 1 && (
        <div className="flex justify-center items-center gap-7  bg-dull text-dullText w-fit mx-auto rounded-md py-1">
          <Button
            className={merge(
              "hover:bg-body border-r-2 px-3 py-1 border-body",
              currentPage !== 1
                ? "cursor-pointer"
                : "pointer-events-none opacity-50"
            )}
            onClick={() => updateCurrentPage(currentPage - 1)}
          >
            prev
          </Button>
          <span className="min-w-max text-xs">{`${currentPage} of ${pages}`}</span>
          <Button
            className={merge(
              "hover:bg-body border-l-2 px-3 py-1 border-body",
              currentPage === pages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            )}
            onClick={() => updateCurrentPage(currentPage + 1)}
          >
            next
          </Button>
        </div>
      )}
    </section>
  );
}

type ReviewCardProps = {
  author: string;
  content: string;
  rating: number | null;
  image: string | null;
  created: string;
};

const MAX_CONTENT = 300;
function ReviewCard(props: ReviewCardProps) {
  const { author, content, rating, image, created } = props;
  const [showFullContent, setShowFullContent] = useState(false);

  const displayedContent = useMemo(() => {
    if (showFullContent) {
      return content;
    }
    return checkTrimString(content, MAX_CONTENT);
  }, [showFullContent, content]);

  const ref = useRef<HTMLParagraphElement | null>(null);

  const toggleContent = () => {
    setShowFullContent((prev) => {
      if (prev) {
        ref.current?.scrollIntoView({ behavior: "instant" });
      }
      return !prev;
    });
  };

  const publishedDate = new Date(created);

  const authorImage = image ? (
    <Image
      src={`${IMG_URL}${image}`}
      alt={`profile of ${author}`}
      width={200}
      height={200}
      className="rounded-full w-12 h-12"
      unoptimized
    />
  ) : (
    <Icons.person className="rounded-full w-12 h-12" />
  );
  return (
    <div
      className=" border-b py-7 flex flex-col gap-2 border-text border-opacity-40 last:border-b-0"
      ref={ref}
    >
      <div className="flex items-center gap-2">
        {authorImage}
        <p className="flex flex-col">
          <span>{author}</span>
          <span className="text-xs">
            {`${publishedDate.toLocaleDateString("en-Us", {
              dateStyle: "medium",
            })}`}
          </span>
        </p>
      </div>
      <Rating rating={rating as number} />
      <div className="relative flex flex-col">
        <p
          dangerouslySetInnerHTML={{ __html: displayedContent }}
          className={merge(
            "leading-loose tracking-wider duration-500 ease-linear text-base md:text-lg",
            content.length > MAX_CONTENT && !showFullContent && "mask"
          )}
          ref={ref}
        ></p>
        {content.length > MAX_CONTENT && (
          <Button
            onClick={toggleContent}
            className={merge(
              "absolute self-center flex items-center gap-1 border border-text px-3 rounded-xl transition-colors duration-300 ease-linear hover:text-primary hover:bg-white",
              showFullContent
                ? "-bottom-6 right-0 border-opacity-30"
                : "bottom-0 border-opacity-80"
            )}
          >
            <span>{`${
              showFullContent ? "collapse" : "continue reading"
            }`}</span>
            <Icons.doubleDownArrow
              className={`${showFullContent ? "rotate-180" : ""}`}
            />
          </Button>
        )}
      </div>
    </div>
  );
}
