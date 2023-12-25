'use client';
import { useCallback, useMemo, useState } from 'react';
import Ratings from '@/components/common/ratings';
import { checkTrimString } from '@/utils/helpers';
import Button from '@/components/Button';
import Icons from '@/lib/icons';
import { merge } from '@/utils/merge';
import { sanitize } from 'isomorphic-dompurify';
import toast from 'react-hot-toast';
import { API_BASE_URL, IMG_URL } from '@/constants/data';
import Image from 'next/image';

export default function Review(props: Props) {
  const { reviews, pages, movieId } = props;

  const [movieReviews, setMovieReviews] = useState<Review[] | null>(reviews);

  const [currentPage, setCurrentPage] = useState(1);

  const updateCurrentPage = (num: number) => {
    if (currentPage === pages) return;
    setCurrentPage(num);
  };

  const getPage = useCallback(async () => {
    try {
      const res = await fetch(
        `${API_BASE_URL}movie/${movieId}/reviews?page=${currentPage}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      if (res.ok) {
        const body = await res.json();
        setMovieReviews(body.results);
        console.log('test next page', body);
      }
    } catch (error) {
      console.log(error);
      toast.error('unable to fetch more reviews');
    }
  }, [currentPage, movieId]);

  if (!movieReviews || movieReviews.length === 0) return null;
  return (
    <section className=''>
      <h2 className='text-center text-xl font-semibold capitalize pb-5'>
        reviews
      </h2>
      <div>
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
        <div className='flex justify-center items-center gap-7 border border-text w-fit mx-auto px-3 rounded-md py-1'>
          <Button
            className={merge('', currentPage !== 1 ? 'visible' : 'invisible')}
          >
            prev
          </Button>
          <span>{currentPage}</span>
          <Button
            className={merge(
              '',
              currentPage === pages ? 'invisible' : 'visible'
            )}
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

  const toggleContent = () => {
    setShowFullContent((prev) => !prev);
  };
  const picture = image ? `${IMG_URL}${image}` : '/default_pic.png';

  const publishedDate = new Date(created);
  return (
    <div className=' border-b last:border-b-0 py-7 flex flex-col gap-2 border-text border-opacity-50'>
      <div className='flex items-center gap-2'>
        <Image
          src={picture}
          alt={`profile of ${author}`}
          width={200}
          height={200}
          className='rounded-full w-12 h-12'
        />
        <p className='flex flex-col'>
          <span>{author}</span>
          <span className='text-xs'>
            {`${publishedDate.toLocaleDateString('en-Us', {
              dateStyle: 'medium',
            })}`}
          </span>
        </p>
      </div>
      <Ratings ratings={rating} />
      <div className='relative flex flex-col'>
        <p
          dangerouslySetInnerHTML={{ __html: displayedContent }}
          className={merge(
            content.length > MAX_CONTENT && !showFullContent && 'mask'
          )}
        ></p>
        {content.length > MAX_CONTENT && (
          <Button
            onClick={toggleContent}
            className={merge(
              'absolute self-center flex items-center gap-1 border border-text px-3 rounded-xl ',
              showFullContent
                ? '-bottom-4 border-opacity-30'
                : 'bottom-0 border-opacity-80'
            )}
          >
            <span>{`${showFullContent ? 'hide' : 'continue reading'}`}</span>
            <Icons.doubleDownArrow
              className={`${showFullContent ? 'rotate-180' : ''}`}
            />
          </Button>
        )}
      </div>
    </div>
  );
}

type Props = {
  reviews: Review[] | null;
  pages: number;
  movieId: number;
};
