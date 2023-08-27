import '@testing-library/jest-dom';
import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { handleAddToCart } from '../../services/global';
import ProductCard from '../../components/product-card';

jest.mock('../../services/global', () => ({
    handleAddToCart: jest.fn(),
}));

afterEach(cleanup);

const product = {
    id: 1,
    name: 'Test product',
    price: 9.99,
    images: ['test-image-1.png', 'test-image-2.png'],
};

describe('ProductCard', () => {
    test('renders and functions correctly', () => {
        const { container } = render(<ProductCard product={product} />);
        const image = container.getElementsByTagName('img')[0];
        const name = container.getElementsByTagName('h5')[0];
        const price = container.getElementsByClassName('font-bold')[0];
        const addToCartButton = container.getElementsByTagName('button')[0];
        expect(image.getAttribute('src')).toBe(`https://geektechpictures.s3.us-west-2.amazonaws.com/images/${product.images[0]}`);
        expect(name.innerHTML).toBe(product.name);
        expect(price.innerHTML).toBe(product.price.toString());

        fireEvent.click(addToCartButton);

        expect(handleAddToCart).toHaveBeenCalledWith({ product });
    });
});