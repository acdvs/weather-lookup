'use client';

import { NumberInput } from '@tremor/react';

type Props = React.ComponentProps<typeof NumberInput>;

const ZipCode = (props: Props) => (
  <NumberInput
    {...props}
    name="zip"
    min={0}
    enableStepper={false}
    placeholder="Zip Code"
    autoComplete="postal-code"
  />
);

export default ZipCode;
