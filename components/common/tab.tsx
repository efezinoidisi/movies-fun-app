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
    <div className={merge('flex items-center px-5 gap-4 mb-5', styles)}>
      {tabItems.map(({ title, query }) => {
        const activeTab = query === tab;
        return (
          <Button
            key={title}
            onClick={() => updateTab(query)}
            className={merge(
              'uppercase hover:text-accent hover:border-accent/70 hover:opacity-70 text-sm min-w-max md:text-base py-4 hover:border-b-4',
              activeTab
                ? `border-b-4  transition-colors duration-200 ease-in-out font-bold  ${activeStyles}`
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
