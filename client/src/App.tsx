import React from 'react';
import { DrizzleWithStore } from './interfaces/drizzle';

export const Loading: React.FC = () => {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    ref.current!.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
      { duration: 1000, iterations: Infinity },
    );
  }, []);

  return (
    <div
      ref={ref}
      style={{
        borderRadius: '50%',
        borderWidth: 2,
        borderStyle: 'solid',
        borderLeftColor: '#ccc',
        borderTopColor: '#ccc',
        height: 20,
        width: 20,
      }}
    />
  );
};

export interface AppProps {
  drizzle: DrizzleWithStore;
}

const App: React.FC<AppProps> = ({ drizzle }) => {
  const [loading, setLoading] = React.useState(true);
  const [drizzleState, setDrizzleState] = React.useState({});

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

  return loading ? (
    <Loading />
  ) : (
    <pre>{JSON.stringify(drizzleState, null, 2)}</pre>
  );
};

export default App;
