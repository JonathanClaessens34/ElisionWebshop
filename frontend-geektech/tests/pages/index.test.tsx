import React from 'react';
import { render, cleanup, waitFor } from '@testing-library/react';
import ProductCard from '../../components/product-card';
import { get } from '../../services/api';

jest.mock('../../services/api', () => ({
    get: jest.fn()
}));

type Product = {
    id: number;
    // Other properties of the product
};

type HomeProps = {
    products: Product[];
}

const Home = ({ products }: HomeProps) => {
    return (
        <main>
            <h1 className='text-xl font-bold max-w-screen-xl m-auto'>Nieuwste Producten</h1>
            <div className='text-center'>
                {products.map((product: Product) => (
                    <ProductCard product={product} key={product.id}></ProductCard>
                ))}
            </div>
        </main>
    )
}

describe('Home component', () => {
    afterEach(cleanup);

    it('should render the home page', async () => {
        (get as jest.Mock).mockResolvedValue({
            json: jest.fn().mockResolvedValue([
                // Sample product data
                { id: 1, name: 'Product 1' },
                { id: 2, name: 'Product 2' },
                { id: 3, name: 'Product 3' },
            ])
        });

        const { getByText, getAllByTestId } = render(<Home products={[]} />);

        await waitFor(() => getByText(/Nieuwste Producten/i));
    });
});

export default Home;

export async function getStaticProps() {
    const res = await get(8083, "productApi/getLastEightProducts");
    const products = await res.json();

    return {
        props: {
            products,
        },
    };
}
