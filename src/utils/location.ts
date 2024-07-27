import { LocationData } from '@/store';

export const locationToString = (loc: LocationData) => {
  let str = '';

  if (loc.city) {
    str += `${loc.city}, `;
  }

  if (loc.country === 'US' && loc.city && loc.state) {
    str += `${loc.state}, `;
  }

  if (loc.country) {
    str += loc.country;
  }

  if (loc.zipCode) {
    str += ` ${loc.zipCode}`;
  }

  return str;
};

export const locationToKey = (loc: LocationData) =>
  `${loc.city || 0}_${loc.state || 0}_${loc.country || 0}_${loc.zipCode || 0}`;
