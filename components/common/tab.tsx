'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Button from '../Button';
import { merge } from '@/utils/merge';

type Props = {
  tabItems: { query: string; title: string }[];
  defaultTab: string;
  styles?: string;
  activeStyles?: string;
};

export default function Tab({
  tabItems,
  defaultTab,
  styles = '',
  activeStyles = '',
}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const tab = searchParams.get('tab') ?? defaultTab;

  const updateTab = (newtab: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('tab', newtab);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={merge('flex items-center py-3 px-5 gap-4', styles)}>
      {tabItems.map(({ title, query }) => {
        const activeTab = query === tab;
        return (
          <Button
            key={title}
            onClick={() => updateTab(query)}
            className={merge(
              'uppercase hover:text-accent hover:border-accent hover:opacity-70',
              activeTab
                ? `border-b-4 scale-105 transition-colors duration-200 ease-in  ${activeStyles}`
                : 'text-black/80'
            )}
          >
            {title}
          </Button>
        );
      })}
    </div>
  );
}
