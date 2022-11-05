import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';
import {Provider} from "react-redux";
import { store } from "./store";

test('renders learn react link', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // screen.debug;
  // expect(true).toBe(true);
});
