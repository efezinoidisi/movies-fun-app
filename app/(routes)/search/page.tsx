import { Suspense } from 'react';
import Search from '@/components/Search';
import getPlaceholder from '@/utils/placeholder';
import Image from 'next/image';
import { IMG_URL } from '@/constants/data';

export default async function page() {
  const url = '/klPqN1oITjVub0Yss0Kqnx8NfY3.jpg';
  const pl = await getPlaceholder(url);
  return (
    <div>
      <h2>search page</h2>
      <Image
        src={`${IMG_URL}${url}`}
        alt=''
        width={200}
        height={200}
        placeholder='blur'
        blurDataURL={pl?.base64}
      />
      <Suspense fallback={<p>loading</p>}>
        <Search />
      </Suspense>
    </div>
  );
}
