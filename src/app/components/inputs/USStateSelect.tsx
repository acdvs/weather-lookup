'use client';

import { useMemo } from 'react';
import { SearchSelect, SearchSelectItem } from '@tremor/react';

import { useLocation } from '@/store';
import states from '@/data/us_states.json';

type Props = Omit<React.ComponentProps<typeof SearchSelect>, 'children'>;

const USStateSelect = (props: Props) => {
  const { state, setState } = useLocation();

  // Avoid reprocessing large dataset after rerender
  const stateEntries = useMemo(() => Object.entries(states), []);

  return (
    <SearchSelect
      {...props}
      value={state || ''}
      onValueChange={setState}
      name="state"
      placeholder="State"
      autoComplete="address-level1"
    >
      {stateEntries.map((v) => (
        <SearchSelectItem key={v[0]} value={v[0]}>
          {v[1]}
        </SearchSelectItem>
      ))}
    </SearchSelect>
  );
};

export default USStateSelect;
