import { getPlaiceholder } from 'plaiceholder';
import { IMG_URL } from '@/constants/data';

export default async function getPlaceholder(imgUrl: string) {
  try {
    const url = `${IMG_URL}${imgUrl}`;

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
