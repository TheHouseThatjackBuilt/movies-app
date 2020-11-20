import { createContext } from 'react';

const { Provider: TmdbProvider, Consumer: TmdbConsumer } = createContext();

export { TmdbProvider, TmdbConsumer };
