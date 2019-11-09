import React from 'react';
import { DrizzleProps } from '../interfaces/drizzle';
import { Loading } from './Loading';

const ReadString: React.FC<DrizzleProps> = ({ drizzle, drizzleState }) => {
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
