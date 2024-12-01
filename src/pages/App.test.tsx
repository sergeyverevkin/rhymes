import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'mobx-react';
import { rhymeStore, RhymeStore } from '../store/rhymeStore';

test('renders learn react link', () => {
  render(<Provider rhymeStore={new RhymeStore()}><App /></Provider>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
