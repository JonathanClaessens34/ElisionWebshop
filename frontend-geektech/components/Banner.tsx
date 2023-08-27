import Link from 'next/link'
import React from 'react'

const Banner = () => {
    const path = "http://localhost:3000/product?geekTech[refinementList][sale][0]=";
    const snowflakeElements = [];
    for (let i = 0; i < 50; i++) {
        snowflakeElements.push(<div key={i} className="snow"></div>);
    }

    return (
        <div className="bannerSnowEffectBox">
            {snowflakeElements}
            <div className="banner m-auto p-5 text-white rounded-lg relative h-64 mb-10">
                <h3 className="w-[60%] md:w-full text-3xl md:text-5xl lg:text-6xl">Geniet van alle winter deals!</h3>
                <p className='hidden text-2xl md:text-4xl md:block lg:text-5xl ml-2'>Tot wel 50%</p>
                <div className="">
                    <img className="absolute right-5 bottom-5 h-52" src="https://geektechpictures.s3.us-west-2.amazonaws.com/images/banner.png" alt="banner image" />
                    <Link className="absolute left-3 lg:left-auto lg:right-28 bottom-10 bg-white rounded-full text-black border-none pt-5 pb-5 pl-8 pr-8 font-black" href={`${path}Ja`}>Bekijk alle deals</Link>
                </div>
            </div>
        </div>

    )
}

export default Banner