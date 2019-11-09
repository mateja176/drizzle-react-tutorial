// import drizzle functions and contract artifact
import {
  Drizzle as DrizzleConstructor,
  generateStore,
  IDrizzleOptions,
} from '@drizzle/store';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MyStringStore from './contracts/MyStringStore.json';
import './index.css';
import { Drizzle } from './interfaces/drizzle';
import * as serviceWorker from './serviceWorker';

// let drizzle know what contracts we want and how to access our test blockchain
const options: IDrizzleOptions = {
  contracts: [MyStringStore],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:9545',
    },
  },
};

// setup the drizzle store and drizzle
const drizzle = new DrizzleConstructor(
  options,
  generateStore({ drizzleOptions: options }),
);

ReactDOM.render(
  <App drizzle={drizzle as Drizzle} />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
