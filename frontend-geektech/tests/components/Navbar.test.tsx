import '@testing-library/jest-dom';

import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Navbar from '../../components/Navbar';

afterEach(cleanup);

describe('Navbar', () => {
  test('renders the component correctly', () => {
    const { container } = render(<Navbar />);
    const categoryBar = container.querySelector('.navbar');
    expect(categoryBar).toBeInTheDocument();
  });

  it('should open the category menu when the menu icon is clicked', () => {

  });
});
