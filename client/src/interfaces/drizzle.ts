import { Drizzle } from '@drizzle/store';
import { Store } from 'redux';

export interface DrizzleWithStore extends Drizzle {
  store: Store;
}
