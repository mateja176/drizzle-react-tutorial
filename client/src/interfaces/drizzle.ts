import { Drizzle as DrizzleStore } from '@drizzle/store';
import { Store } from 'redux';
import { Contract } from 'web3/types';

type Method = Contract['methods'][string];

export interface Drizzle extends DrizzleStore {
  store: Store;
  contracts: {
    [key: string]: Omit<Contract, 'methods'> & {
      methods: {
        [key: string]: {
          (...args: Parameters<Method>): ReturnType<Method>;
          cacheCall: () => string;
        };
      };
    };
  };
}

export interface Accounts {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
}

export interface AccountBalances {
  0x7e7be65f3bf30c4dc87a04f609e088a84c913b76: string;
  0x7e5d8287f6cb80e27ed858e9650cc5b2cc328259: string;
  0x7eac954f1736f3a1cbf6a4da1704b5d8c74b5885: string;
  0x2ced9f3e94574a29c4049e45f7c4d9b2409ad11d: string;
  0xc637d7db3f063188d08c9a2779f17fd67e1c7f34: string;
  0x409632d3f025ba5e8b5937ce537a587725b300ba: string;
  0x037994dd8cee5443d7d4f1b7e18bda1846d03191: string;
  0xf504482f2e7b9a4ed6034a52352e7682faa766c8: string;
  0x5d22e9a29d5f864f3dbcf1c2fc7792d4232fa231: string;
  0x8ceaf6c51ca27fadd27ee1f9d4882fd0dc7cf18f: string;
}

export interface Args {}

export interface Value {
  args: Args;
  fnIndex: number;
  value: string;
  error?: any;
}

export interface MyString {
  [key: string]: Value | undefined;
}

export interface MyStringStore {
  initialized: boolean;
  synced: boolean;
  myString: MyString;
  events: any[];
}

export interface Contracts {
  MyStringStore: MyStringStore;
}

export interface Transaction {
  hash: string;
  nonce: number;
  blockHash: string;
  blockNumber: number;
  transactionIndex: number;
  from: string;
  to: string;
  value: string;
  gas: number;
  gasPrice: string;
  input: string;
  v: string;
  r: string;
  s: string;
}

export interface CurrentBlock {
  number: number;
  hash: string;
  parentHash: string;
  mixHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionsRoot: string;
  stateRoot: string;
  receiptsRoot: string;
  miner: string;
  difficulty: string;
  totalDifficulty: string;
  extraData: string;
  size: number;
  gasLimit: number;
  gasUsed: number;
  timestamp: number;
  transactions: Transaction[];
  uncles: any[];
}

export interface DrizzleStatus {
  initialized: boolean;
}

export interface Transactions {}

export interface Web3 {
  status: string;
  networkId: number;
}

export interface DrizzleState {
  accounts: Accounts;
  accountBalances: AccountBalances;
  contracts: Contracts;
  currentBlock: CurrentBlock;
  drizzleStatus: DrizzleStatus;
  transactions: Transactions;
  transactionStack: any[];
  web3: Web3;
}
