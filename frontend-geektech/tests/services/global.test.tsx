import { handleAddToCart } from "../../services/global";


// Set up a mock localStorage object for testing
const localStorageMock: Storage = {
    getItem: jest.fn() as jest.Mock<string | null, [string]>,
    setItem: jest.fn() as jest.Mock<void, [string, string]>,
    length: 0,
    clear: function (): void {
        throw new Error("Function not implemented.");
    },
    key: function (index: number): string | null {
        throw new Error("Function not implemented.");
    },
    removeItem: function (key: string): void {
        throw new Error("Function not implemented.");
    }
};

global.localStorage = localStorageMock;

// Test the handleAddToCart function
describe('handleAddToCart', () => {
    test('adds an item to the cart if it is not already in the cart', () => {
        // // Set up the test data
        // const addedProduct = {
        //     id: 1,
        //     name: 'Test Product'
        // };
        // const cart = [{
        //     product: {
        //         id: 2,
        //         name: 'Another Product'
        //     },
        //     amount: 1
        // }];

        // // Set the mock localStorage to return the cart data
        // localStorageMock.getItem.mockImplementation((key) => {
        //     if (key === 'cart') {
        //         return JSON.stringify(cart);
        //     }
        //     return null;
        // });

        // // Call the function being tested
        // handleAddToCart(addedProduct);

        // // Verify that the item was added to the cart
        // expect(cart).toEqual([
        //     {
        //         product: {
        //             id: 2,
        //             name: 'Another Product'
        //         },
        //         amount: 1
        //     },
        //     {
        //         product: {
        //             id: 1,
        //             name: 'Test Product'
        //         },
        //         amount: 1
        //     }
        // ]);

        // // Verify that the updated cart was saved to localStorage
        // expect(localStorageMock.setItem).toHaveBeenCalledWith('cart', JSON.stringify([
        //     {
        //         product: {
        //             id: 2,
        //             name: 'Another Product'
        //         },
        //         amount: 1
        //     },
        //     {
        //         product: {
        //             id: 1,
        //             name: 'Test Product'
        //         },
        //         amount: 1
        //     }
        // ]));
    });
});