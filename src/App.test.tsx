import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page', () => {
  render(<App />);
  const linkElement = screen.getByText(/Pathfinding Visualizer/i);
  expect(linkElement).toBeInTheDocument();
});
