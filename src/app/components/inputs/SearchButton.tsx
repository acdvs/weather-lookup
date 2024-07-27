import { useEffect } from 'react';
import { RiSearchLine } from '@remixicon/react';
import cx from 'classnames';

import { useSearch } from '@/store';

const SearchButton = () => {
  const { loading, refetch } = useSearch();

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        refetch();
      }
    };

    document.addEventListener('keypress', handleEnter);
    return () => document.removeEventListener('keypress', handleEnter);
  });

  return (
    <div className="shrink-0 mb-5" title="Search">
      <RiSearchLine
        className={cx(
          loading && 'fill-gray-400',
          'w-10 h-10 p-2 hover:cursor-pointer hover:fill-gray-400 transition-colors',
        )}
        onClick={loading ? undefined : refetch}
      />
    </div>
  );
};

export default SearchButton;
