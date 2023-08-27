// In your own jest-setup.js (or any other name)
import '@testing-library/jest-dom'

import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import CategoryBar from '../../components/CategoryBar';
import '@testing-library/jest-dom/extend-expect';

afterEach(cleanup);

describe('CategoryBar component', () => {
  test('renders the component correctly', () => {
    const { container } = render(<CategoryBar />);
    const categoryBar = container.querySelector('.categoryBar');
    const categoryBarSmScreen = container.querySelector('.categoryBarSmScreen');

    expect(categoryBar).toBeInTheDocument();
    expect(categoryBarSmScreen).toBeInTheDocument();
  });

  test('closes the category menu when the BiX icon is clicked', () => {
    const { container, queryByTestId } = render(<CategoryBar />);
    const categoryBar = container.querySelector('.categoryBar');
    const categoryBarSmScreen = container.querySelector('.categoryBarSmScreen');
    const icon = queryByTestId('close-icon');

    expect(icon).toBeDefined();
    if (icon)
      fireEvent.click(icon);

    expect(categoryBar).not.toHaveClass('categoryBarSmallDisplay');
    expect(categoryBarSmScreen).not.toHaveClass('categoryBarSmScreenBlock');
  });
});

