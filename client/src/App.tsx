import React from 'react';
import { Loading } from './components/Loading';
import ReadString from './components/ReadString';
import SetString from './components/SetString';
import { Drizzle, DrizzleState } from './interfaces/drizzle';

export interface AppProps {
  drizzle: Drizzle;
}

const App: React.FC<AppProps> = ({ drizzle }) => {
  const [loading, setLoading] = React.useState(true);
  const [drizzleState, setDrizzleState] = React.useState<DrizzleState | null>(
    null,
  );

  React.useEffect(() => {
    // subscribe to changes in the store
    return drizzle.store.subscribe(() => {
      // every time the store updates, grab the state from drizzle
      const drizzleState = drizzle.store.getState();

      // check to see if it's ready, if so, update local component state
      if (drizzleState.drizzleStatus.initialized) {
        setLoading(false);
        setDrizzleState(drizzleState);
      }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return loading || !drizzleState ? (
    <Loading />
  ) : (
    <div>
      <ReadString drizzle={drizzle} drizzleState={drizzleState} />
      <SetString drizzle={drizzle} drizzleState={drizzleState} />
    </div>
  );
};

export default App;
