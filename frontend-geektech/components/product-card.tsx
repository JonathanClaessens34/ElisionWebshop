import React from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { handleAddToCart } from '../services/global';


export default function ProductCard({ product }: any) {
    const AwsUrl = "https://geektechpictures.s3.us-west-2.amazonaws.com/images/";

    function calculateSalePrice(price: any, salePercentage: any): React.ReactNode {
        let priceInNumbers: number = price.replace(/[€,-.]/g, "");
        let priceWithPercentage = Math.round(priceInNumbers - (priceInNumbers * salePercentage));
        let newPriceString = "€" + priceWithPercentage + "-";
        return newPriceString;
    }

    return (
        <div className="w-6/12 my-6 min-w-250 px-5 inline-block lg:w-1/4 hover:shadow-xl hover:rounded-lg">
            <a href={`/detail/${product.id}`} className='block min-h-[100%]'>
                <img className="object-contain h-24 sm:h-32 rounded-t-lg m-auto lg:h-44" src={`${AwsUrl}${product.images[0]}`} alt="" />
            </a>
            <div>
                <a href={`/detail/${product.id}`}>
                    <h5 className="text-main-text-color font-Lato text-lg mb-1 text-left text-ellipsis overflow-hidden truncate p-2 h-1/4">{product.name}</h5>
                </a>
                <div className='flex justify-between clear-both mt-auto bottom-0 w-full p-2'>
                    {!product.sale && <p className="font-bold text-main-text-color text-lg">{product.price}</p>}
                    {product.sale &&
                        <div className='flex relative'><p className="font-bold text-main-text-color text-lg md:mr-5">{calculateSalePrice(product.price, product.salePercentage)}</p>
                            <div className='absolute left-8 bottom-8 md:static'><div className='relative'><p className='strikethroughCart left-24 left-5 text-slate-500 text-base lg:w-1/3'>
                                {product.price}
                            </p></div></div></div>}
                    <button className='bg-button-color rounded-lg p-2 hover:drop-shadow-2xl' onClick={() => handleAddToCart(product)}>
                        <AiOutlineShoppingCart className='stroke-2 text-2xl text-white'></AiOutlineShoppingCart>
                    </button>
                </div>
            </div>
        </div>
    )
}
