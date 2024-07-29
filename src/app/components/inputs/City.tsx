'use client';

import { TextInput } from '@tremor/react';

type Props = React.ComponentProps<typeof TextInput>;

const City = (props: Props) => (
  <div className="flex flex-col flex-grow">
    <TextInput
      {...props}
      name="city"
      placeholder="City"
      autoComplete="address-level2"
    />
  </div>
);

export default City;
