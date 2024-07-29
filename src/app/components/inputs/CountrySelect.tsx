'use client';

import { useMemo } from 'react';
import { SearchSelect, SearchSelectItem } from '@tremor/react';

import countries from '@/data/countries.json';

type Props = Omit<React.ComponentProps<typeof SearchSelect>, 'children'>;

const CountrySelect = (props: Props) => {
  // Avoid reprocessing large dataset after rerender
  const countryEntries = useMemo(() => Object.entries(countries), []);

  return (
    <SearchSelect
      {...props}
      name="country"
      placeholder="Country"
      autoComplete="country-name"
    >
      {countryEntries.map((v) => (
        <SearchSelectItem key={v[0]} value={v[0]}>
          {v[1]}
        </SearchSelectItem>
      ))}
    </SearchSelect>
  );
};

export default CountrySelect;
