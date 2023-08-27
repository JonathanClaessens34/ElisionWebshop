import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { BiPlus, BiMinus, BiTrash, BiLock } from 'react-icons/bi';
import InformationCard from '../../components/InformationCard';
import DeliveryCard from '../../components/DeliveryCard';


export default function Cart() {
    interface User {
        streetName: string,
        houseNumber: string,
        postalCode: string,
        city: string,
        country: string,
        email: string;
    }

    const sendCost = 10;
    let [cart, setCart]: any = useState([]);
    let [totalPrice, setTotalPrice] = useState(0);
    let [totalAmount, setTotalAmount] = useState(0);
    let [disable, setDisable] = useState(true);
    let [user, setUser] = useState<User>();


    const AwsUrl = "https://geektechpictures.s3.us-west-2.amazonaws.com/images/";

    //Load cart from localstorage before rendering page
    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
        checkUser();
        checkDisabled();
    }, []);

    function checkUser() {
        setUser(JSON.parse(localStorage.getItem("user") || "[]"));
        checkDisabled();
    }

    function checkDisabled(){
        if (Object.keys(JSON.parse(localStorage.getItem('user') || '{}')).length == 0 || cart.length == 0){
            setDisable(true); 
        }else{
            setDisable(false);
        }
    }

    useEffect(() => {
        window.addEventListener('user', checkUser)
        checkDisabled();

        return () => {
            window.removeEventListener('user', checkUser)
        }
    });

    useEffect(() => {
        calculateTotal();
    }, [cart]);

    //Calculate total
    function calculateTotal() {
        let wholePrice = sendCost;
        let wholeAmount = 0;
        if (cart.length == 0) {
            setTotalPrice(wholePrice);
            setTotalAmount(0);
        }
        cart.forEach((item: any,) => {
            let price: number = item.product.price.replace(/[€,-.]/g, "");
            let totalPricePerArticle = Math.round(price - (price * item.product.salePercentage) * item.amount);
            wholeAmount += item.amount;
            wholePrice += totalPricePerArticle;
            setTotalPrice(wholePrice);
            setTotalAmount(wholeAmount);
        });
    }

    //Remove item from the cart
    function removeItemFromCart(id: number) {
        cart.forEach((item: any, index: number) => { loopThroughCartAndRemoveItem(item, id, index) });
        calculateTotal();
        checkDisabled();
        window.dispatchEvent(new Event("removeProduct"));
    }

    function loopThroughCartAndRemoveItem(cartItem: any, id: number, index: number) {
        if (cartItem.product.id == id) {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
            localStorage.setItem('counter', JSON.stringify(JSON.parse(localStorage.getItem('counter') || '') - cartItem.amount));
            window.dispatchEvent(new Event("storage"));
        }
    }

    //Increase item
    function increaseCartItem(id: number) {
        cart.forEach((item: any) => { loopThroughCartAndIncreaseItem(item, id) });
        calculateTotal();
    }

    function loopThroughCartAndIncreaseItem(cartItem: any, id: number) {
        if (cartItem.product.id == id) {
            cartItem.amount++;
            localStorage.setItem("cart", JSON.stringify(cart));
            setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
            localStorage.setItem('counter', JSON.stringify(JSON.parse(localStorage.getItem('counter') || '') + 1));
            window.dispatchEvent(new Event("storage"));
        }
    }

    //Decrease item
    function decreaseCartItem(id: number) {
        cart.forEach((item: any, index: number) => { loopThroughCartAndDecreaseItem(item, id, index) });
        calculateTotal();
        checkDisabled();
    }

    function loopThroughCartAndDecreaseItem(cartItem: any, id: number, index: number) {
        if (cartItem.product.id == id) {
            cartItem.amount--;
            localStorage.setItem("cart", JSON.stringify(cart));
            setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
            //remove item if amount is 0
            if (cartItem.amount == 0) {
                cart.splice(index, 1);
                localStorage.setItem("cart", JSON.stringify(cart));
                setCart(JSON.parse(localStorage.getItem('cart') || '[]'));
                window.dispatchEvent(new Event("removeProduct"));
            }
            localStorage.setItem('counter', JSON.stringify(JSON.parse(localStorage.getItem('counter') || '') - 1));
            window.dispatchEvent(new Event("storage"));
        }
    }

    function calculateSalePrice(price: any, salePercentage: any): string {
        let priceInNumbers: number = price.replace(/[€,-.]/g, "");
        let priceWithPercentage = Math.round(priceInNumbers - (priceInNumbers * salePercentage));
        let newPriceString = priceWithPercentage;
        return "€" + newPriceString + "-";
    }

    return (
        <div className='cartBlock p-5 w-full'>
            <h1 className='text-2xl font-bold lg:text-3xl'>
                Winkelwagen
            </h1>


            <div className="w-full lg:flex">
                {/* Products block */}
                <div className="lg:flex-auto lg:w-2/3 lg:mr-16 mt-5">
                    {cart.length == 0 && 
                        <div className='mt-10'>
                            <p className="font-bold w-full text-main-text-color text-lg rounded text-white mb-5">Er zijn nog geen producten toegevoegd aan de winkelmand</p>
                            <a href="/product" className='homePageButton inline-block p-3 text-white rounded-xl'>Winkel verder</a>
                        </div>
                    }
                    <div>
                        {
                            cart?.map((value: {
                                product: any;
                                amount: any;
                                id: any;
                            }) =>

                                <div key={value.product.id} className='flex border-b border-gray-300 mb-4'>
                                    <div className='h-28 w-24 lg:h-40 lg:w-32 mb-5 flex items-start'>
                                        <Link href={`/detail/${value.product.id}`}>
                                            <img className="object-contain h-24 sm:h-32 rounded-t-lg m-auto lg:h-44" src={`${AwsUrl}${value.product.images[0]}`} alt="Product image" />
                                        </Link>
                                    </div>
                                    <div className='ml-6 w-full'>
                                        <div className='flex justify-between'>
                                            <Link href={`/detail/${value.product.id}`} className="w-full">
                                                <p className='text-base text-blue-800 font-bold w-4/5 lg:w-2/3 hover:cursor-pointer'>
                                                    {value.product.name}
                                                </p>
                                            </Link>
                                            <div className='relative'>

                                                { value.product.sale == false && <p className="font-bold text-main-text-color text-lg">{value.product.price}</p> }
                                                { value.product.sale == true && 
                                                    <div>
                                                        <p className='strikethroughCart text-slate-500 text-base lg:w-1/3'>
                                                            {value.product.price}
                                                        </p>
                                                        <p className="font-bold text-main-text-color text-lg">{calculateSalePrice(value.product.price, value.product.salePercentage)}</p>
                                                    </div> }
                                                {value.product.sale == "Nee" && <p className="font-bold text-main-text-color text-lg">{value.product.price}</p>}
                                                { value.product.sale == "Ja" && 
                                                    <div>
                                                        <p className='strikethroughCart text-slate-500 text-base lg:w-1/3'>
                                                            {value.product.price}
                                                        </p>
                                                        <p className="font-bold text-main-text-color text-lg">{calculateSalePrice(value.product.price, value.product.salePercentage)}</p>
                                                    </div> }
                                            </div>
                                        </div>
                                        {/* Product counter, favorite and delete product*/}
                                        <div className='flex mt-5 mb-5'>
                                            <div className='w-8 h-8 border-b border-l border-t border-gray-300 rounded rounded-r-none flex justify-center hover:cursor-pointer hover:bg-sky-100' onClick={() => decreaseCartItem(value.product.id)}>
                                                <BiMinus className="self-center" />
                                            </div>
                                            <div className='w-8 h-8 border border-gray-300 flex justify-center'>
                                                <p className="self-center">{value.amount}</p>
                                            </div>
                                            <div className='w-8 h-8 border-b border-r border-t border-gray-300 rounded rounded-l-none flex justify-center hover:cursor-pointer hover:bg-sky-100' onClick={() => increaseCartItem(value.product.id)}>
                                                <BiPlus className="self-center" />
                                            </div>
                                            <div className='flex justify-center ml-5' onClick={() => removeItemFromCart(value.product.id)}>
                                                <BiTrash className="self-center text-2xl text-gray-400 hover:cursor-pointer hover:fill-black" />
                                            </div>
                                        </div>
                                    </div>
                                </div>)}
                    </div>
                </div>

                {/* Overview block */}
                <div className="w-full lg:flex-auto lg:w-1/3">
                    <div className="lg:border border-gray-300 rounded-xl">
                        <h2 className='font-bold text-xl mb-4 lg:pr-5 lg:pl-5 mt-5'>Overzicht<span className='text-sm'> ({totalAmount} artikels)</span></h2>

                        <div>
                            {
                                cart?.map((value: {
                                    product: any;
                                    amount: any;
                                    id: any;

                                }) =>
                                    <div key={value.product.id} className='flex justify-between mb-4 lg:pr-5 lg:pl-5'>
                                        <p className='text-sm w-2/3'>
                                            {value.product.name}
                                        </p>
                                        <div>
                                            <p className='text-sm font-bold w-1/3'>
                                                {calculateIndividualPrice(calculateSalePrice(value.product.price, value.product.salePercentage), value.amount)}
                                            </p>
                                        </div>
                                    </div>
                                )}
                        </div>

                        {/* TOTAL BLOCK */}
                        <div className='flex justify-between pt-4 lg:p-5'>
                            <p className='text-sm w-2/3'>Verzendkosten
                            </p>
                            <div>
                                <p className='text-sm text-blue-800 font-bold w-1/3'>€{sendCost},-</p>
                            </div>
                        </div>
                        <div className='flex justify-between lg:border-t pt-4 lg:p-5'>
                            <p className='text-sm w-2/3 font-bold'>Totaal
                            </p>
                            <div>
                                <p className='text-sm font-bold w-1/3'>€{totalPrice},-</p>
                            </div>
                        </div>
                    </div>


                    <InformationCard></InformationCard>
                    <DeliveryCard></DeliveryCard>

                    {/* ORDER BUTTON */}
                    <div className='orderButtonBlock fixed bottom-0 left-0 lg:static w-full pl-5 pr-5 mt-5 lg:shadow-none lg:pl-0 lg:pr-0'>
                        <Link
                            href=
                            {{
                                pathname: '/cart/checkout/',
                                query: {
                                    price: totalPrice * 100,
                                    streetName: user?.streetName,
                                    houseNumber: user?.houseNumber,
                                    postalCode: user?.postalCode,
                                    city: user?.city,
                                    country: user?.country,
                                    email: user?.email
                                }
                            }}>
                            <button disabled={disable} className={`w-full text-white flex justify-center align-center mt-2 mb-2 p-4 rounded-xl cursor-pointer group ${disable ? 'bg-slate-300 cursor-not-allowed' : 'bg-red-500'}`}>
                                <BiLock className="self-center text-2xl text-white hover:cursor-pointer mr-2 group-disabled:cursor-not-allowed" />
                                BESTELLEN
                            </button>
                        </Link>
                        <div className='flex justify-around mb-2'>
                            <img className="object-contain w-14 scale-120 rounded-t-lg" src={`${AwsUrl}bancontact.png`} alt="Product image" />
                            <img className="object-contain w-14 scale-120 rounded-t-lg" src={`${AwsUrl}payconiq.png`} alt="Product image" />
                            <img className="object-contain w-14 scale-120 rounded-t-lg" src={`${AwsUrl}mastercard.png`} alt="Product image" />
                            <img className="object-contain w-14 scale-120 rounded-t-lg" src={`${AwsUrl}visa.png`} alt="Product image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function calculateIndividualPrice(price: string, amount: number): React.ReactNode {
    let articlePrice: number = parseInt(price.replace(/[€,-.]/g, ""));
    let total = articlePrice * amount;
    return "€" + total + ",-";
}