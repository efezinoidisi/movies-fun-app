'use server';
import { getPlaiceholder } from 'plaiceholder';
import { IMG_URL } from '@/constants/data';

export default async function getPlaceholder(photo: string) {
  try {
    const url = `${IMG_URL}${photo}`;

    const buffer = await fetch(url).then(async (res) =>
      Buffer.from(await res.arrayBuffer())
    );
    const { ...plaiceholder } = await getPlaiceholder(buffer);
    return { ...plaiceholder };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const getImage = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const {
    metadata: { height, width },
    ...plaiceholder
  } = await getPlaiceholder(buffer, { size: 10 });

  return {
    ...plaiceholder,
    img: { src, height, width },
  };
};

// Usage
// const { base64, img } = await getImage(
//   'https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80'
// );
