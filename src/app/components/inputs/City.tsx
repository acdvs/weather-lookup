'use client';

import { TextInput } from '@tremor/react';
import { useLocation } from '@/store';

type Props = React.ComponentProps<typeof TextInput>;

const City = (props: Props) => {
  const { city, setCity } = useLocation();

  return (
    <TextInput
      {...props}
      value={city || ''}
      onValueChange={setCity}
      name="city"
      placeholder="City"
      autoComplete="address-level2"
    />
  );
};

export default City;
