import algoliasearch from 'algoliasearch/lite';
import {InstantSearch, RefinementList, Configure, Hits, ClearRefinements}  from 'react-instantsearch-hooks-web';
import {Panel} from 'react-instantsearch-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import { handleAddToCart } from '../services/global';


export default function Product({ products }: any) {
    const searchClient = algoliasearch(
        'DWP4FJYQR3',
        '22ca09b492399bfa6561d190cf7e2516'
    );
    const [filter, setFilter] = useState("hidden");

    return (
        <div className="mt-5">
            <button onClick={() => { filter == "hidden" ? setFilter("block") : setFilter("hidden"); window.scrollTo(0, 0); }} className="bg-primary-color text-white font-bold p-5 rounded-full fixed bottom-10 right-2 shadow-2xl z-10 shadow-black md:hidden"><FaFilter></FaFilter></button>
            <div className="md:flex">
                <InstantSearch
                    searchClient={searchClient}
                    indexName='Geektech'
                    routing={true} >
                    <Configure hitsPerPage={9999} />
                    <div className={`w-[100%] md:w-[30%] lg:w-[25%] ${filter} md:block`}>
                        <p className="font-Lato text-xl font-bold text-center text-primary-color mb-1">Filters</p>
                        <Panel id="productSearch" header="Brands">
                            <RefinementList className="md:w-[80%]" attribute="brand" searchable={true} searchablePlaceholder="Search brands" showMore={true}>
                            </RefinementList>
                        </Panel>
                        <Panel header="Category">
                            <RefinementList attribute="category"></RefinementList>
                        </Panel>
                        <Panel header="Color">
                            <RefinementList attribute="color"></RefinementList>
                        </Panel>
                        <Panel header="Sale">
                            <RefinementList attribute="sale"></RefinementList>
                        </Panel>
                        <ClearRefinements className='md:w-[90%]' translations={{resetButtonText: 'Verwijder filters'}}></ClearRefinements>
                    </div>
                    <div className="w-[100%] sm:[65%] md:w-[70%]">
                        <Hits hitComponent={Hit}></Hits>
                    </div>
                </InstantSearch>
            </div>
        </div>
    )
}

export function Hit({ hit }: any) {
    const AwsUrl = "https://geektechpictures.s3.us-west-2.amazonaws.com/images/";
    let product = { id: hit.id, name: hit.name, price: hit.price, description: hit.description, color: hit.color, images: hit.images, category: hit.category, brand: hit.brand, salePercentage: hit.salePercentage, sale: hit.sale };

    function calculateIndividualPrice(price: any, salePercentage: any): import("react").ReactNode {
        let priceInNumbers: number = price.replace(/[€,-.]/g, "");
        let priceWithPercentage = Math.round(priceInNumbers - (priceInNumbers * salePercentage));
        let newPriceString = "€" + priceWithPercentage + "-";
        return newPriceString;
    }

    return (
        <div>
            <a href={`/detail/${product.id}`} className='block min-h-[100%]'>
                <img className="h-24 sm:h-32 rounded-t-lg m-auto lg:h-44" src={`${AwsUrl}${product.images[0]}`} alt="" />
            </a>
            <div>
                <a href={`/detail/${product.id}`}>
                    <h5 className="text-main-text-color text-sm mb-1 font-bold text-left text-ellipsis overflow-hidden truncate p-2 h-1/4">{hit.name}</h5>
                </a>
                <div className='flex justify-between clear-both mt-auto bottom-0 w-full p-2'>
                    <div className='lg:flex relative'>
                        { product.sale == "Nee" && (<p className="font-bold text-main-text-color text-lg lg:text-lg">{product.price}</p>)}
                        { product.sale == "Ja" &&
                            <div>
                                <p className="font-bold text-main-text-color text-lg rounded text-white">
                                    { calculateIndividualPrice(product.price, product.salePercentage) }
                                </p>
                                <p className="strikethrough absolute bottom-6 left-12 md:bottom-6 md:left-16 text-main-text-color text-l">{product.price}</p>
                            </div> }
                    </div>
                    <button onClick={() => { handleAddToCart(product) }} className='bg-button-color rounded-lg p-2 hover:drop-shadow-2xl'>
                        <AiOutlineShoppingCart className='stroke-2 text-base scale-125 text-white md:text-2xl md:scale-100'></AiOutlineShoppingCart>
                    </button>
                </div>
            </div>
        </div>
    );
}