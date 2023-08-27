import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { get } from '../../services/api';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { handleAddToCart } from '../../services/global';
import Product from '../../pages/product';

jest.mock('next/router', () => {
    return {
        useRouter: () => ({
            back: jest.fn()
        })
    }
});

jest.mock('../../services/api', () => {
    return {
        get: jest.fn()
    }
});

jest.mock('../../services/global', () => {
    return {
        handleAddToCart: jest.fn()
    }
});

const product = {
    name: 'Product Name',
    price: '$10.00',
    images: [
        'image1.png',
        'image2.png'
    ]
};

describe('Product', () => {
    it('should call the get function from the API when the component mounts', () => {
        
    });
});
