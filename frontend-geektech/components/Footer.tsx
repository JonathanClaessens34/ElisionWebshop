import Link from 'next/link';
import React from 'react'

const Footer = () => {
    const path = "http://localhost:3000/product?Geektech[refinementList][category][0]=";
    const salePath = "http://localhost:3000/product?Geektech[refinementList][sale][0]=";
    const AwsUrl = "https://geektechpictures.s3.us-west-2.amazonaws.com/images/";
    return (
        <div className="footer w-full text-white mt-10">
            <div className='footerBlock w-[90%] lg:w-full m-auto pl-5 pr-5'>
                <div className="m-auto lg:flex pt-20">
                    <div className="lg:w-[32%] flex m-auto justify-between lg:block mb-16">
                        <img src="https://geektechpictures.s3.us-west-2.amazonaws.com/images/elision.svg" alt="Elision" className='lg:w-48 stroke-white w-[45%]' />
                        <br />
                        <img src="https://geektechpictures.s3.us-west-2.amazonaws.com/images/geektech.svg" alt="GeekTech" className='w-32' />
                    </div>
                    <div className="m-auto lg:w-[36%] flex justify-between">
                        <div className="">
                            <h3 className='mb-5 footerHeader font-black text-lg'>
                                Navigatie
                            </h3>
                                <a href={"/"} className='inline-block mb-5 footerLink hover:underline decoration-red-700 underline-offset-4 decoration-1'>Home</a>
                            <br/>
                                <a href={"/product"} className='inline-block mb-5 footerLink hover:underline decoration-red-700 underline-offset-4 decoration-1'>Producten</a>
                            <br />
                                <a href={`${salePath}Ja`} className='inline-block mb-5 footerLink hover:underline decoration-red-700 underline-offset-4 decoration-1'>Acties</a>
                            <br />
                        </div>

                        <div className="">
                            <h3 className='mb-6 footerHeader font-black text-lg'>
                                Categorie
                            </h3>
                                <a href={`${path}Smartphone`} className='inline-block mb-5 footerLink hover:underline decoration-red-700 underline-offset-4 decoration-1'>Smartphones</a>
                            <br />
                                <a href={`${path}Laptop`} className='inline-block mb-5 footerLink hover:underline decoration-red-700 underline-offset-4 decoration-1'>Laptops</a>
                            <br />
                                <a href={`${path}Televisie`} className='inline-block mb-5 footerLink hover:underline decoration-red-700 underline-offset-4 decoration-1'>Televisies</a>
                            <br />
                                <a href={`${path}Audio`} className='inline-block mb-5 footerLink hover:underline decoration-red-700 underline-offset-4 decoration-1'>Geluidstoestellen</a>
                        </div>
                    </div>

                    <div className="w-full lg:w-[32%] lg:paymentIcons mt-10 lg:mt-0">
                        <div className='flex lg:justify-end'> <p className='mb-6 footerHeader font-black text-lg'>Veilig betalen met: </p></div>

                        <div className='flex lg:justify-end'>
                            <div>
                                <img className="object-contain h-10 mr-5" src={`${AwsUrl}bancontact.png`} alt="banconctact" />
                                <img className="object-contain h-10 mr-5" src={`${AwsUrl}payconiq.png`} alt="payconiq" />
                            </div>
                            <div>
                                <img className="object-contain h-9 mr-5" src={`${AwsUrl}mastercard.png`} alt="mastercard" />
                                <img className="object-contain h-10" src={`${AwsUrl}visa.png`} alt="visa" />
                            </div>

                        </div>
                    </div>

                </div>

                <div className='seperator w-full mt-10'></div>

                <div className="flex align-center justify-center mt-9 pb-9">
                    <p>© 2022-2023 GeekTech - <Link className="inline-block hover:underline decoration-red-700 underline-offset-4 decoration-1" href="https://www.elision.eu/nl">Elision België</Link></p>
                </div>
            </div>
        </div>

    )
}

export default Footer