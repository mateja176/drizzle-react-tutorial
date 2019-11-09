import React from 'react';
import { Drizzle, DrizzleState } from '../interfaces/drizzle';
import { Loading } from './Loading';

export interface ReadStringProps {
  drizzle: Drizzle;
  drizzleState: DrizzleState;
}

const ReadString: React.FC<ReadStringProps> = ({ drizzle, drizzleState }) => {
  const [dataKey, setDataKey] = React.useState('');

  React.useEffect(() => {
    const {
      contracts: {
        MyStringStore: {
          methods: { myString },
        },
      },
    } = drizzle;

    const newDataKey = myString.cacheCall();

    setDataKey(newDataKey);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const {
    contracts: { MyStringStore },
  } = drizzleState;

  const myString = MyStringStore.myString[dataKey];

  return <div>My stored string: {myString ? myString.value : <Loading />}</div>;
};

export default ReadString;
