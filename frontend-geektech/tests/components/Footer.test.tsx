import '@testing-library/jest-dom'

import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Footer from '../../components/Footer';

afterEach(cleanup);

test('Footer renders correctly', () => {
    const { container } = render(<Footer />);
    expect(container.textContent).toBe('Footer');
});