'use client';

import { NumberInput } from '@tremor/react';
import { useLocation } from '@/store';

type Props = React.ComponentProps<typeof NumberInput>;

const ZipCode = (props: Props) => {
  const { zipCode, setZipCode } = useLocation();

  return (
    <NumberInput
      {...props}
      value={zipCode || ''}
      onValueChange={setZipCode}
      name="zip"
      min={0}
      enableStepper={false}
      placeholder="Zip Code"
      autoComplete="postal-code"
    />
  );
};

export default ZipCode;
