import React from 'react';
import { DrizzleProps } from '../interfaces/drizzle';

export type TransactionStatus = 'initial' | 'pending' | 'success';

const SetString: React.FC<DrizzleProps> = ({ drizzle, drizzleState }) => {
  const {
    contracts: { MyStringStore: contract },
  } = drizzle;

  const { accounts, transactions, transactionStack } = drizzleState;

  const from = accounts[0];

  const [inputValue, setInputValue] = React.useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    currentTarget: { value },
  }) => {
    setInputValue(value);
  };

  const [transactionStatus, setTransactionStatus] = React.useState<
    TransactionStatus
  >('initial');
  const isPending = transactionStatus === 'pending';

  const [stackId, setStackId] = React.useState<number | null>(null);

  const setValue = React.useCallback(
    (value: string) => {
      const newStackId = contract.methods.set.cacheSend(value, {
        from,
      });

      setStackId(newStackId);
    },
    [contract, from],
  );

  const handleSubmit: React.FormEventHandler = React.useCallback(
    e => {
      e.preventDefault();

      setValue(inputValue);
    },
    [setValue, inputValue],
  );

  React.useEffect(() => {
    if (stackId !== null) {
      const txHash = transactionStack[stackId];
      const transaction = transactions[txHash];
      if (transaction) {
        setTransactionStatus(transactions[txHash].status as TransactionStatus);
      }
    }
  }); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset disabled={isPending}>
          <input value={inputValue} onChange={handleChange} />
          <input type="submit" />
        </fieldset>
      </form>
      <div>Transaction status: {transactionStatus}</div>
    </div>
  );
};

export default SetString;
