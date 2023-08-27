import '@testing-library/jest-dom';
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Product, { Hit } from '../../pages/product';

afterEach(cleanup);

const products = [{ id: 1, name: 'Product 1', price: 19.99, description: 'This is a description', color: 'red', images: ['image1.jpg', 'image2.jpg'], category: 'electronics', brand: 'brand 1' },
{ id: 2, name: 'Product 2', price: 29.99, description: 'This is a description', color: 'blue', images: ['image1.jpg', 'image2.jpg'], category: 'clothing', brand: 'brand 2' },
{ id: 3, name: 'Product 3', price: 39.99, description: 'This is a description', color: 'green', images: ['image1.jpg', 'image2.jpg'], category: 'home', brand: 'brand 3' }];

describe('Product', () => {
    test('renders and functions correctly', () => {
        
    });
});

describe('Hit', () => {
    test('renders and functions correctly', () => {
        const { container } = render(<Hit hit={products[0]} />);
        const hit = container.getElementsByClassName('h-24')[0];
        const hitName = container.getElementsByClassName('text-sm')[0];
        expect(hit.getAttribute('src')).toBe('https://geektechpictures.s3.us-west-2.amazonaws.com/images/image1.jpg');
        expect(hitName.innerHTML).toBe('Product 1');
    });
});