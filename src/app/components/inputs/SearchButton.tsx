import { Button } from '@tremor/react';
import { RiSearchLine } from '@remixicon/react';
import cx from 'classnames';

import { useSearch } from '@/store';

const SearchButton = () => {
  const { loading } = useSearch();

  return (
    <Button
      type="submit"
      icon={RiSearchLine}
      variant="light"
      className={cx(
        loading && 'fill-gray-400',
        'mb-5 p-2 items-start [&:hover_svg]:fill-gray-300',
      )}
      disabled={loading}
      tooltip="Search"
    />
  );
};

export default SearchButton;
