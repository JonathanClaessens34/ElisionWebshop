import { useRouter } from "next/router";
import { get } from "../../services/api";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { handleAddToCart } from "../../services/global";
import React, { useState} from "react";

export default function Product({ product }: any) {
    const [count, setCount] = useState(0);
    const [path, setPath] = useState(product.images[0]);
    const router = useRouter();
    const AwsUrl = "https://geektechpictures.s3.us-west-2.amazonaws.com/images/";

    function calculateSalePrice(price: any, salePercentage: any): React.ReactNode {
        let priceInNumbers: number = price.replace(/[€,-.]/g, "");
        let priceWithPercentage = Math.round(priceInNumbers - (priceInNumbers * salePercentage));
        let newPriceString = "€" + priceWithPercentage + "-";
        return newPriceString;
    }

    return (
        <div className="m-auto md:h-screen">
           <div className="flex my-10 w-full sm:m-5">
                <button className="flex-initial text-main-text-color" onClick={() => router.back()}><IoIosArrowBack size={40}></IoIosArrowBack></button>
                <h1 className="flex-initial ml-5 pt-1 text-main-text-color text-2xl">{product.name}</h1>
            </div>
            <div className="h-96 md:flex md:h-3/5">
                <div className="flex-initial h-4/5 md:w-3/4">
                    <div className="flex w-full h-4/5 sm:w-full mb-5">
                        <div className="w-[20%] text-slate-500 grid place-items-center">{path[path.length - 6] != 1 ? <IoIosArrowBack className="h-12 w-12 lg:h-14 lg:w-14 cursor-pointer border-2 rounded-full p-3 shadow-md" onClick={() => setPath(setCharAt(path, path.length - 6, String(parseInt(path[path.length - 6]) - 1)))} size={60}></IoIosArrowBack> : <div></div>}</div>
                        <div className="w-[60%] sm:ml-0 flex justify-center">
                            <img className="object-contain h-full m-auto p-5"  src={`${AwsUrl + path}`} alt=""/>
                        </div>
                        <div className="w-[20%] text-slate-500 grid place-items-center">{path[path.length - 6] != parseInt((product.images[product.images.length - 1])[path.length - 6]) ? <IoIosArrowForward className="h-12 w-12 lg:h-14 lg:w-14 cursor-pointer border-2 rounded-full p-3 shadow-md" onClick={() => setPath(setCharAt(path, path.length - 6, String(parseInt(path[path.length - 6]) + 1)))} size={60}></IoIosArrowForward> : <div></div>}</div>
                    </div>
                    <div className="w-[100%] h-[35%] flex">
                        {product.images?.map((image : any, index: any) => (
                        <div key={index} className={`w-1/${product.images.length} w-[100%] m-1`}>
                            <img onClick={() => 
                                setPath(image)} className="object-contain h-[80%] m-auto cursor-pointer scale-75 lg:scale-100 lg:p-2" src={`${AwsUrl + image}`} alt=""/>
                        </div>
                        ))}
                    </div>
                </div>
                <div className="flex-initial h-1/5 mt-24 md:w-1/4 md:mt-10 md:ml-5 xl:ml-24">
                                
                    { !product.salePercentage && <p className="text-main-text-color text-lg mb-5 font-bold">Prijs: {product.price}</p>}
                    { product.sale == true && <p className="font-bold text-main-text-color text-lg rounded text-white">Prijs: {product.sale ? calculateSalePrice(product.price, product.salePercentage) : ""}</p> }
                    { product.sale == true && (<p className="relative strikethrough absolute bottom-9 left-28 w-14 text-main-text-color text-l">{product.price}</p>)}
        
                    <div className="grid place-items-center">
                    <button className="bg-button-color text-white w-full py-3 rounded-2xl font-bold"
                            onClick={() => handleAddToCart(product)}
                        >Voeg toe aan mand</button>
                    </div>
                    <div className="mt-5 mx-8 absolute">
                        <ul className="list-disc">
                            <li>Voor <span className="text-button-color font-bold">23:59</span> besteld, <span className="text-button-color font-bold">morgen</span> geleverd</li>
                            <li><span className="text-button-color font-bold">3 jaar</span> garantie op alle elektrische toestellen</li>
                            <li>Verzendkosten bedraagd <span className="text-button-color font-bold">€10,-</span></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="mt-64 grid place-items-center md:mt-5 md:place-items-start">
                <div className="flex">
                    <button onClick={() => setCount(0)} className={`flex-initial mx-5 border-b-4 ${count == 0 ? 'border-button-color' : 'border-white'} font-bold text-main-text-color text-lg`}>Product Informatie</button>
                    <button onClick={() => setCount(1)} className={`flex-initial mx-5 border-b-4 ${count == 1 ? 'border-button-color' : 'border-white'} font-bold text-main-text-color text-lg`}>Specificaties</button>
                </div> 
                <div className="mx-8 my-8 text-main-text-color text-lg w-full">
                    {count == 0 ? 
                        <div>{product.description != null ? product.description : "Er is geen product informatie."}</div> 
                        : 
                        <table className="w-full bg-slate-100 md:w-[50%]">
                            <tr className="even:bg-white">
                                <td className="font-bold  p-2">Merk</td>
                                <td className="float-right p-2">{product.brand != null ? product.brand : "Er is geen product merk"}</td>
                            </tr>
                            <tr className="even:bg-white">
                                <td className="font-bold p-2">Kleur</td>
                                <td className="float-right p-2">{product.color != null ? product.color : "Er is geen product kleur"}</td>
                            </tr>
                            <tr className="even:bg-white">
                                <td className="font-bold p-2">Extra</td>
                                <td className="float-right p-2">Deze product bevat geen extra specificaties</td>
                            </tr>
                        </table>
                    }
                </div>
            </div>
        </div>
    )
}

function setCharAt(str: string, index: number, chr: string) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
}

export async function getStaticPaths() {

    const res = await get(8083, "productApi/getAllProducts");
    const products = await res.json();
    return {
        paths: products.map((product: any) => ({
            params: { id: product.id.toString() },
        })),
        fallback: false
    }
}

export async function getStaticProps({ params }: any) {
    const res = await get(8083, `productApi/${params.id}`)
    const product = await res.json()
    return {
        props: {
            product
        }
    }
}  