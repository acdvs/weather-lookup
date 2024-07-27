import { create } from 'zustand';
import isEqual from 'lodash-es/isEqual';

export interface LocationData {
  zipCode?: number;
  city?: string;
  state?: string;
  country?: string;
}

interface LocationActions {
  setZipCode: (zipCode?: number) => void;
  setCity: (city?: string) => void;
  setState: (state?: string) => void;
  setCountry: (country?: string) => void;
}

export const useLocation = create<LocationData & LocationActions>((set) => ({
  setZipCode: (x) => set({ zipCode: x }),
  setCity: (x) => set({ city: x }),
  setState: (x) => set({ state: x }),
  setCountry: (x) => set({ country: x }),
}));

interface SearchValues {
  queryTrigger: boolean;
  loading: boolean;
  history: LocationData[];
}

interface SearchActions {
  refetch: () => void;
  setLoading: (x: boolean) => void;
  setHistory: (x: LocationData[]) => void;
  addHistory: (location: LocationData) => void;
}

export const useSearch = create<SearchValues & SearchActions>((set) => ({
  queryTrigger: false,
  loading: false,
  history: [],
  refetch: () => set((state) => ({ queryTrigger: !state.queryTrigger })),
  setLoading: (x) => set({ loading: x }),
  setHistory: (x) => set({ history: x }),
  addHistory: (query) =>
    set((state) => {
      if (state.history.some((savedQuery) => isEqual(query, savedQuery))) {
        return {};
      }

      const _history = [query, ...state.history].slice(0, 5);
      sessionStorage.setItem('history', JSON.stringify(_history));

      return { history: _history };
    }),
}));
