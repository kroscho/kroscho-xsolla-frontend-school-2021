import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import mainStore from './store/mainStore';

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    store: new mainStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
